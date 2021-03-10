<template>
  <v-navigation-drawer
    right
    permanent
    absolute
    floating
    mini-variant
    mini-variant-width=50
    color="#1E1E1E"
    style="z-index: 0; border-radius: 5px;"
  >
    <v-list class="pt-0 pb-0">
      <v-list-item>
        <esp-connected-icon :connected="espConnected" />
      </v-list-item>
      <v-list-item
        v-if="restoreDefault"
        @click="restoreDefault"
      >
        <v-icon>mdi-autorenew</v-icon>
      </v-list-item>
      <v-list-item
        v-if="editCredentials"
        @click="editCredentials"
      >
        <v-icon>mdi-cog-transfer-outline</v-icon>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
  import EspConnectedIcon from "@/components/espConnect/EspConnectedIcon"

  export default {
    name: "EspModeTools",

    components: {
      EspConnectedIcon
    },

    props: {
      espConnected: {
        type: Boolean
      },
      restoreDefault: {
        type: Function,
        default: null
      },
      editCredentials: {
        type: Function,
        default: null
      }
    }
  }
</script>