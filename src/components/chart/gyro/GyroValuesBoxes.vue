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
        v-model="angleSettings.pitch"
        :chartValue="pitch.toFixed(2)"
        :onClickFunction="function () { gyroChartToolsRef.centerYByMiddleValue(pitch) }"
        showEye
      />
    </v-col>
    <v-col class="ma-0 pa-1">
      <chart-value-box
        v-model="angleSettings.roll"
        :chartValue="roll.toFixed(2)"
        :onClickFunction="function () { gyroChartToolsRef.centerYByMiddleValue(roll) }"
        showEye
      />
    </v-col>
    <v-col class="ma-0 pa-1">
      <chart-value-box
        v-model="angleSettings.yaw"
        :chartValue="yaw.toFixed(2)"
        :onClickFunction="function () { gyroChartToolsRef.centerYByMiddleValue(yaw) }"
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
      angleSettings: {
        type: Object
      },
      gyroChartToolsRef: {
        type: Object
      }
    },

    data: () => ({
      previousAngleSettings: null
    }),

    created() {
      this.previousAngleSettings = JSON.parse(JSON.stringify(this.angleSettings));
    },

    computed: {
      espGyroValuesJson() {
        return this.$store.getters['gyro/espGyroValuesJson'];
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
    },

    watch: {
      angleSettings: {
        deep: true,
        handler: function () {
          if (this.angleSettings.pitch.locked != this.previousAngleSettings.pitch.locked) {
            this.angleSettings.roll.locked = false;
            this.angleSettings.yaw.locked = false;
          }
          else if (this.angleSettings.roll.locked != this.previousAngleSettings.roll.locked) {
            this.angleSettings.pitch.locked = false;
            this.angleSettings.yaw.locked = false;
          }
          else if (this.angleSettings.yaw.locked != this.previousAngleSettings.yaw.locked) {
            this.angleSettings.pitch.locked = false;
            this.angleSettings.roll.locked = false;
          }
          this.previousAngleSettings = JSON.parse(JSON.stringify(this.angleSettings));
        }
      }
    }
  }
</script>