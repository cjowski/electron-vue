<template>
  <v-container class="ma-0 pa-0">
    <v-card>
      <gyro-values-chart
        :angleSettings="anglesSettings"
        ref="gyroValuesChartRef"
        class="ma-0 mt-1 pt-2 pb-0"
      />
      <gyro-values-boxes
        :timeSettings="timeSettings"
        :anglesSettings="anglesSettings"
        :chartRef="chartRef"
      />
      <gyro-section-side-bar
        :chartRef="chartRef"
      />
    </v-card>
  </v-container>
</template>

<script>
  import GyroValuesChart from "@/components/chart/gyro/GyroValuesChart"
  import GyroValuesBoxes from "@/components/chart/gyro/GyroValuesBoxes"
  import GyroSectionSideBar from "@/components/chart/gyro/GyroSectionSideBar"

  export default {
    name: 'GyroSection',

    components: {
      GyroValuesChart,
      GyroValuesBoxes,
      GyroSectionSideBar
    },

    data: () => ({
      timeSettings: {
        show: true,
        color: "#4d4d4d"
      },
      anglesSettings: {
        pitch: {
          show: true,
          color: "#ebc437"
        },
        roll: {
          show: true,
          color: "#dd2222"
        },
        yaw: {
          show: true,
          color: "#1eb370"
        }
      },
      chartRef: null
    }),

    mounted () {
      this.chartRef = this.$refs.gyroValuesChartRef;
    }
  }
</script>