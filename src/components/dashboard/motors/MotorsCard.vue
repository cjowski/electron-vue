<template>
  <v-card to="/motor">
    <v-container>
      <v-row align="center" justify="center">
        MOTORS
      </v-row>
      <v-row class="ma-0 pa-0 pt-2">
        <v-col align="center" justify="center" class="ma-0 pa-0">
          <motor-circle :motorSpeed="motorSpeeds[0]" />
        </v-col>
        <v-col align="center" justify="center" class="ma-0 pa-0">
          <motor-circle :motorSpeed="motorSpeeds[1]" />
        </v-col>
      </v-row>
      <v-row class="ma-0 pa-0">
        <v-col align="center" justify="center" class="ma-0 pa-0">
          <motor-circle :motorSpeed="motorSpeeds[2]" />
        </v-col>
        <v-col align="center" justify="center" class="ma-0 pa-0">
          <motor-circle :motorSpeed="motorSpeeds[3]" />
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
      motorMinSpeed: 1000,
      motorMaxSpeed: 2000
    }),

    components: {
      MotorCircle
    },

    computed: {
      espMotorsJson() {
        return this.$store.getters['motor/espMotorsJson'];
      },
      lastMotorsData() {
        if (this.espMotorsJson == null) {
          return null;
        }
        return this.espMotorsJson.Motors[this.espMotorsJson.Motors.length - 1];
      },
      motorSpeeds() {
        if (this.lastMotorsData == null) {
          return [
            this.motorMinSpeed,
            this.motorMinSpeed,
            this.motorMinSpeed,
            this.motorMinSpeed
          ];
        }
        var values = [];
        this.lastMotorsData.MotorSpeed.forEach(function(motorSpeed) {
          values.push(motorSpeed);
        });
        return values;
      },
    }
  }
</script>