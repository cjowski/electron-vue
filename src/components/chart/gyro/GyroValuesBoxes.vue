<template>
  <v-card-actions class="ma-0 pt-0">
    <v-col class="ma-0 pa-1">
      <chart-value-box
        v-model="timeSettings"
        :chartValue="timeInSeconds + ' (s)'"
      />
    </v-col>
    <v-col class="ma-0 pa-1">
      <chart-value-box
        v-model="anglesSettings.pitch"
        :chartValue="pitch.toFixed(2)"
        :onClickFunction="function () { chartRef.centerYByMiddleValue(pitch) }"
        showEye
      />
    </v-col>
    <v-col class="ma-0 pa-1">
      <chart-value-box
        v-model="anglesSettings.roll"
        :chartValue="roll.toFixed(2)"
        :onClickFunction="function () { chartRef.centerYByMiddleValue(roll) }"
        showEye
      />
    </v-col>
    <v-col class="ma-0 pa-1">
      <chart-value-box
        v-model="anglesSettings.yaw"
        :chartValue="yaw.toFixed(2)"
        :onClickFunction="function () { chartRef.centerYByMiddleValue(yaw) }"
        showEye
      />
    </v-col>
  </v-card-actions>
</template>

<script>
  import ChartValueBox from "@/components/chart/ChartValueBox"

  export default {
    name: 'GyroValuesBoxes',

    components: {
      ChartValueBox
    },

    props: {
      timeSettings: {
        type: Object
      },
      anglesSettings: {
        type: Object
      },
      chartRef: {
        type: Object
      }
    },

    computed: {
      espGyroValuesJson() {
        return this.$store.getters.espGyroValuesJson;
      },
      lastEspGyroValues() {
        if (this.espGyroValuesJson == null) {
          return null;
        }
        return this.espGyroValuesJson.GyroValues[this.espGyroValuesJson.GyroValues.length - 1];
      },
      timeInSeconds() {
        if (this.lastEspGyroValues == null) {
          return -1;
        }
        return parseInt(this.lastEspGyroValues.Time / 1000);
      },
      pitch() {
        if (this.lastEspGyroValues == null) {
          return -1;
        }
        return parseFloat(this.lastEspGyroValues.Pitch);
      },
      roll() {
        if (this.lastEspGyroValues == null) {
          return -1;
        }
        return parseFloat(this.lastEspGyroValues.Roll);
      },
      yaw() {
        if (this.lastEspGyroValues == null) {
          return -1;
        }
        return parseFloat(this.lastEspGyroValues.Yaw);
      }
    }
  }
</script>