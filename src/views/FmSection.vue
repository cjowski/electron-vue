<template>
  <v-container class="ma-0 pa-0">
    <v-card>
      <fm-channel-values-chart
        :channelSettings="channelSettings"
        ref="fmChannelValuesChartRef"
        class="ma-0 mt-1 pt-2 pb-0"
      />
      <fm-channel-values-boxes
        :timeSettings="timeSettings"
        :channelSettings="channelSettings"
        :chartRef="chartRef"
      />
      <fm-section-side-bar
        :chartRef="chartRef"
      />
    </v-card>
  </v-container>
</template>

<script>
  import FmChannelValuesChart from "@/components/chart/fm/FmChannelValuesChart"
  import FmChannelValuesBoxes from "@/components/chart/fm/FmChannelValuesBoxes"
  import FmSectionSideBar from "@/components/chart/fm/FmSectionSideBar"

  export default {
    name: 'FmSection',

    components: {
      FmChannelValuesChart,
      FmChannelValuesBoxes,
      FmSectionSideBar
    },

    data: () => ({
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
      chartRef: null
    }),

    mounted () {
      this.chartRef = this.$refs.fmChannelValuesChartRef;
    }
  }
</script>
