<template>
  <v-card
    shaped
    :style="'border: 3px solid ' + (value.show ? value.color : turnOffColor)"
  >
    <div
      class="angle-displayer-btn"
      @click="onClickFunction()"
    >
      {{chartValue}}
    </div>
    <v-btn
      v-if="showEye"
      icon
      @click="value.show = !value.show"
      absolute right fab
      :style="{top: '50%', transform:'translate(40%, -50%)'}"
    > 
      <v-icon v-if="value.show">mdi-eye</v-icon>
      <v-icon v-else>mdi-eye-off</v-icon>
    </v-btn>
  </v-card>
</template>

<script>
export default {
  name: 'ChartValueBox',
  props: {
    value: {
      type: Object
    },
    chartValue: {
      type: String
    },
    onClickFunction: {
      type: Function,
      default: function () {}
    },
    showEye: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    turnOffColor: "#4d4d4d"
  })

}
</script>

<style>
  .angle-displayer-btn {
    text-align: center;
    cursor: pointer;
  }
</style>