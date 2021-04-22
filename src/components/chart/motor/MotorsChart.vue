<template>
  <v-container>
    <line-chart
      :style="'height: ' + chartHeight + 'px; width: calc(100% - 40px);'"
      :chart-data="chartData"
      :options="chartOptions"
    />
    <motors-boxes
      :timeSettings="timeSettings"
      :motorSettings="motorSettings"
    />
  </v-container>
</template>

<script>
  import LineChart from "@/components/chart/LineChart"
  import MotorsBoxes from "@/components/chart/motor/MotorsBoxes"
  import commonMethods from "@/common/commonMethods"

  export default {
    name: 'MotorsChart',

    components: {
      LineChart,
      MotorsBoxes
    },

    data: () => ({
      chartData: {},
      timeSettings: {
        show: true,
        color: "#4d4d4d"
      },
      motorSettings: [
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
              max: 2000,
              min: 1000,
              stepSize: 100,
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
      espMotorsJson() {
        return this.$store.getters['motor/espMotorsJson'];
      },
      motorsChartData() {
        return this.$store.getters['motor/motorsChartData'];
      },
      chartHeight () {
        return commonMethods.getChartHeight(
          this.$vuetify.breakpoint.name
        );
      }
    },

    watch: {
      espMotorsJson() {
        this.updateChartData();
      }
    },

    methods: {
      updateChartData() {
        let fill = false;
        let borderWidth = 2;
        let chartDatasets = [];

        if (this.motorSettings[0].show) {
          chartDatasets.push({
            label: "MOTOR1",
            data: this.motorsChartData.motorSpeed1,
            fill: fill,
            borderColor: this.motorSettings[0].color,
            borderWidth: borderWidth
          });
        }

        if (this.motorSettings[1].show) {
          chartDatasets.push({
            label: "MOTOR2",
            data: this.motorsChartData.motorSpeed2,
            fill: fill,
            borderColor: this.motorSettings[1].color,
            borderWidth: borderWidth
          });
        }

        if (this.motorSettings[2].show) {
          chartDatasets.push({
            label: "MOTOR3",
            data: this.motorsChartData.motorSpeed3,
            fill: fill,
            borderColor: this.motorSettings[2].color,
            borderWidth: borderWidth
          });
        }

        if (this.motorSettings[3].show) {
          chartDatasets.push({
            label: "MOTOR4",
            data: this.motorsChartData.motorSpeed4,
            fill: fill,
            borderColor: this.motorSettings[3].color,
            borderWidth: borderWidth
          });
        }

        this.chartData = {
          labels: this.motorsChartData.time,
          datasets: chartDatasets
        };
      }
    }
  }
</script>