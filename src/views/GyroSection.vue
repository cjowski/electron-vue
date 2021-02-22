<template>
  <v-container class="ma-0 pa-0">
    <v-card>
      <gyro-values-chart class="ma-0 mt-1 pt-2 pb-0" />
    </v-card>
  </v-container>
</template>

<script>
  import GyroValuesChart from "@/components/chart/gyro/GyroValuesChart"

  export default {
    name: 'GyroSection',

    components: {
      GyroValuesChart
    }
  }
</script>