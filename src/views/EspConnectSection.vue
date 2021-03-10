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
          v-if="wifiModeVisible"
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
            :espWifiSSID="espWifiSSID"
            :espWifiPassword="espWifiPassword"
            :setWifiCredentials="setWifiCredentials"
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
      espWifiSSID: "",
      espWifiPassword: "",
      selectedEspMode: -1,
      espModes: commonEnums.espModes,
      wifiModeVisible: true,
      setWifiCredentials: false,
      espAccessPointRef: null,
      espWifiRef: null
    }),

    created() {
      this.espAccessPointIP = this.$store.getters['espConnect/espAccessPointIP'];
      this.espWifiIP = this.$store.getters['espConnect/espWifiIP'];
      this.selectedEspMode = this.$store.getters['espConnect/selectedEspMode'];
      this.espWifiSSID = this.$store.getters['espConnect/espWifiSSID'];
      this.espWifiPassword = this.$store.getters['espConnect/espWifiPassword'];
    },

    mounted () {
      this.espAccessPointRef = this.$refs.espAccessPointRef;
      this.espWifiRef = this.$refs.espWifiRef;
      this.initializeWatchers();
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
    },

    methods: {
      initializeWatchers() {
        let self = this;
        this.$watch(
          "$refs.espAccessPointRef.espAccessPointIP",
          (newIP) => self.espAccessPointIP = newIP
        );

        this.$watch(
          "$refs.espAccessPointRef.espWifiSSID",
          (newEspWifiSSID) => self.espWifiSSID = newEspWifiSSID
        );

        this.$watch(
          "$refs.espAccessPointRef.espWifiPassword",
          (newEspWifiPassword) => self.espWifiPassword = newEspWifiPassword
        );

        this.$watch(
          "$refs.espAccessPointRef.fullWidth",
          (isFullWidth) => self.wifiModeVisible = !isFullWidth
        );

        this.$watch(
          "$refs.espAccessPointRef.showEditWifiCredentials",
          (showEditWifiCredentials) => self.setWifiCredentials = showEditWifiCredentials
        );

        this.$watch(
          "$refs.espWifiRef.espWifiIP",
          (newIP) => self.espWifiIP = newIP
        );
      }
    }
  }
</script>