<template>
  <v-card class="mt-1">
    <v-container>
      <esp-connect-spinner v-model="espConnectInProgress" />
      <v-row>
        <v-col @click="selectedEspMode = espModes.accessPoint">
          <esp-access-point
            v-model="espAccessPointIP"
            :selected="selectedEspMode == espModes.accessPoint"
          />
        </v-col>
        <v-col @click="selectedEspMode = espModes.wifi">
          <esp-wifi
            v-model="espWifiIP"
            :selected="selectedEspMode == espModes.wifi"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <esp-connect-button
            :selectedEspMode="selectedEspMode"
            :espIP="espIP"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
  import EspAccessPoint from "@/components/espConnect/modes/EspAccessPoint"
  import EspWifi from "@/components/espConnect/modes/EspWifi"
  import EspConnectButton from "@/components/espConnect/EspConnectButton"
  import EspConnectSpinner from "@/components/espConnect/EspConnectSpinner"
  import commonEnums from "@/common/enums"

  export default {
    name: 'EspConnectSection',

    components: {
      EspAccessPoint,
      EspWifi,
      EspConnectButton,
      EspConnectSpinner
    },

    data: () => ({
      espAccessPointIP: "",
      espWifiIP: "",
      selectedEspMode: -1,
      espModes: commonEnums.espModes
    }),

    created() {
      this.espAccessPointIP = this.$store.getters['espConnect/espAccessPointIP'];
      this.espWifiIP = this.$store.getters['espConnect/espWifiIP'];
      this.selectedEspMode = this.$store.getters['espConnect/selectedEspMode'];
    },

    computed: {
      espIP () {
        switch (this.selectedEspMode) {
          case commonEnums.espModes.accessPoint: return this.espAccessPointIP;
          case commonEnums.espModes.wifi: return this.espWifiIP;
          default: throw Error("Invalid ESP mode: " + this.selectedEspMode);
        }
      },
      espConnectInProgress () {
        return this.$store.getters['espConnect/connectInProgress'];
      }
    }
  }
</script>