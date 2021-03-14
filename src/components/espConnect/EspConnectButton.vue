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
  import fetchMethods from "@/common/fetchMethods"
  import commonEnums from "@/common/enums"

  export default {
    name: "EspConnectButton",

    components: {
      EspConnectAlert
    },

    data: () => ({
      alertStatus: commonEnums.alertStatus.none,
      alertMessage: "",
      alertStatusEnum: commonEnums.alertStatus,
      espModeEnum: commonEnums.espMode,
      wifiConnectionStatusEnum: commonEnums.wifiConnectionStatus
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
        fetchMethods.timeoutFetch(
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
            if (status != null) {
              switch (status.wifiConnectionStatus) {
                case self.wifiConnectionStatusEnum.connected: {
                  self.setEspConnected();
                  break;
                }
                case self.wifiConnectionStatusEnum.alreadyConnected: {
                  self.setAlreadyConnectedToWifi();
                  break;
                }
                case self.wifiConnectionStatusEnum.connectionFailed: {
                  self.setConnectionError("Unable to connect to wifi");
                  break;
                }
                default: {
                  self.setConnectionError("Invalid response");
                  break;
                }
              }
            }
            else {
              self.setConnectionError("Invalid response");
            }
            self.setConnectInProgress(false);
          },
          function (error) {
            self.setConnectionError(error.toString());
            self.setConnectInProgress(false);
          }
        );
      },
      connect() {
        this.setConnectInProgress(true);
        this.hideAlert();
        let self = this;

        fetchMethods.timeoutFetch(
          self.requestPath + "status",
          5000,
          function (status) {
            if (status != null && status.connected) {
              self.setEspConnected();
            }
            else {
              self.setConnectionError("Invalid response");
            }
            self.setConnectInProgress(false);
          },
          function (error) {
            self.setConnectionError(error.toString());
            self.setConnectInProgress(false);
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
        this.alertStatus = this.alertStatusEnum.connected;
      },
      setAlreadyConnectedToWifi() {
        this.alertStatus = this.alertStatusEnum.info;
        this.alertMessage = "Already connected to this wifi network";
      },
      setConnectionError(errorMessage) {
        this.alertStatus = this.alertStatusEnum.connectionFailed;
        this.alertMessage = errorMessage;
        console.log(this.alertMessage);
      },
      disconnect() {
        this.$store.commit('espConnect/setConnected', false);
        this.alertStatus = this.alertStatusEnum.disconnected;
      },
      hideAlert() {
        this.alertStatus = this.alertStatusEnum.none;
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