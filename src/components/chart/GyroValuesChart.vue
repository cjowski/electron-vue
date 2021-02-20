<template>
  <v-container>
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
          <v-list-item
            @click="restoreDefaultView()"
          >
            <v-icon>mdi-restore</v-icon>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-card>
    <line-chart
      :style="'height: ' + chartHeight + 'px'"
      :chart-data="chartData"
      :options="chartOptions"
    />
  </v-container>
</template>

<script>
  import LineChart from "./LineChart.vue"

  export default {
    name: 'GyroValuesChart',

    props: {
      angleSettings: {
        type: Object
      }
    },

    components: {
      LineChart
    },

    data: () => ({
      chartData: {},
      mouseDown: false,
      mousePosY: 0,
      previousTimeMoveY: 0,
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [{
            ticks: {
              display: false
            },
            gridLines: {
              display: false,
            }
          }],
          yAxes: [{
            ticks: {
              max: 90,
              min: -90,
              stepSize: 10,
              fontColor: "#d1d1d1",
              fontSize: 16,
              fontFamily: "Calibri"
            },
            gridLines: { 
              color: "#4d4d4d"
            }
          }]
        },
        animation: {
          duration: 0
        },
        elements: {
          point:{
            radius: 0
          }
        },
        legend: {
          display: false,
          labels: {
            fontColor: "#d1d1d1",
            fontSize: 16,
            fontFamily: "Calibri"
          }
        }
      }
    }),

    computed: {
      espGyroValuesJson() {
        return this.$store.getters.espGyroValuesJson;
      },
      gyroChartData() {
        return this.$store.getters.gyroChartData;
      },
      chartHeight () {
        switch (this.$vuetify.breakpoint.name) {
          case 'xs': return 200;
          case 'sm': return 230;
          case 'md': return 500;
          case 'lg': return 600;
          case 'xl': return 800;
          default : throw Error("Invalid $vuetify.breakpoint.name: " + this.$vuetify.breakpoint.name);
        }
      }
    },

    created: function () {
      // window.addEventListener('wheel', this.handleScroll);
      // window.addEventListener('mousedown', this.handleMouseDown);
      // window.addEventListener('mouseup', this.handleMouseUp);
      // window.addEventListener('mousemove', this.handleMouseMove);
    },

    destroyed: function () {
      // window.removeEventListener('wheel', this.handleScroll);
      // window.removeEventListener('mousedown', this.handleMouseDown);
      // window.removeEventListener('mouseup', this.handleMouseUp);
      // window.removeEventListener('mousemove', this.handleMouseMove);
    },

    watch: {
      espGyroValuesJson() {
        this.updateChartData();
      }
    },

    methods: {
      updateChartData() {
        let fill = false;
        let borderWidth = 3;
        let chartDatasets = [];

        if (this.angleSettings.pitch.show) {
          chartDatasets.push({
            label: "Pitch",
            data: this.gyroChartData.pitch,
            fill: fill,
            borderColor: this.angleSettings.pitch.color,
            borderWidth: borderWidth
          });
        }

        if (this.angleSettings.roll.show) {
          chartDatasets.push({
            label: "Roll",
            data: this.gyroChartData.roll,
            fill: fill,
            borderColor: this.angleSettings.roll.color,
            borderWidth: borderWidth
          });
        }

        if (this.angleSettings.yaw.show) {
          chartDatasets.push({
            label: "Yaw",
            data: this.gyroChartData.yaw,
            fill: fill,
            borderColor: this.angleSettings.yaw.color,
            borderWidth: borderWidth
          });
        }

        this.chartData = {
          labels: this.gyroChartData.time,
          datasets: chartDatasets
        };
      },
      restoreDefaultView() {
        this.setMinY(-90);
        this.setMaxY(90);
      },
      getMinY() {
        return this.chartOptions.scales.yAxes[0].ticks.min;
      },
      getMaxY() {
        return this.chartOptions.scales.yAxes[0].ticks.max;
      },
      setMinY(newValue) {
        this.chartOptions.scales.yAxes[0].ticks.min = newValue;
      },
      setMaxY(newValue) {
        this.chartOptions.scales.yAxes[0].ticks.max = newValue;
      },
      getRangeY() {
        return Math.abs(this.getMaxY() - this.getMinY());
      },
      centerYByMiddleValue(middleValueY) {
        let moveValue = this.getRangeY() / 2;
        this.setMinY(middleValueY - moveValue);
        this.setMaxY(middleValueY + moveValue);
      },
      handleScroll(event) {
        let multiplier = this.mouseDown
          ? 0.1
          : 0.025;

        let incrementValue = multiplier * this.getRangeY();

        if (event.deltaY < 0)
        {
          this.setMinY(this.getMinY() - incrementValue);
          this.setMaxY(this.getMaxY() + incrementValue);
        }
        else
        {
          let newMinY = this.getMinY() + incrementValue;
          let newMaxY = this.getMaxY() - incrementValue;

          if (newMinY < newMaxY) {
            this.setMinY(newMinY);
            this.setMaxY(newMaxY);
          }
        }
      },
      handleMouseDown(event) {
        this.mouseDown = true;
        this.mousePosY = event.y;
      },
      handleMouseUp() {
        this.mouseDown = false; 
        this.mousePosY = 0;
      },
      handleMouseMove(event) {
        if (!this.mouseDown || Date.now() - this.previousTimeMoveY < 20)
        {
          return;
        }

        let currentRangeY = this.getRangeY();

        let incrementValue = currentRangeY > 1
          ? 0.025 * currentRangeY
          : 0.00005 * currentRangeY;

        if (this.mousePosY - event.y > 0) {
          this.setMinY(this.getMinY() + incrementValue);
          this.setMaxY(this.getMaxY() + incrementValue);
        }
        else
        {
          this.setMinY(this.getMinY() - incrementValue);
          this.setMaxY(this.getMaxY() - incrementValue);
        }

        this.mousePosY = event.y;
        this.previousTimeMoveY = Date.now();
      }
    }
  }
</script>