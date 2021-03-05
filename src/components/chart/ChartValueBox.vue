<template>
  <v-card
    shaped
    :style="'border: 2px solid ' + (value.show ? value.color : turnOffColor)"
  >
    <v-btn
      v-if="lockable && value.locked"
      @click="value.locked = false"
      icon absolute left fab
      :style="{top: '50%', transform:'translate(-40%, -50%)'}"
    >
      <v-icon>mdi-lock</v-icon>
    </v-btn>
    <div
      class="chart-value-box-btn"
      @click="onClickFunction()"
      @mousedown="onLongClickStart()"
      @touchstart="onLongClickStart()"
    >
      {{chartValue}}
    </div>
    <v-btn
      v-if="showEye"
      @click="value.show = !value.show"
      icon absolute right fab
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
    turnOffColor: "#4d4d4d",
    lockable: false,
    longClickInterval: false
  }),

  created() {
    this.lockable = typeof this.value.locked === "boolean";
  },

  methods: {
    onLongClickStart() {
      if (!this.scrollUpInterval) {
        if (this.lockable && !this.value.locked) {
          let self = this;
          this.longClickInterval = setInterval(() => self.lock(), 600);
        }
      }
    },
    lock() {
      if (this.longClickInterval) {
        this.value.locked = true;
        clearInterval(this.longClickInterval);
      }
    }
  }
}
</script>

<style>
  .chart-value-box-btn {
    text-align: center;
    cursor: pointer;
    user-select: none;
  }
</style>