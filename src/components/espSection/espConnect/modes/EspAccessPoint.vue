<template>
  <v-card
    outlined
    :class="fullWidth ? 'esp-mode-card mr-2' : 'esp-mode-card'"
    :style="selected ? selectedCardStyle : notSelectedCardStyle"
  >
    <div style="width: calc(100% - 50px);">
      <v-card-title class="esp-mode-card-title">
        ESP32 Access Point
      </v-card-title>
      <v-card-text class="pb-0">
        <v-row>
          <v-col>
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
          </v-col>
          <v-col
            v-if="showEditWifiCredentials"
            class="ml-10 mr-2"
            style="margin-top: -40px"
          >
            <v-row>
              <v-combobox
                v-model="espWifiSSID"
                :items="possibleWifiSSIDs"
                hide-no-data
                label="WIFI SSID"
                outlined
                hide-details
                spellcheck=false
              />
            </v-row>
            <v-row class="pt-3">
              <v-text-field
                v-model="espWifiPassword"
                label="PASSWORD"
                outlined
                hide-details
                spellcheck=false
              />
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
    </div>
    <esp-mode-tools
      :espConnected="connected"
      :restoreDefault="setDefault"
      :editCredentials="displayEditCredentials"
    />
  </v-card>
</template>

<script>
  import EspModeTools from "@/components/espSection/espConnect/EspModeTools"

  export default {
    name: "EspAccessPoint",

    components: {
      EspModeTools
    },

    data: () => ({
      espAccessPointIP: "",
      espPort: "",
      espWifiSSID: "",
      espWifiPassword: "",
      showEditWifiCredentials: false,
      fullWidth: false,
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
      connected() {
        return this.$store.getters['espConnect/accessPointConnected'];
      },
      possibleWifiCredentials() {
        return this.$store.getters['espConnect/possibleWifiCredentials'];
      },
      possibleWifiSSIDs() {
        return this.possibleWifiCredentials.map(x => x.ssid);
      }
    },

    watch: {
      espWifiSSID(newSSID) {
        let ssidIndex = this.possibleWifiSSIDs.indexOf(newSSID);
        if (ssidIndex != -1) {
          this.espWifiPassword = this.possibleWifiCredentials[ssidIndex].password;
        }
      }
    },

    methods: {
      setDefault() {
        this.espAccessPointIP = this.$store.getters['espConnect/espAccessPointIP'];
        this.espPort = this.$store.getters['espConnect/espPort'];
        this.espWifiSSID = this.$store.getters['espConnect/espWifiSSID'];
        this.espWifiPassword = this.$store.getters['espConnect/espWifiPassword'];
      },
      displayEditCredentials() {
        this.showEditWifiCredentials = !this.showEditWifiCredentials;
        this.fullWidth = !this.fullWidth;
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