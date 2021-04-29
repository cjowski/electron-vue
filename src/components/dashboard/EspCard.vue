<template>
  <v-scroll-x-transition>
    <v-card to="/" v-if="show">
      <v-container>
        <v-row align="center" justify="center">
          ESP
        </v-row>
        <v-row align="center" justify="center" class="pt-2 pb-3">
          <v-icon :size="iconSize" color="light-green accent-3" v-if="espConnected">mdi-wifi-check</v-icon>
          <v-icon :size="iconSize" color="deep-orange accent-3" v-else>mdi-wifi-cancel</v-icon>
        </v-row>
      </v-container>
    </v-card>
  </v-scroll-x-transition>
</template>

<script>
  export default {
    name: 'EspCard',

    data: () => ({
      show: false
    }),

    mounted() {
      let self = this;
      setTimeout(
        function() {
          self.show = true;
        },
        50
      )
    },

    computed: {
      espConnected() {
        return this.$store.getters['espConnect/connected'];
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