<template>
  <v-app style="font-family: Calibri;">
    <toolbar/>
    <v-main class="my-background">
      <v-container class="main-content">
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

  data: () => ({
    //
  }),

  mounted() {
    const self = this;          
    this.fetchFmInterval = setInterval(function(){
      fetch("http://192.168.0.31/fm")
        .then(response => response.json())
        .then(data => {
          if (data != null) {
            self.$store.commit('setEspFmChannelValuesJson', data);
          }
        });
    }, 100);
    this.fetchGyroInterval = setInterval(function(){
      fetch("http://192.168.0.31/gyro")
        .then(response => response.json())
        .then(data => {
          if (data != null) {
            self.$store.commit('setEspGyroValuesJson', data);
          }
        });
    }, 50);
  }
};
</script>