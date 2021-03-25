<template>
  <v-overlay
    absolute
    :value="value"
  >
    <v-progress-circular indeterminate :size="50" :width="10" color="light-blue" />
  </v-overlay>
</template>

<script>
  export default {
    name: "EspTestSpinner",

    props: {
      value: {
        type: Boolean
      }
    }
  }
</script>