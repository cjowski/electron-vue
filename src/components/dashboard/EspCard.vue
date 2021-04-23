<template>
  <v-card to="/">
    <v-container>
      <v-row align="center" justify="center">
        ESP
      </v-row>
      <v-row align="center" justify="center" class="pt-2 pb-3">
        <v-icon color="light-green accent-3" v-if="espConnected">mdi-wifi-check</v-icon>
        <v-icon color="deep-orange accent-3" v-else>mdi-wifi-cancel</v-icon>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
  export default {
    name: 'EspCard',

    computed: {
      espConnected() {
        return this.$store.getters['espConnect/connected'];
      }
    }
  }
</script>