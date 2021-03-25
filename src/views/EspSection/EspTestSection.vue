<template>
  <v-container>
    <v-row>
      <v-col cols=4>
        <say-hi-to-stm />
      </v-col>
    </v-row>
    <esp-section-side-bar />
  </v-container>
</template>

<script>
  import EspSectionSideBar from "@/components/espSection/EspSectionSideBar"
  import SayHiToStm from "@/components/espSection/espTest/SayHiToStm"

  export default {
    name: "EspTestSection",

    components: {
      EspSectionSideBar,
      SayHiToStm
    }
  }
</script>