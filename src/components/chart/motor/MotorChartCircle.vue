<template>
  <div>
    <div
      :style="sizeStyle"
      class="motor-chart-circle-inner-text"
    >
      <div style="height: 100%">
        {{motorSpeedPercentage}}%
      </div>
    </div>
    <div
      :style="sizeStyle + 'position: absolute;'"
    >
      <v-btn
        icon absolute right bottom fab
        @click="motorSettings.show = !motorSettings.show"
        :style="{transform:'translate(60%, 10%)'}"
      > 
        <v-icon v-if="motorSettings.show">mdi-eye</v-icon>
        <v-icon v-else>mdi-eye-off</v-icon>
      </v-btn>
    </div>
    <doughnut-chart
      :style="sizeStyle"
      :chart-data="chartData"
      :options="chartOptions"
    />
  </div>
</template>

<script>
  import DoughnutChart from "@/components/chart/DoughnutChart"

  export default {
    name: 'MotorChartCircle',

    data: () => ({
      chartData: {
        datasets: [{
          data: [0, 100],
          backgroundColor: ["#424242", "#424242"],
          borderColor: ["#1E1E1E", "#1E1E1E"],
          borderWidth: [2, 2],
          weight: 1
        }]
      },
      chartOptions: {
        responsive: true,
        animation: {
          duration: 0
        },
        tooltips:{
          enabled: false
        }
      },
      backgroundColor: "#424242",
      borderColor: "#1E1E1E",
      borderWidth: 2,
      turnOffColor: "#37474F"
    }),

    props: {
      motorSpeed: {
        type: Number,
        default: 1000
      },
      motorMinSpeed: {
        type: Number,
        default: 1000
      },
      motorMaxSpeed: {
        type: Number,
        default: 2000
      },
      motorSettings: {
        type: Object
      }
    },

    components: {
      DoughnutChart
    },

    created() {
      this.updateChartData();
    },

    computed: {
      motorSpeedPercentage() {
        return Math.round(
          (this.motorSpeed - this.motorMinSpeed) / (this.motorMaxSpeed - this.motorMinSpeed) * 100
        );
      },
      circleSize() {
        switch (this.$vuetify.breakpoint.name) {
          case 'xs': return 60;
          case 'sm': return 80;
          case 'md': return 120;
          case 'lg': return 120;
          case 'xl': return 150;
          default : throw Error("Invalid $vuetify.breakpoint.name: " + this.$vuetify.breakpoint.name);
        }
      },
      sizeStyle() {
        return "height: " + this.circleSize + "px;"
          + "width: " + this.circleSize + "px;";
      }
    },

    watch: {
      motorSpeed() {
        this.updateChartData();
      }
    },

    methods: {
      updateChartData() {
        this.chartData = {
          datasets: [{
            data: [
              this.motorSpeedPercentage,
              100 - this.motorSpeedPercentage
            ],
            backgroundColor: [
              this.motorSettings.show ? this.motorSettings.color : this.turnOffColor,
              this.backgroundColor
            ],
            borderColor: [
              this.borderColor,
              this.borderColor
            ],
            borderWidth: [
              this.borderWidth,
              this.borderWidth
            ]
          }]
        };
      }
    }
  }
</script>

<style>
  .motor-chart-circle-inner-text
  {
    position: absolute;
    transform: translate(0%, 41%);
    user-select: none;
  }
</style>