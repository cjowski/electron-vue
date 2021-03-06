<template>
  <div>
    <v-icon
      v-if="connected"
      color="light-green accent-3"
    >
      mdi-wifi-check
    </v-icon>
    <v-icon
      v-else
      color="deep-orange accent-3"
    >
      mdi-wifi-cancel
    </v-icon>
  </div>
</template>

<script>
  export default {
    name: "EspConnectedIcon",

    props: {
      connected: {
        type: Boolean
      }
    }
  }
</script>