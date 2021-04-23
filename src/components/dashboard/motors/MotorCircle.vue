<template>
  <v-progress-circular
    size="50"
    width="10"
    :value="motorSpeedPercentage"
    :color="circleColor"
    class="motor-circle"
  >
    <div style="color: white">
      {{motorSpeedPercentage}}
    </div>
  </v-progress-circular>
</template>

<script>
  export default {
    name: 'MotorsCircle',

    props: {
      motorSpeedPercentage: {
        type: Number,
        default: 0
      }
    },

    computed: {
      circleColor() {
        let red = Math.round(
          (255 * this.motorSpeedPercentage) / 100
        );
        let green = Math.round(
          (255 * (100 - this.motorSpeedPercentage)) / 100 
        );
        let blue = 0
        return "rgb(" + red + "," + green + "," + blue + ")";
      }
    }
  }
</script>

<style scoped>
  .motor-circle >>> .v-progress-circular__overlay {
    transition: all 0.1s ease-in-out;
  }
</style>