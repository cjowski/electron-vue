<template>
  <v-scale-transition>
    <v-alert
      v-if="status == alertStatusEnum.connected"
      dense
      type="success"
      border="left"
      class="mt-3 mb-0"
    >
      Connected
    </v-alert>
    <v-alert
      v-else-if="status == alertStatusEnum.disconnected"
      dense
      type="warning"
      border="left"
      class="mt-3 mb-0"
    >
      Disconnected
    </v-alert>
    <v-alert
      v-else-if="status == alertStatusEnum.connectionFailed"
      dense
      type="error"
      border="left"
      class="mt-3 mb-0"
    >
      {{ "Connection failed (" + message + ")"}}
    </v-alert>
    <v-alert
      v-else-if="status == alertStatusEnum.info"
      dense
      type="info"
      border="left"
      class="mt-3 mb-0"
    >
      {{ message }}
    </v-alert>
  </v-scale-transition>
</template>

<script>
  import commonEnums from "@/common/enums"

  export default {
    name: "EspConnectAlert",

    data: () => ({
      alertStatusEnum: commonEnums.alertStatus
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