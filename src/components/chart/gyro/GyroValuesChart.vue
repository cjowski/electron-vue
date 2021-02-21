<template>
  <v-container>
    <chart-scrollers
      :axisY="chartOptions.scales.yAxes[0]"
      :roundDecimals=2
    />
    <line-chart
      :style="'height: ' + chartHeight + 'px'"
      :chart-data="chartData"
      :options="chartOptions"
    />
  </v-container>
</template>

<script>
  import LineChart from "@/components/chart/LineChart"
  import ChartScrollers from "@/components/chart/ChartScrollers"

  export default {
    name: 'GyroValuesChart',

    props: {
      angleSettings: {
        type: Object
      }
    },

    components: {
      LineChart,
      ChartScrollers
    },

    data: () => ({
      chartData: {},
      defaultMaxY: 90,
      defaultMinY: -90,
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
      getAxisY() {
        return this.chartOptions.scales.yAxes[0];
      },
      getRangeY() {
        return Math.abs(this.getAxisY().ticks.max - this.getAxisY().ticks.min);
      },
      roundValue(value) {
        return parseFloat(value.toFixed(2));
      },
      restoreDefaultView() {
        this.getAxisY().ticks.min = this.defaultMinY;
        this.getAxisY().ticks.max = this.defaultMaxY;
      },
      centerYByMiddleValue(middleValueY) {
        let moveValue = this.getRangeY() / 2;
        this.getAxisY().ticks.min = this.roundValue(middleValueY - moveValue);
        this.getAxisY().ticks.max = this.roundValue(middleValueY + moveValue);
      },
      expandY(incrementValue) {
        this.getAxisY().ticks.min = this.roundValue(this.getAxisY().ticks.min - incrementValue);
        this.getAxisY().ticks.max = this.roundValue(this.getAxisY().ticks.max + incrementValue);
      },
      collapseY(incrementValue) {
        let newMinY = this.getAxisY().ticks.min + incrementValue;
        let newMaxY = this.getAxisY().ticks.max - incrementValue;

        if (newMinY < newMaxY) {
          this.getAxisY().ticks.min = this.roundValue(newMinY);
          this.getAxisY().ticks.max = this.roundValue(newMaxY);
        }
      }
    }
  }
</script>