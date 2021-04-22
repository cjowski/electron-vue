<template>
  <v-container class="ma-0 pa-0">
    <v-card>
      <motors-chart class="ma-0 mt-1 pt-2 pb-0" />
    </v-card>
  </v-container>
</template>

<script>
  import MotorsChart from "@/components/chart/motor/MotorsChart"

  export default {
    name: 'MotorSection',

    components: {
      MotorsChart
    }
  }
</script>
