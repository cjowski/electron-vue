<template>
  <v-container>
    <chart-scrollers
      :axisY="chartOptions.scales.yAxes[0]"
    />
    <chart-scrollers
      :axisY="chartOptions.scales.yAxes[0]"
      :leftSide="false"
    />
    <line-chart
      :style="'height: ' + chartHeight + 'px; width: calc(100% - 40px);'"
      :chart-data="chartData"
      :options="chartOptions"
    />
    <chart-tools
      :axisY="chartOptions.scales.yAxes[0]"
      :defaultMaxY="2600"
      :defaultMinY="800"
      :stepsYCount="9"
      :roundDecimals="0"
      :maxExpandValue="50"
      ref="fmChartToolsRef"
    />
    <fm-channel-values-boxes
      :timeSettings="timeSettings"
      :channelSettings="channelSettings"
      :fmChartToolsRef="fmChartToolsRef"
    />
  </v-container>
</template>

<script>
  import LineChart from "@/components/chart/LineChart"
  import ChartScrollers from "@/components/chart/ChartScrollers"
  import ChartTools from "@/components/chart/ChartTools"
  import FmChannelValuesBoxes from "@/components/chart/fm/FmChannelValuesBoxes"
  import commonMethods from "@/common/commonMethods"

  export default {
    name: 'FmChannelValuesChart',

    components: {
      LineChart,
      ChartScrollers,
      ChartTools,
      FmChannelValuesBoxes
    },

    data: () => ({
      chartData: {},
      timeSettings: {
        show: true,
        color: "#4d4d4d"
      },
      channelSettings: [
        {
          show: true,
          color: "#ebc437"
        },
        {
          show: true,
          color: "#dd2222"
        },
        {
          show: true,
          color: "#1eb370"
        },
        {
          show: true,
          color: "#0067e6"
        }
      ],
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
      },
      fmChartToolsRef: null
    }),

    mounted () {
      this.fmChartToolsRef = this.$refs.fmChartToolsRef;
    },

    computed: {
      espFmChannelValuesJson() {
        return this.$store.getters['fm/espFmChannelValuesJson'];
      },
      fmChannelChartData() {
        return this.$store.getters['fm/fmChannelChartData'];
      },
      chartHeight () {
        return commonMethods.getChartHeight(
          this.$vuetify.breakpoint.name
        );
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
        let borderWidth = 2;
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
      }
    }
  }
</script>