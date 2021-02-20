<template>
  <v-container>
    <v-row>
      <gyro-values-chart
        :angles="angles"
        ref="gyroValuesChartRef"
      />
    </v-row>
    <v-row style="font-size: 18px;">
      <v-col>
        <v-card
          shaped
          style="border: 3px solid #4d4d4d;"
        >
          <div style="text-align: center;">
            {{"Time: " + timeInSeconds}}
          </div>
        </v-card>
      </v-col>
      <v-col>
        <v-card
          shaped
          :style="'border: 3px solid ' + (angles.pitch.show ? angles.pitch.color : turnOffAngleColor)"
        >
          <div
            class="angle-displayer-btn"
            @click="$refs.gyroValuesChartRef.centerYByMiddleValue(pitch)"
          >
            {{"Pitch: " + pitch}}
          </div>
          <v-btn
            icon
            @click="angles.pitch.show = !angles.pitch.show"
            small absolute right fab
            :style="{top: '50%', transform:'translate(35%, -50%)'}"
          > 
            <v-icon v-if="angles.pitch.show">mdi-eye-off</v-icon>
            <v-icon v-else>mdi-eye</v-icon>
          </v-btn>
        </v-card>
      </v-col>
      <v-col>
        <v-card
          shaped
          :style="'border: 3px solid ' + (angles.roll.show ? angles.roll.color : turnOffAngleColor)"
        >
          <div
            class="angle-displayer-btn"
            @click="$refs.gyroValuesChartRef.centerYByMiddleValue(roll)"
          >
            {{"Roll: " + roll}}
          </div>
          <v-btn
            icon
            @click="angles.roll.show = !angles.roll.show"
            small absolute right fab
            :style="{top: '50%', transform:'translate(35%, -50%)'}"
          > 
            <v-icon v-if="angles.roll.show">mdi-eye-off</v-icon>
            <v-icon v-else>mdi-eye</v-icon>
          </v-btn>
        </v-card>
      </v-col>
      <v-col>
        <v-card
          shaped
          :elevation="25"
          :style="'border: 3px solid ' + (angles.yaw.show ? angles.yaw.color : turnOffAngleColor)"
        >
          <div
            class="angle-displayer-btn"
            @click="$refs.gyroValuesChartRef.centerYByMiddleValue(yaw)"
          >
            {{"Yaw: " + yaw}}
          </div>
          <v-btn
            icon
            @click="angles.yaw.show = !angles.yaw.show"
            small absolute right fab
            :style="{top: '50%', transform:'translate(35%, -50%)'}"
          > 
            <v-icon v-if="angles.yaw.show">mdi-eye-off</v-icon>
            <v-icon v-else>mdi-eye</v-icon>
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import GyroValuesChart from "../components/chart/GyroValuesChart"

  export default {
    name: 'GyroJsonShower',
    data: () => ({
      angles: {
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
      },
      turnOffAngleColor: "#4d4d4d"
    }),
    components: {
      GyroValuesChart
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

<style>
  .angle-displayer-btn {
    text-align: center;
    cursor: pointer;
  }
</style>