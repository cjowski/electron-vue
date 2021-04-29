<template>
  <v-scroll-x-transition>
    <v-card to="/gyro" v-if="show">
      <v-container>
        <v-row align="center" justify="center">
          GYRO
        </v-row>
        <v-row class="ma-0 pa-0 pt-2">
          <v-col align="center" class="ma-0 pa-0">
            <gyro-circle
              :angle="pitch"
              icon="mdi-axis-x-rotate-clockwise"
              circleColor="#ebc437"
            />
          </v-col>
          <v-col align="center" class="ma-0 pa-0">
            <gyro-circle
              :angle="roll"
              icon="mdi-axis-y-rotate-clockwise"
              circleColor="#dd2222"
            />
          </v-col>
        </v-row>
        <v-row justify="center" class="ma-0 pa-0 pt-0">
          <v-col align="center" class="ma-0 pa-0">
            <gyro-circle
              :angle="yaw"
              icon="mdi-axis-z-rotate-clockwise"
              circleColor="#1eb370"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-scroll-x-transition>
</template>

<script>
  import GyroCircle from "@/components/dashboard/gyro/GyroCircle"

  export default {
    name: 'GyroCard',

    data: () => ({
      show: false
    }),

    components: {
      GyroCircle
    },

    mounted() {
      let self = this;
      setTimeout(
        function() {
          self.show = true;
        },
        150
      )
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