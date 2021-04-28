<template>
  <v-card to="/fm">
    <v-container>
      <v-row align="center" justify="center">
        FM
      </v-row>
      <v-row align="center" justify="center" class="pt-2 pb-3">
        <v-icon :size="iconSize" color="deep-orange accent-3" v-if="fmSignalState == 0">mdi-wifi-cancel</v-icon>
        <v-icon :size="iconSize" color="light-green accent-3" v-if="fmSignalState == 1">mdi-wifi-check</v-icon>
        <v-icon :size="iconSize" color="cyan accent-2" v-if="fmSignalState == 2">mdi-wifi-sync</v-icon>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
  export default {
    name: 'FmCard',

    computed: {
      fmSignalState() {
        return this.$store.getters['fm/fmSignalState'];
      },
      iconSize() {
        switch (this.$vuetify.breakpoint.name) {
          case 'xs': return 24;
          case 'sm': return 24;
          case 'md': return 45;
          case 'lg': return 45;
          case 'xl': return 45;
          default : throw Error("Invalid $vuetify.breakpoint.name: " + this.$vuetify.breakpoint.name);
        }
      }
    }
  }
</script>