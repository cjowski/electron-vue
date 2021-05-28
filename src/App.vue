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
  import { EspWebSocketDataGetter } from "@/espDataGet/webSocket/EspWebSocketDataGetter"
  import Toolbar from "@/components/Toolbar"

  export default {
    name: "App",

    data: () => ({
      espWebSocketDataGetter: null
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

      this.espWebSocketDataGetter = new EspWebSocketDataGetter(this.$store, this.espWebSocketPath);
    },

    computed: {
      espConnected() {
        return this.$store.getters['espConnect/connected'];
      },
      espWebSocketPath() {
        return this.$store.getters['espConnect/espWebSocketPath'];
      }
    },

    watch: {
      espConnected(connected) {
        if (connected) {
          this.espWebSocketDataGetter.initializeWebSocket();
        }
        else {
          this.espWebSocketDataGetter.closeWebSocket();
        }
      },
      espWebSocketPath(newEspWebSocketPath) {
        this.espWebSocketDataGetter.updateWebSocketPath(newEspWebSocketPath)
      }
    }
  };
</script>