<template>
  <div>
    <v-btn
      absolute
      icon
      x-large
      ripple
      :right="!leftSide"
      :style="{'z-index': 10, transform: topScrollerTransition}"
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
      :right="!leftSide"
      :style="{'z-index': 10, transform: bottomScrollerTransition}"
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
    },
    leftSide: {
      type: Boolean,
      default: true
    }
  },

  computed: {
    topScrollerTransition() {
      return this.leftSide
        ? "translateX(100%)"
        : "translateX(-80%)";
    },
    bottomScrollerTransition() {
      return this.leftSide
        ? "translate(100%, -70%)"
        : "translate(-80%, -70%)";
    }
  },

  methods: {
    getRangeY() {
      return Math.abs(this.axisY.ticks.max - this.axisY.ticks.min);
    },
    roundValue(value) {
      return parseFloat(value.toFixed(this.roundDecimals));
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