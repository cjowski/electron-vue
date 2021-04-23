<template>
  <v-card to="/motor">
    <v-container>
      <v-row align="center" justify="center">
        MOTORS
      </v-row>
      <v-row class="ma-0 pa-0 pt-4">
        <v-col align="center" justify="center" class="ma-0 pa-0">
          <motor-circle :motorSpeedPercentage="motorSpeedPercentages[0]" />
        </v-col>
        <v-col align="center" justify="center" class="ma-0 pa-0">
          <motor-circle :motorSpeedPercentage="motorSpeedPercentages[1]" />
        </v-col>
      </v-row>
      <v-row class="ma-0 pa-0 pt-2">
        <v-col align="center" justify="center" class="ma-0 pa-0">
          <motor-circle :motorSpeedPercentage="motorSpeedPercentages[2]" />
        </v-col>
        <v-col align="center" justify="center" class="ma-0 pa-0">
          <motor-circle :motorSpeedPercentage="motorSpeedPercentages[3]" />
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
  import MotorCircle from "@/components/dashboard/motors/MotorCircle"

  export default {
    name: 'MotorsCard',

    data: () => ({
      minSpeed: 1000,
      maxSpeed: 2000,
      motorSpeedPercentages: [0, 0, 0, 0],
      updateInterval: null
    }),

    components: {
      MotorCircle
    },

    created() {
      this.updateInterval = setInterval(
        this.updateMotorSpeedPercentages,
        5
      );
    },

    destroyed() {
      clearInterval(this.updateInterval);
    },

    computed: {
      espMotorsJson() {
        return this.$store.getters['motor/espMotorsJson'];
      },
      lastMotors() {
        if (this.espMotorsJson == null) {
          return null;
        }
        return this.espMotorsJson.Motors[this.espMotorsJson.Motors.length - 1];
      }
    },

    methods: {
      updateMotorSpeedPercentages() {
        if (this.lastMotors == null) {
          return [0, 0, 0, 0];
        }
        let values = [];
        let self = this;
        this.lastMotors.MotorSpeed.forEach(function(motorSpeed) {
          var speedPercentage = Math.round(
            (motorSpeed - self.minSpeed) / (self.maxSpeed - self.minSpeed) * 100
          );
          values.push(speedPercentage);
        });
        self.motorSpeedPercentages = values;
      }
    }
  }
</script>