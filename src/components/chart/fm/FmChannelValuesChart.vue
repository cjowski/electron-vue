<template>
  <v-container>
    <chart-scrollers
      :axisY="chartOptions.scales.yAxes[0]"
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
    name: 'FmChannelValuesChart',

    props: {
      channelSettings: {
        type: Array
      }
    },

    components: {
      LineChart,
      ChartScrollers
    },

    data: () => ({
      chartData: {},
      defaultMaxY: 2600,
      defaultMinY: 800,
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
              max: 2600,
              min: 800,
              stepSize: 200,
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
      espFmChannelValuesJson() {
        return this.$store.getters.espFmChannelValuesJson;
      },
      fmChannelChartData() {
        return this.$store.getters.fmChannelChartData;
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
      espFmChannelValuesJson() {
        this.updateChartData();
      }
    },

    methods: {
      updateChartData() {
        let fill = false;
        let borderWidth = 3;
        let chartDatasets = [];

        if (this.channelSettings[0].show) {
          chartDatasets.push({
            label: "FM CH1",
            data: this.fmChannelChartData.ch1,
            fill: fill,
            borderColor: this.channelSettings[0].color,
            borderWidth: borderWidth
          });
        }

        if (this.channelSettings[1].show) {
          chartDatasets.push({
            label: "FM CH2",
            data: this.fmChannelChartData.ch2,
            fill: fill,
            borderColor: this.channelSettings[1].color,
            borderWidth: borderWidth
          });
        }

        if (this.channelSettings[2].show) {
          chartDatasets.push({
            label: "FM CH3",
            data: this.fmChannelChartData.ch3,
            fill: fill,
            borderColor: this.channelSettings[2].color,
            borderWidth: borderWidth
          });
        }

        if (this.channelSettings[3].show) {
          chartDatasets.push({
            label: "FM CH4",
            data: this.fmChannelChartData.ch4,
            fill: fill,
            borderColor: this.channelSettings[3].color,
            borderWidth: borderWidth
          });
        }

        this.chartData = {
          labels: this.fmChannelChartData.time,
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
        return parseFloat(value.toFixed(0));
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