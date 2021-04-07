<template>
  <v-dialog
    v-model="value"
    persistent
    fullscreen
  >
    <v-container fill-height style="background-color: rgba(0, 0, 0, 0.5);">
      <v-layout row justify-center align-center>
        <v-progress-circular
          indeterminate
          :size="70"
          :width="10"
          color="light-blue"
          style="margin-right: 64px"
        />
      </v-layout>
    </v-container>
  </v-dialog>
</template>

<script>
  export default {
    name: "EspConnectSpinner",

    props: {
      value: {
        type: Boolean
      }
    }
  }
</script>