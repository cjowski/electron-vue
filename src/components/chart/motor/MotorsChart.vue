<template>
  <v-container>
    <v-row>
      <v-col cols=2 align="center" class="pt-8">
        <v-row justify="center" align="start" style="height: 50%">
          <motor-chart-circle
            :motorSettings="motorSettings[0]"
            :motorSpeed="motorSpeeds[0]"
          />
        </v-row>
        <v-row justify="center" align="end" style="height: 45%">
          <motor-chart-circle
            :motorSettings="motorSettings[1]"
            :motorSpeed="motorSpeeds[1]"
          />
        </v-row>
      </v-col>
      <v-col cols=8 class="pl-0 pr-2">
        <v-row class="ma-0 pa-0">
          <line-chart
            :style="'height: ' + chartHeight + 'px; width: 100%;'"
            :chart-data="chartData"
            :options="chartOptions"
          />
        </v-row>
        <v-row justify="center" class="ma-0 pa-0 pt-1">
          <v-card
            outlined
            shaped
            width="25%"
            :style="'border: 2px solid ' + timeSettings.color"
            class="motors-chart-time-box"
          >
            {{time}}
          </v-card>
        </v-row>
      </v-col>
      <v-col cols=2 align="center" class="pt-8">
        <v-row justify="center" align="start" style="height: 50%">
          <motor-chart-circle
            :motorSettings="motorSettings[2]"
            :motorSpeed="motorSpeeds[2]"
          />
        </v-row>
        <v-row justify="center" align="end" style="height: 45%">
          <motor-chart-circle
            :motorSettings="motorSettings[3]"
            :motorSpeed="motorSpeeds[3]"
          />
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import LineChart from "@/components/chart/LineChart"
  import MotorChartCircle from "@/components/chart/motor/MotorChartCircle"
  import commonMethods from "@/common/commonMethods"

  export default {
    name: 'MotorsChart',

    components: {
      LineChart,
      MotorChartCircle
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
      motorMinSpeed: 1000,
      motorMaxSpeed: 2000,
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
      lastMotorsData() {
        if (this.espMotorsJson == null) {
          return null;
        }
        return this.espMotorsJson.Motors[this.espMotorsJson.Motors.length - 1];
      },
      time() {
        if (this.lastMotorsData == null) {
          return "0:00";
        }
        return commonMethods.getTimeMSSFromMs(this.lastMotorsData.Time);
      },
      motorSpeeds() {
        if (this.lastMotorsData == null) {
          return [
            this.motorMinSpeed,
            this.motorMinSpeed,
            this.motorMinSpeed,
            this.motorMinSpeed
          ];
        }
        var values = [];
        this.lastMotorsData.MotorSpeed.forEach(function(motorSpeed) {
          values.push(motorSpeed);
        });
        return values;
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

<style>
  .motors-chart-time-box
  {
    text-align: center;
    user-select: none;
  }
</style>