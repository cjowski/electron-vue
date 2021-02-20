<template>
  <v-container class="ma-0 pa-0">
    <v-card>
      <gyro-values-chart
        :angleSettings="anglesSettings"
        ref="gyroValuesChartRef"
        class="ma-0 mt-1 pt-2 pb-0"
      />
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
            :onClickFunction="function () { $refs.gyroValuesChartRef.centerYByMiddleValue(pitch) }"
            showEye
          />
        </v-col>
        <v-col class="ma-0 pa-1">
          <chart-value-box
            v-model="anglesSettings.roll"
            :chartValue="roll.toFixed(2)"
            :onClickFunction="function () { $refs.gyroValuesChartRef.centerYByMiddleValue(roll) }"
            showEye
          />
        </v-col>
        <v-col class="ma-0 pa-1">
          <chart-value-box
            v-model="anglesSettings.yaw"
            :chartValue="yaw.toFixed(2)"
            :onClickFunction="function () { $refs.gyroValuesChartRef.centerYByMiddleValue(yaw) }"
            showEye
          />
        </v-col>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
  import GyroValuesChart from "../components/chart/GyroValuesChart"
  import ChartValueBox from "../components/chart/ChartValueBox"

  export default {
    name: 'GyroJsonShower',

    components: {
      GyroValuesChart,
      ChartValueBox
    },

    data: () => ({
      timeSettings: {
        show: true,
        color: "#4d4d4d"
      },
      anglesSettings: {
        pitch: {
          show: true,
          color: "#ebc437"
        },
        roll: {
          show: true,
          color: "#dd2222"
        },
        yaw: {
          show: true,
          color: "#1eb370"
        }
      }
    }),

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