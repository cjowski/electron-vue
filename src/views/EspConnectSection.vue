<template>
  <v-card class="mt-1">
    <v-container>
      <v-dialog
        v-model="connectInProgress"
        persistent
        fullscreen
      >
        <v-container fill-height style="background-color: rgba(0, 0, 0, 0.5);">
          <v-layout row justify-center align-center>
            <v-progress-circular indeterminate :size="70" :width="10" color="light-blue" />
          </v-layout>
        </v-container>
      </v-dialog>
      <v-row>
        <v-col @click="selectedEspMode = espModes.accessPoint">
          <v-card
            outlined
            class="esp-mode-card"
            :style="selectedEspMode == espModes.accessPoint ? selectedCardStyle : notSelectedCardStyle"
          >
            <v-card-title>
              ESP32 Access Point
              <v-spacer />
              <v-icon
                v-if="selectedEspMode == espModes.accessPoint && espConnected"
                color="light-green accent-3"
              >
                mdi-wifi-check
              </v-icon>
            </v-card-title>
            <v-card-text class="pb-0">
              <v-row>
                <v-col cols=8>
                  <v-text-field
                    v-model="espAccessPointIP"
                    label="ESP IP"
                    outlined
                  />
                </v-col>
                <v-col cols=4>
                  <v-text-field
                    v-model="espPort"
                    label="PORT"
                    outlined
                    disabled
                  />
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col @click="selectedEspMode = espModes.wifi">
          <v-card
            outlined
            class="esp-mode-card"
            :style="selectedEspMode == espModes.wifi ? selectedCardStyle : notSelectedCardStyle"
          >
            <v-card-title>
              ESP32 Wifi
              <v-spacer />
              <v-icon
                v-if="selectedEspMode == espModes.wifi && espConnected"
                color="light-green accent-3"
              >
                mdi-wifi-check
              </v-icon>
            </v-card-title>
            <v-card-text class="pb-0">
              <v-row>
                <v-col cols=8>
                  <v-text-field
                    v-model="espWifiIP"
                    label="ESP IP"
                    outlined
                  />
                </v-col>
                <v-col cols=4>
                  <v-text-field
                    v-model="espPort"
                    label="PORT"
                    outlined
                    disabled
                  />
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn
            v-if="!espConnected"
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
          <v-alert
            v-if="alertStatus == alertStatusEnum.connected"
            dense
            type="success"
            border="left"
            class="mt-3 mb-0"
          >
            Connected
          </v-alert>
          <v-alert
            v-else-if="alertStatus == alertStatusEnum.disconnected"
            dense
            type="warning"
            border="left"
            class="mt-3 mb-0"
          >
            Disconnected
          </v-alert>
          <v-alert
            v-else-if="alertStatus == alertStatusEnum.connectionFailed"
            dense
            type="error"
            border="left"
            class="mt-3 mb-0"
          >
            {{ "Connection failed (" + alertErrorMessage + ")"}}
          </v-alert>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
  import commonEnums from "@/common/enums"

  export default {
    name: 'EspConnectSection',

    data: () => ({
      espAccessPointIP: "",
      espWifiIP: "",
      espPort: "",
      selectedEspMode: -1,
      connectInProgress: false,
      alertStatus: 0,
      alertErrorMessage: "",
      alertStatusEnum: {
        none: 0,
        connected: 1,
        disconnected: 2,
        connectionFailed: 3
      },
      espModes: commonEnums.espModes,
      selectedCardStyle: "border: 2px solid #03A9F4",
      notSelectedCardStyle: "border: 2px solid #363636"
    }),

    created() {
      this.espAccessPointIP = this.$store.getters['espConnect/espAccessPointIP'];
      this.espWifiIP = this.$store.getters['espConnect/espWifiIP'];
      this.espPort = this.$store.getters['espConnect/espPort'];
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
      espConnected () {
        return this.$store.getters['espConnect/connected'];
      },
      requestPath () {
        return "http://" + this.espIP + ":" + this.espPort +"/";
      }
    },

    methods: {
      connect() {
        this.connectInProgress = true;
        let self = this;
        let didTimeOut = false;

        new Promise((resolve, reject) => {
          let timeout = setTimeout(function() {
            didTimeOut = true;
            reject(new Error('Request timed out'));
          }, 5000);

          fetch(self.requestPath + "status")
            .then(response => {
                clearTimeout(timeout);
                if (!didTimeOut) {
                  resolve(response)
                }
              }
            )
            .catch(error => console.log(error));
        })
        .then(response => response.json())
        .then(status => {
          if (status != null && status.connected) {
            self.$store.commit('espConnect/setEspIP', self.espIP);
            self.$store.commit('espConnect/setSelectedEspMode', self.selectedEspMode);
            self.$store.commit('espConnect/setConnected', true);
            self.alertStatus = self.alertStatusEnum.connected;
          }
          else {
            self.alertStatus = self.alertStatusEnum.connectionFailed;
            self.alertErrorMessage = "Invalid response";
          }
          self.connectInProgress = false;
        })
        .catch(error => {
          self.connectInProgress = false;
          self.alertStatus = self.alertStatusEnum.connectionFailed;
          self.alertErrorMessage = error;
          console.log(error);
        });
      },
      disconnect() {
        this.$store.commit('espConnect/setConnected', false);
        this.alertStatus = this.alertStatusEnum.disconnected;
      }
    }

  }
</script>

<style scoped>
  .esp-mode-card {
    cursor: pointer;
  }
  .esp-connect-btn {
    border: solid 2px imp !important;
  }
</style>