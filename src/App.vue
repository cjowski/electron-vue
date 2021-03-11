<template>
  <v-app style="font-family: Calibri;">
    <toolbar/>
    <v-main>
      <v-container class="pt-2">
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
  import configJson from "@/config.json"
  import commonMethods from "@/common/commonMethods"
  import Toolbar from "@/components/Toolbar"

  export default {
    name: "App",

    data: () => ({
      fetchFmInterval: null,
      fetchGyroInterval: null
    }),

    components: {
      Toolbar
    },

    created() {
      this.$store.commit('espConnect/setEspAccessPointIP', configJson.espAccessPointIP);
      this.$store.commit('espConnect/setEspWifiIP', configJson.espWifiIP);
      this.$store.commit('espConnect/setEspPort', configJson.espPort);
      this.$store.commit('espConnect/setEspWifiSSID', configJson.espWifiSSID);
      this.$store.commit('espConnect/setEspWifiPassword', configJson.espWifiPassword);
    },

    computed: {
      espConnected() {
        return this.$store.getters['espConnect/connected'];
      },
      espRequestPath() {
        return this.$store.getters['espConnect/espRequestPath'];
      }
    },

    watch: {
      espConnected(connected) {
        if (connected) {
          this.startFetchingEspData();
        }
        else {
          this.stopFetchingEspData();
        }
      }
    },

    methods: {
      startFetchingEspData() {
        this.fetchFmData();
        this.fetchGyroData();
      },
      stopFetchingEspData() {
        clearInterval(this.fetchFmInterval);
        clearInterval(this.fetchGyroInterval);
      },
      fetchFmData() {
        let self = this;
        commonMethods.setFetchDataInterval(
          self.espRequestPath + "fm",
          function (fmJson) {
            if (fmJson != null) {
              self.$store.commit('fm/setEspFmChannelValuesJson', fmJson);
              self.$store.commit('fm/addFmChannelValues', fmJson);
            }
          },
          self.$store,
          50
        );
      },
      fetchGyroData() {
        let self = this;
        commonMethods.setFetchDataInterval(
          self.espRequestPath + "gyro",
          function (gyroJson) {
            if (gyroJson != null) {
              self.$store.commit('gyro/setEspGyroValuesJson', gyroJson);
              self.$store.commit('gyro/addGyroValues', gyroJson);
            }
          },
          self.$store,
          50
        );
      }
    }
  };
</script>