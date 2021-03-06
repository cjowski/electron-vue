<template>
  <v-card
    outlined
    class="esp-mode-card"
    :style="selected ? selectedCardStyle : notSelectedCardStyle"
  >
    <v-card-title>
      <div class="esp-mode-card-title">
        ESP32 Access Point
      </div>
      <v-spacer />
      <esp-connected-icon :connected="connected" />
    </v-card-title>
    <v-card-text class="pb-0">
      <v-row>
        <v-col cols=8>
          <v-text-field
            v-model="value"
            label="ESP IP"
            outlined
          />
        </v-col>
        <v-col cols=4>
          <v-text-field
            v-model="espPort"
            label="PORT"
            outlined
            disabled
          />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
  import EspConnectedIcon from "@/components/espConnect/EspConnectedIcon"

  export default {
    name: "EspAccessPoint",

    components: {
      EspConnectedIcon
    },

    data: () => ({
      espPort: "",
      selectedCardStyle: "border: 2px solid #03A9F4",
      notSelectedCardStyle: "border: 2px solid #363636"
    }),

    props: {
      value: {
        type: String
      },
      selected: {
        type: Boolean
      }
    },

    created() {
      this.espPort = this.$store.getters['espConnect/espPort'];
    },

    computed: {
      connected () {
        return this.$store.getters['espConnect/connected'];
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