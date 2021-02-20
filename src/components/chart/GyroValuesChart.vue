<template>
  <v-container>
    <v-btn
      large fab absolute right color="green"
      @click="restoreDefaultView()"
    > 
      <v-icon large>mdi-restore</v-icon>
    </v-btn>
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
      angles: {
        type: Object
      }
    },

    components: {
      LineChart
    },

    data: () => ({
      chartData: {},
      gyroValues: {
        time: [],
        pitch: [],
        roll: [],
        yaw: []
      },
      valuesLimit: 250,
      chartHeight: 500,
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

      vuetifyHeight () {
        return this.$vuetify.breakpoint.height;
      }

    },

    created: function () {
      window.addEventListener('wheel', this.handleScroll);
      window.addEventListener('mousedown', this.handleMouseDown);
      window.addEventListener('mouseup', this.handleMouseUp);
      window.addEventListener('mousemove', this.handleMouseMove);

    },

    destroyed: function () {
      window.removeEventListener('wheel', this.handleScroll);
      window.removeEventListener('mousedown', this.handleMouseDown);
      window.removeEventListener('mouseup', this.handleMouseUp);
      window.removeEventListener('mousemove', this.handleMouseMove);
    },

    watch: {

      espGyroValuesJson() {
        let self = this;
        this.espGyroValuesJson.GyroValues.forEach(function(gyroValue) {
          if (!self.gyroValues.time.includes(gyroValue.Time)) {
            self.addGyroValues(
              parseInt(gyroValue.Time),
              parseFloat(gyroValue.Pitch),
              parseFloat(gyroValue.Roll),
              parseFloat(gyroValue.Yaw)
            );
          }
        });
        this.updateChartData();
      },

      vuetifyHeight() {
        this.updateChartHeight();
      }

    },

    methods: {

      addGyroValues(time, pitch, roll, yaw) {
        if (this.gyroValues.time.length == this.valuesLimit) {
          this.gyroValues.time.shift();
          this.gyroValues.pitch.shift();
          this.gyroValues.roll.shift();
          this.gyroValues.yaw.shift();
        }

        this.gyroValues.time.push(time);
        this.gyroValues.pitch.push(pitch);
        this.gyroValues.roll.push(roll);
        this.gyroValues.yaw.push(yaw);
      },

      updateChartData() {
        let fill = false;
        let borderWidth = 3;
        let chartDatasets = [];

        if (this.angles.pitch.show) {
          chartDatasets.push({
            label: "Pitch",
            data: this.gyroValues.pitch,
            fill: fill,
            borderColor: this.angles.pitch.color,
            borderWidth: borderWidth
          });
        }

        if (this.angles.roll.show) {
          chartDatasets.push({
            label: "Roll",
            data: this.gyroValues.roll,
            fill: fill,
            borderColor: this.angles.roll.color,
            borderWidth: borderWidth
          });
        }

        if (this.angles.yaw.show) {
          chartDatasets.push({
            label: "Yaw",
            data: this.gyroValues.yaw,
            fill: fill,
            borderColor: this.angles.yaw.color,
            borderWidth: borderWidth
          });
        }

        this.chartData = {
          labels: this.gyroValues.time,
          datasets: chartDatasets
        };
      },

      updateChartHeight() {
        let self = this;
        setTimeout(function() {
          self.chartHeight = 0.75 * self.vuetifyHeight;
        }, 50);
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
        return Math.abs(this.getMinY()) + Math.abs(this.getMaxY());
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