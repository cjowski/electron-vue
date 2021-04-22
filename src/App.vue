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
  import { FmDataGetter } from "@/espDataGet/FmDataGetter"
  import { GyroDataGetter } from "@/espDataGet/GyroDataGetter"
  import { MotorDataGetter } from "@/espDataGet/MotorDataGetter"
  import Toolbar from "@/components/Toolbar"

  export default {
    name: "App",

    data: () => ({
      fmDataGetter: null,
      gyroDataGetter: null,
      motorDataGetter: null
    }),

    components: {
      Toolbar
    },

    created() {
      this.$store.commit('espConnect/setEspAccessPointIP', configJson.espAccessPointIP);
      this.$store.commit('espConnect/setEspWifiIP', configJson.espWifiIP);
      this.$store.commit('espConnect/setEspPort', configJson.espPort);
      this.$store.commit('espConnect/setEspWifiSSID', configJson.espWifiCredentials[0].ssid);
      this.$store.commit('espConnect/setEspWifiPassword', configJson.espWifiCredentials[0].password);
      this.$store.commit('espConnect/setPossibleWifiCredentials', configJson.espWifiCredentials);

      this.gyroDataGetter = new GyroDataGetter(this.$store, this.espRequestPath);
      this.fmDataGetter = new FmDataGetter(this.$store, this.espRequestPath);
      this.motorDataGetter = new MotorDataGetter(this.$store, this.espRequestPath);
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
      },
      espRequestPath(newEspRequestPath) {
        this.updateGettersRequestPath(newEspRequestPath);
      }
    },

    methods: {
      startFetchingEspData() {
        this.fmDataGetter.startFetching();
        this.gyroDataGetter.startFetching();
        this.motorDataGetter.startFetching();
      },
      stopFetchingEspData() {
        this.fmDataGetter.stopFetching();
        this.gyroDataGetter.stopFetching();
        this.motorDataGetter.stopFetching();
      },
      updateGettersRequestPath(newEspRequestPath) {
        this.fmDataGetter.updateRequestPath(newEspRequestPath);
        this.gyroDataGetter.updateRequestPath(newEspRequestPath);
        this.motorDataGetter.updateRequestPath(newEspRequestPath);
      }
    }
  };
</script>