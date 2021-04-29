<template>
  <div>
    <v-icon
      class="gyro-circle-icon"
      :style="iconTranslateStyle"
    >
      {{icon}}
    </v-icon>
    <doughnut-chart
      :style="circleSizeStyle"
      :chart-data="chartData"
      :options="chartOptions"
    />
  </div>
</template>

<script>
  import DoughnutChart from "@/components/chart/DoughnutChart"

  export default {
    name: 'GyroCircle',

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
      angle: {
        type: Number,
        default: 0
      },
      icon: {
        type: String,
        default: ""
      },
      circleColor: {
        type: String,
        default: "#424242"
      }
    },

    components: {
      DoughnutChart
    },

    created() {
      this.updateChartData();
    },

    computed: {
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
      iconTranslateXPortion() {
        switch (this.$vuetify.breakpoint.name) {
          case 'xs': return -41;
          case 'sm': return -41;
          case 'md': return -51;
          case 'lg': return -51;
          case 'xl': return -51;
          default : throw Error("Invalid $vuetify.breakpoint.name: " + this.$vuetify.breakpoint.name);
        }
      },
      circleSizeStyle() {
        return "height: " + this.circleSize + "px;"
          + "width: " + this.circleSize + "px;";
      },
      iconTranslateStyle() {
        return "transform: translate("
          + (this.circleSize / 2 + this.iconTranslateXPortion) + "px, "
          + (this.circleSize / 2 - 8) + "px)";
      }
    },

    watch: {
      angle() {
        this.updateChartData();
      }
    },

    methods: {
      updateChartData() {
        let chartAngle = this.angle % 360;

        let angleData = chartAngle > 0
          ? [chartAngle, 360 - chartAngle]
          : [360 - chartAngle, chartAngle];

        let angleDataColor = chartAngle > 0
          ? [this.circleColor, this.backgroundColor]
          : [this.backgroundColor, this.circleColor];

        this.chartData = {
          datasets: [{
            data: angleData,
            backgroundColor: angleDataColor,
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

<style scoped>
  .gyro-circle-icon {
    position: absolute;
  }
</style>