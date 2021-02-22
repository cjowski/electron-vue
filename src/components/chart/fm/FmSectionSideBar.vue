<template>
  <v-card class="ma-0">
    <v-navigation-drawer
      app
      right
      permanent
      mini-variant
      mini-variant-width=64
      color="grey darken-4"
    >
      <v-list>
        <v-list-item>
          <v-icon color="deep-orange accent-3" v-if="fmSignalState == 0">mdi-wifi-cancel</v-icon>
          <v-icon color="light-green accent-3" v-if="fmSignalState == 1">mdi-wifi-check</v-icon>
          <v-icon color="cyan accent-2" v-if="fmSignalState == 2">mdi-wifi-sync</v-icon>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
  export default {
    name: "FmSectionSideBar",

    computed: {
      fmSignalState() {
        return this.$store.getters['fm/fmSignalState'];
      }
    }
  }
</script>