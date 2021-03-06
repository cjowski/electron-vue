<template>
  <v-expand-transition>
    <v-alert
      v-if="status == alertStatuses.connected"
      dense
      type="success"
      border="left"
      class="mt-3 mb-0"
    >
      Connected
    </v-alert>
    <v-alert
      v-else-if="status == alertStatuses.disconnected"
      dense
      type="warning"
      border="left"
      class="mt-3 mb-0"
    >
      Disconnected
    </v-alert>
    <v-alert
      v-else-if="status == alertStatuses.connectionFailed"
      dense
      type="error"
      border="left"
      class="mt-3 mb-0"
    >
      {{ "Connection failed (" + message + ")"}}
    </v-alert>
  </v-expand-transition>
</template>

<script>
  import commonEnums from "@/common/enums"

  export default {
    name: "EspConnectAlert",

    data: () => ({
      alertStatuses: commonEnums.alertStatuses
    }),

    props: {
      status: {
        type: Number
      },
      message: {
        type: String
      }
    }
  }
</script>