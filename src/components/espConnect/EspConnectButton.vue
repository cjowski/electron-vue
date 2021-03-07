<template>
  <div>
    <v-btn
      v-if="!modeConnected"
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
  import commonEnums from "@/common/enums"

  export default {
    name: "EspConnectButton",

    components: {
      EspConnectAlert
    },

    data: () => ({
      alertStatus: commonEnums.alertStatuses.none,
      alertMessage: "",
      alertStatuses: commonEnums.alertStatuses
    }),

    props: {
      selectedEspMode: {
        type: Number
      },
      espIP: {
        type: String
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
      connect() {
        this.setConnectInProgress(true);
        this.hideAlert();
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
            self.setEspConnected();
          }
          else {
            self.setConnectionError("Invalid response");
          }
          self.setConnectInProgress(false);
        })
        .catch(error => {
          self.setConnectInProgress(false);
          self.setConnectionError(error.toString());
        });
      },
      setConnectInProgress(state) {
        this.$store.commit('espConnect/setConnectInProgress', state);
      },
      setEspConnected() {
        this.$store.commit('espConnect/setSelectedEspMode', this.selectedEspMode);
        this.$store.commit('espConnect/setEspIP', this.espIP);
        this.$store.commit('espConnect/setConnected', true);
        this.alertStatus = this.alertStatuses.connected;
      },
      setConnectionError(errorMessage) {
        this.alertStatus = this.alertStatuses.connectionFailed;
        this.alertMessage = errorMessage;
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