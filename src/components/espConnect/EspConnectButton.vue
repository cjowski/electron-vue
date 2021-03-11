<template>
  <div>
    <v-btn
      v-if="setWifiCredentials"
      @click="connectAccessPointToWifi()"
      color="light-green accent-3"
      block
      outlined
      :disabled="!modeConnected"
    >
      Connect to wifi
    </v-btn>
    <v-btn
      v-else-if="!modeConnected"
      @click="connect()"
      color="light-green accent-3"
      block
      outlined
    >
      Connect
    </v-btn>
    <v-btn
      v-else
      @click="disconnect()"
      color="deep-orange accent-3"
      block
      outlined
    >
      Disconnect
    </v-btn>
    <esp-connect-alert
      :status="alertStatus"
      :message="alertMessage"
    />
  </div>
</template>

<script>
  import EspConnectAlert from "@/components/espConnect/EspConnectAlert"
  import commonMethods from "@/common/commonMethods"
  import commonEnums from "@/common/enums"

  export default {
    name: "EspConnectButton",

    components: {
      EspConnectAlert
    },

    data: () => ({
      alertStatus: commonEnums.alertStatuses.none,
      alertMessage: "",
      alertStatuses: commonEnums.alertStatuses,
      espModes: commonEnums.espModes
    }),

    props: {
      selectedEspMode: {
        type: Number
      },
      espIP: {
        type: String
      },
      espWifiSSID: {
        type: String
      },
      espWifiPassword: {
        type: String
      },
      setWifiCredentials: {
        type: Boolean
      }
    },

    computed: {
      espPort () {
        return this.$store.getters['espConnect/espPort']
      },
      modeConnected () {
        return this.$store.getters['espConnect/connected']
          && this.selectedEspMode == this.$store.getters['espConnect/selectedEspMode'];
      },
      requestPath () {
        return "http://" + this.espIP + ":" + this.espPort +"/";
      }
    },

    methods: {
      connectAccessPointToWifi() {
        this.setConnectInProgress(true);
        this.hideAlert();
        console.log(this.espWifiSSID)
        console.log(this.espWifiPassword)

        let self = this;
        commonMethods.timeoutFetch(
          new Request(
            self.requestPath + "wifiConnect",
            {
              method: "POST",
              body: JSON.stringify({
                ssid: self.espWifiSSID,
                password: self.espWifiPassword
              })
            }
          ),
          15000,
          function (status) {
            if (status != null && status.connected) {
              self.setEspConnected();
            }
            else {
              self.setConnectionError("Invalid response");
            }
          },
          function (error) {
            self.setConnectionError(error.toString());
          }
        );
      },
      connect() {
        this.setConnectInProgress(true);
        this.hideAlert();
        let self = this;

        commonMethods.timeoutFetch(
          self.requestPath + "status",
          5000,
          function (status) {
            if (status != null && status.connected) {
              self.setEspConnected();
            }
            else {
              self.setConnectionError("Invalid response");
            }
          },
          function (error) {
            self.setConnectionError(error.toString());
          }
        );
      },
      setConnectInProgress(state) {
        this.$store.commit('espConnect/setConnectInProgress', state);
      },
      setEspConnected() {
        this.$store.commit('espConnect/setSelectedEspMode', this.selectedEspMode);
        this.$store.commit('espConnect/setEspIP', this.espIP);
        this.$store.commit('espConnect/setConnected', true);
        this.alertStatus = this.alertStatuses.connected;
        this.setConnectInProgress(false);
      },
      setConnectionError(errorMessage) {
        this.alertStatus = this.alertStatuses.connectionFailed;
        this.alertMessage = errorMessage;
        this.setConnectInProgress(false);
        console.log(this.alertMessage);
      },
      disconnect() {
        this.$store.commit('espConnect/setConnected', false);
        this.alertStatus = this.alertStatuses.disconnected;
      },
      hideAlert() {
        this.alertStatus = this.alertStatuses.none;
        this.alertMessage = "";
      }
    }
  }
</script>

<style scoped>
  .esp-connect-btn {
    border: solid 2px !important;
  }
</style>