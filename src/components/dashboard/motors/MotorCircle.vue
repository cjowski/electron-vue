<template>
  <doughnut-chart
    :style="sizeStyle"
    :chart-data="chartData"
    :options="chartOptions"
  />
</template>

<script>
  import DoughnutChart from "@/components/chart/DoughnutChart"

  export default {
    name: 'MotorCircle',

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
      borderWidth: 2
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
      circleColor() {
        let red = Math.round(
          (255 * this.motorSpeedPercentage) / 100
        );
        let green = Math.round(
          (255 * (100 - this.motorSpeedPercentage)) / 100 
        );
        let blue = 0
        return "rgb(" + red + "," + green + "," + blue + ")";
      },
      circleSize() {
        switch (this.$vuetify.breakpoint.name) {
          case 'xs': return 58;
          case 'sm': return 58;
          case 'md': return 79;
          case 'lg': return 79;
          case 'xl': return 79;
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
              this.circleColor,
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