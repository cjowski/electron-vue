<template>
  <v-container class="ma-0 pa-0">
    <v-card>
      <fm-channel-values-chart class="ma-0 mt-1 pt-2 pb-0" />
      <fm-section-side-bar />
    </v-card>
  </v-container>
</template>

<script>
  import FmChannelValuesChart from "@/components/chart/fm/FmChannelValuesChart"
  import FmSectionSideBar from "@/components/chart/fm/FmSectionSideBar"

  export default {
    name: 'FmSection',

    components: {
      FmChannelValuesChart,
      FmSectionSideBar
    }
  }
</script>
