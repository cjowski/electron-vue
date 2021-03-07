<template>
  <v-card class="mt-1">
    <v-container>
      <esp-connect-spinner v-model="espConnectInProgress" />
      <v-row>
        <v-col
          @click="selectedEspMode = espModes.accessPoint"
          class="pr-1"
        >
          <esp-access-point
            :selected="selectedEspMode == espModes.accessPoint"
            ref="espAccessPointRef"
          />
        </v-col>
        <v-col
          @click="selectedEspMode = espModes.wifi"
          class="pl-1"
        >
          <esp-wifi
            :selected="selectedEspMode == espModes.wifi"
            ref="espWifiRef"
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
      espModes: commonEnums.espModes,
      espAccessPointRef: null,
      espWifiRef: null
    }),

    created() {
      this.espAccessPointIP = this.$store.getters['espConnect/espAccessPointIP'];
      this.espWifiIP = this.$store.getters['espConnect/espWifiIP'];
      this.selectedEspMode = this.$store.getters['espConnect/selectedEspMode'];
    },

    mounted () {
      this.espAccessPointRef = this.$refs.espAccessPointRef;
      this.espWifiRef = this.$refs.espWifiRef;

      let self = this;
      this.$watch(
        "$refs.espAccessPointRef.espAccessPointIP",
        (newIP) => self.espAccessPointIP = newIP
      );

      this.$watch(
        "$refs.espWifiRef.espWifiIP",
        (newIP) => self.espWifiIP = newIP
      );
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