<template>
  <v-container>
    <chart-scrollers
      :axisY="chartOptions.scales.yAxes[0]"
      :roundDecimals=2
    />
    <line-chart
      :style="'height: ' + chartHeight + 'px; width: calc(100% - 40px);'"
      :chart-data="chartData"
      :options="chartOptions"
    />
    <chart-tools
      :axisY="chartOptions.scales.yAxes[0]"
      :defaultMaxY="90"
      :defaultMinY="-90"
      :maxExpandValue="5"
      ref="gyroChartToolsRef"
    />
    <gyro-values-boxes
      :timeSettings="timeSettings"
      :angleSettings="angleSettings"
      :gyroChartToolsRef="gyroChartToolsRef"
    />
  </v-container>
</template>

<script>
  import LineChart from "@/components/chart/LineChart"
  import ChartScrollers from "@/components/chart/ChartScrollers"
  import ChartTools from "@/components/chart/ChartTools"
  import GyroValuesBoxes from "@/components/chart/gyro/GyroValuesBoxes"
  import commonMethods from "@/common/commonMethods"

  export default {
    name: 'GyroValuesChart',

    components: {
      LineChart,
      ChartScrollers,
      ChartTools,
      GyroValuesBoxes
    },

    data: () => ({
      chartData: {},
      timeSettings: {
        show: true,
        color: "#4d4d4d"
      },
      angleSettings: {
        pitch: {
          show: true,
          locked: false,
          color: "#ebc437"
        },
        roll: {
          show: true,
          locked: false,
          color: "#dd2222"
        },
        yaw: {
          show: true,
          locked: false,
          color: "#1eb370"
        }
      },
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
      },
      gyroChartToolsRef: null
    }),

    mounted () {
      this.gyroChartToolsRef = this.$refs.gyroChartToolsRef;
    },

    computed: {
      espGyroValuesJson() {
        return this.$store.getters['gyro/espGyroValuesJson'];
      },
      gyroChartData() {
        return this.$store.getters['gyro/gyroChartData'];
      },
      chartHeight () {
        return commonMethods.getChartHeight(
          this.$vuetify.breakpoint.name
        );
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
        let borderWidth = 2;
        let chartDatasets = [];
        this.lockAngles();

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
      lockAngles() {
        if (this.angleSettings.pitch.locked) {
          this.lockAngle(this.gyroChartData.pitch);
        }
        if (this.angleSettings.roll.locked) {
          this.lockAngle(this.gyroChartData.roll);
        }
        if (this.angleSettings.yaw.locked) {
          this.lockAngle(this.gyroChartData.yaw);
        }
      },
      lockAngle(angleData) {
        this.gyroChartToolsRef.centerYByMiddleValue(angleData[angleData.length - 1]);
      }
    }
  }
</script>