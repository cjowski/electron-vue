<template>
  <v-navigation-drawer
    right
    permanent
    absolute
    floating
    mini-variant
    mini-variant-width=50
    color="#1E1E1E"
    style="z-index: 0; border-radius: 5px;"
  >
    <v-list>
      <v-list-item @click="restoreDefaultView()">
        <v-icon>mdi-autorenew</v-icon>
      </v-list-item>
      <v-list-item
        @click="expandY(expandValue)"
        @mousedown="expandYStart()"
        @mouseup="expandYStop()"
        @touchstart="expandYStart()"
        @touchend="expandYStop()"
      >
        <v-icon>mdi-arrow-expand-vertical</v-icon>
      </v-list-item>
      <v-list-item
        @click="collapseY(collapseValue)"
        @mousedown="collapseYStart()"
        @mouseup="collapseYStop()"
        @touchstart="collapseYStart()"
        @touchend="collapseYStop()"
      >
        <v-icon>mdi-arrow-collapse-vertical</v-icon>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
  export default {
    name: "ChartTools",

    data: () => ({
      expandYInterval: false,
      collapseYInterval: false
    }),

    props: {
      axisY: {
        type: Object
      },
      defaultMaxY: {
        type: Number
      },
      defaultMinY: {
        type: Number
      },
      stepsYCount: {
        type: Number,
        default: 10
      },
      roundDecimals: {
        type: Number,
        default: 2
      },
      maxExpandValue: {
        type: Number
      }
    },

    computed: {
      expandValue() {
        let expandValue = 0.05 * this.getRangeY()
        return expandValue < this.maxExpandValue ? expandValue : this.maxExpandValue;
      },
      collapseValue() {
        return 0.05 * this.getRangeY();
      }
    },

    methods: {
      getRangeY() {
        return Math.abs(this.axisY.ticks.max - this.axisY.ticks.min);
      },
      roundValue(value) {
        return parseFloat(value.toFixed(this.roundDecimals));
      },
      restoreDefaultView() {
        this.axisY.ticks.min = this.defaultMinY;
        this.axisY.ticks.max = this.defaultMaxY;
        this.recalculateStepSizeY();
      },
      centerYByMiddleValue(middleValueY) {
        let moveValue = this.getRangeY() / 2;
        this.axisY.ticks.min = this.roundValue(middleValueY - moveValue);
        this.axisY.ticks.max = this.roundValue(middleValueY + moveValue);
      },
      expandY(incrementValue) {
        this.axisY.ticks.min = this.roundValue(this.axisY.ticks.min - incrementValue);
        this.axisY.ticks.max = this.roundValue(this.axisY.ticks.max + incrementValue);
        this.recalculateStepSizeY();
      },
      collapseY(incrementValue) {
        let newMinY = this.axisY.ticks.min + incrementValue;
        let newMaxY = this.axisY.ticks.max - incrementValue;

        if (newMinY < newMaxY) {
          this.axisY.ticks.min = this.roundValue(newMinY);
          this.axisY.ticks.max = this.roundValue(newMaxY);
          this.recalculateStepSizeY();
        }
      },
      recalculateStepSizeY() {
        this.axisY.ticks.stepSize = this.roundValue(this.getRangeY() / this.stepsYCount);
      },
      expandYStart() {
        if (!this.expandYInterval) {
          let self = this;
          let expandMultiplier = 0.05;
          let initialRangeY = this.getRangeY();
          this.expandYInterval = setInterval(() => {
              let expandValue = expandMultiplier * initialRangeY;
              if (expandValue < self.maxExpandValue) {
                expandMultiplier += 0.005;
              }
              else {
                expandValue = self.maxExpandValue;
              }
              self.expandY(expandValue);
            },
            50
          );
        }
      },
      expandYStop() {
        clearInterval(this.expandYInterval);
        this.expandYInterval = false;
      },
      collapseYStart() {
        if (!this.collapseYInterval) {
          let self = this;
          let collapseMultiplier = 0.05;
          let initialRangeY = this.getRangeY();
          this.collapseYInterval = setInterval(() => {
              let collapseValue = collapseMultiplier * initialRangeY;
              if (collapseMultiplier - 0.005 > 0.005) {
                collapseMultiplier -= 0.005;
              }
              self.collapseY(collapseValue);
            },
            50
          );
        }
      },
      collapseYStop() {
        clearInterval(this.collapseYInterval);
        this.collapseYInterval = false;
      }
    }
  }
</script>