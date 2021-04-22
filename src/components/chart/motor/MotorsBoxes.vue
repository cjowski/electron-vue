<template>
  <v-card-actions class="ma-0 pa-0 pb-2">
    <v-col class="ma-0 pa-0 pb-1 pt-1">
      <chart-value-box
        v-model="timeSettings"
        :chartValue="time"
      />
    </v-col>
    <v-col
      v-for="(motor, index) in motors"
      :key="index"
      class="ma-0 pa-0 pb-1 pt-1"
    >
      <chart-value-box
        v-model="motorSettings[index]"
        :chartValue="motor.toString()"
        showEye
      />
    </v-col>
  </v-card-actions>
</template>

<script>
  import ChartValueBox from "@/components/chart/ChartValueBox"
  import commonMethods from "@/common/commonMethods"

  export default {
    name: 'MotorsBoxes',

    components: {
      ChartValueBox
    },

    props: {
      timeSettings: {
        type: Object
      },
      motorSettings: {
        type: Array
      }
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
      },
      time() {
        if (this.lastMotors == null) {
          return "0:00";
        }
        return commonMethods.getTimeMSSFromMs(this.lastMotors.Time);
      },
      motors() {
        if (this.lastMotors == null) {
          return [-1, -1, -1, -1];
        }
        var values = [];
        this.lastMotors.MotorSpeed.forEach(function(motorSpeed) {
          values.push(motorSpeed);
        });
        return values;
      }
    }
  }
</script>