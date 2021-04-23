<template>
  <v-container class="ma-0 pa-0">
    <v-row>
      <v-col cols=2 class="pt-4 pr-1">
        <v-row>
          <v-col>
            <esp-card />
          </v-col>
        </v-row>
        <v-row>
          <v-col class="pt-0">
            <fm-card />
          </v-col>
        </v-row>
      </v-col>
      <v-col cols=3 class="pt-4 pl-2">
        <motors-card />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import EspCard from "@/components/dashboard/EspCard"
  import FmCard from "@/components/dashboard/FmCard"
  import MotorsCard from "@/components/dashboard/motors/MotorsCard"

  export default {
    name: 'DashboardSection',

    components: {
      EspCard,
      FmCard,
      MotorsCard
    },

    computed: {
      
    }
  }
</script>
