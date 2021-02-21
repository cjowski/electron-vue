<template>
  <v-card class="ma-0">
    <v-navigation-drawer
      app
      right
      permanent
      mini-variant
      mini-variant-width=64
      color="grey darken-4"
    >
      <v-list>
        <v-list-item @click="chartRef.restoreDefaultView()">
          <v-icon>mdi-autorenew</v-icon>
        </v-list-item>
        <v-list-item
          @click="chartRef.expandY(expandValue)"
          @mousedown="expandYStart()"
          @mouseup="expandYStop()"
          @touchstart="expandYStart()"
          @touchend="expandYStop()"
        >
          <v-icon>mdi-arrow-expand-vertical</v-icon>
        </v-list-item>
        <v-list-item
          @click="chartRef.collapseY(collapseValue)"
          @mousedown="collapseYStart()"
          @mouseup="collapseYStop()"
          @touchstart="collapseYStart()"
          @touchend="collapseYStop()"
        >
          <v-icon>mdi-arrow-collapse-vertical</v-icon>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
export default {
  name: "GyroSectionSideBar",

  data: () => ({
    expandYInterval: false,
    collapseYInterval: false
  }),

  props: {
    chartRef: {
      type: Object
    }
  },

  computed: {
    expandValue() {
      let expandValue = 0.05 * this.chartRef.getRangeY()
      return expandValue < 5 ? expandValue : 5;
    },
    collapseValue() {
      return 0.05 * this.chartRef.getRangeY();
    }
  },

  methods: {
    expandYStart() {
      if (!this.expandYInterval) {
        let self = this;
        let expandMultiplier = 0.05;
        let initialRangeY = this.chartRef.getRangeY();
        this.expandYInterval = setInterval(() => {
            let expandValue = expandMultiplier * initialRangeY;
            if (expandValue < 5) {
              expandMultiplier += 0.005;
            }
            else {
              expandValue = 5;
            }
            self.chartRef.expandY(expandValue);
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
        let initialRangeY = this.chartRef.getRangeY();
        this.collapseYInterval = setInterval(() => {
            let collapseValue = collapseMultiplier * initialRangeY;
            if (collapseMultiplier - 0.005 > 0.005) {
              collapseMultiplier -= 0.005;
            }
            self.chartRef.collapseY(collapseValue);
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