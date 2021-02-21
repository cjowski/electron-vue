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
import Toolbar from './components/Toolbar'

export default {
  name: 'App',

  components: {
    Toolbar
  },

  methods: {
    getRequestPath(requestName) {
      return "http://" + this.getIp() + "/" + requestName;
    },
    getIp() {
      return "192.168.0.31:80";
    },
    handleFetchErrors (response) {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    }
  },

  mounted() {
    const self = this;

    this.fetchFmInterval = setInterval(function(){
      fetch(self.getRequestPath("fm"))
        .then(self.handleFetchErrors)
        .then(response => response.json())
        .then(data => {
          if (data != null) {
            self.$store.commit('setEspFmChannelValuesJson', data);
            self.$store.commit('addFmChannelValues', data);
          }
        })
        .catch(error => console.log(error));
    }, 50);
    
    this.fetchGyroInterval = setInterval(function(){
      fetch(self.getRequestPath("gyro"))
        .then(self.handleFetchErrors)
        .then(response => response.json())
        .then(data => {
          if (data != null) {
            self.$store.commit('setEspGyroValuesJson', data);
            self.$store.commit('addGyroValues', data);
          }
        })
        .catch(error => console.log(error));
    }, 50);
  }
};
</script>