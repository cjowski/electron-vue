<template>
  <v-card
    outlined
    class="esp-mode-card"
    :style="selected ? selectedCardStyle : notSelectedCardStyle"
  >
    <div style="width: calc(100% - 50px);">
      <v-card-title class="esp-mode-card-title">
        ESP32 Access Point
      </v-card-title>
      <v-card-text class="pb-0">
        <v-row>
          <v-col cols=8 class="pl-1 pr-1">
            <v-text-field
              v-model="espAccessPointIP"
              label="ESP IP"
              outlined
            />
          </v-col>
          <v-col cols=4 class="pl-1 pr-1">
            <v-text-field
              v-model="espPort"
              label="PORT"
              outlined
              disabled
            />
          </v-col>
        </v-row>
      </v-card-text>
    </div>
    <esp-mode-tools
      :espConnected="connected"
      :restoreDefault="setDefault"
      editCredentials
    />
  </v-card>
</template>

<script>
  import EspModeTools from "@/components/espConnect/EspModeTools"

  export default {
    name: "EspAccessPoint",

    components: {
      EspModeTools
    },

    data: () => ({
      espAccessPointIP: "",
      espPort: "",
      selectedCardStyle: "border: 2px solid #03A9F4",
      notSelectedCardStyle: "border: 2px solid #363636"
    }),

    props: {
      selected: {
        type: Boolean
      }
    },

    created() {
      this.setDefault();
    },

    computed: {
      connected () {
        return this.$store.getters['espConnect/accessPointConnected'];
      }
    },

    methods: {
      setDefault () {
        this.espAccessPointIP = this.$store.getters['espConnect/espAccessPointIP'];
        this.espPort = this.$store.getters['espConnect/espPort'];
      }
    }
  }
</script>

<style scoped>
  .esp-mode-card {
    cursor: pointer;
  }
  .esp-mode-card-title {
    user-select: none;
  }
</style>