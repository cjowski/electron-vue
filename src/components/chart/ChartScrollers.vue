<template>
  <div>
    <v-btn
      absolute
      icon
      x-large
      ripple
      :style="{'z-index': 10, transform:'translateX(35%)'}"
      @click="scrollUp()"
      @mousedown="scrollUpStart()"
      @mouseup="scrollUpStop()"
      @touchstart="scrollUpStart()"
      @touchend="scrollUpStop()"
    />
    <v-btn
      absolute
      icon 
      x-large
      ripple
      bottom
      :style="{'z-index': 10, transform:'translate(35%, -70%)'}"
      @click="scrollDown()"
      @mousedown="scrollDownStart()"
      @mouseup="scrollDownStop()"
      @touchstart="scrollDownStart()"
      @touchend="scrollDownStop()"
    />
  </div>
</template>

<script>
export default {
  name: "ChartScrollers",

  data: () => ({
    scrollUpInterval: false,
    scrollDownInterval: false
  }),

  props: {
    axisY: {
      type: Object
    },
    roundDecimals: {
      type: Number,
      default: 0
    }
  },

  methods: {
    getRangeY() {
      return Math.abs(this.axisY.ticks.max - this.axisY.ticks.min);
    },
    roundValue(value) {
      return parseFloat(value.toFixed(roundDecimals));
    },
    scrollUp() {
      let incrementValue = 0.02 * this.getRangeY();
      this.axisY.ticks.min = this.roundValue(this.axisY.ticks.min + incrementValue);
      this.axisY.ticks.max = this.roundValue(this.axisY.ticks.max + incrementValue);
    },
    scrollDown() {
      let incrementValue = 0.02 * this.getRangeY();
      this.axisY.ticks.min = this.roundValue(this.axisY.ticks.min - incrementValue);
      this.axisY.ticks.max = this.roundValue(this.axisY.ticks.max - incrementValue);
    },
    scrollUpStart() {
      if (!this.scrollUpInterval) {
        let self = this;
        this.scrollUpInterval = setInterval(() => self.scrollUp(), 75);
      }
    },
    scrollUpStop() {
      clearInterval(this.scrollUpInterval);
      this.scrollUpInterval = false;
    },
    scrollDownStart() {
      if (!this.scrollDownInterval) {
        let self = this;
        this.scrollDownInterval = setInterval(() => self.scrollDown(), 75);
      }
    },
    scrollDownStop() {
      clearInterval(this.scrollDownInterval);
      this.scrollDownInterval = false;
    }
  }
}
</script>