<template>
  <v-app>
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

  
};
</script>
