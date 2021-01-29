<template>
  <v-app style="font-family: Calibri;">
    <!-- <v-app-bar
      app
      color="primary"
      dark
    >
    </v-app-bar> -->

    <v-main>
      <EspJsonShower/>
    </v-main>
  </v-app>
</template>

<script>
import EspJsonShower from './components/EspJsonShower';

export default {
  name: 'App',

  components: {
    EspJsonShower,
  },

  data: () => ({
    //
  }),

  mounted() {
    const self = this;          
    this.fetchJsonInterval = setInterval(function(){
      fetch("http://192.168.0.31/")
        .then(response => response.json())
        .then(data => {
          if (data != null) {
            self.$store.commit('setEspFmChannelValuesJson', data);
          }
        });
    }, 20);
  }
};
</script>
