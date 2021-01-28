<template>
  <v-container>
    <v-row class="pt-6">
      <fm-channel-values-chart :channelColors="channelColors" />
    </v-row>
    <v-row>
      <v-col>
        <v-card
          shaped
          style="border: 3px solid #4d4d4d;"
        >
          <div style="text-align: center">
            {{"Time: " + time}}
          </div>
        </v-card>
      </v-col>
      <v-col v-for="(fmChannelValue, index) in fmChannelValues" :key="index">
        <v-card
          shaped
          :style="'border: 3px solid ' + channelColors[index]"
        >
          <div style="text-align: center">
            {{"CH" + (index + 1) + ": " + fmChannelValue}}
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import FmChannelValuesChart from "./FmChannelValuesChart.vue"

  export default {
    name: 'EspJsonShower',
    data: () => ({
      channelColors: [
        "#ebc437",
        "#dd2222",
        "#294bd6",
        "#1eb370"
      ]
    }),
    components: {
      FmChannelValuesChart
    },
    computed: {
      espFmChannelValuesJson() {
        return this.$store.getters.espFmChannelValuesJson;
      },
      lastFmChannelValues: function () {
        if (this.espFmChannelValuesJson == null) {
          return null;
        }
        return this.espFmChannelValuesJson.FmChannelValues[this.espFmChannelValuesJson.FmChannelValues.length - 1];
      },
      time: function () {
        if (this.espFmChannelValuesJson == null) {
          return -1;
        }
        return this.lastFmChannelValues.Time;
      },
      fmChannelValues: function () {
        if (this.espFmChannelValuesJson == null) {
          return [-1, -1, -1, -1];
        }
        var values = [];
        this.lastFmChannelValues.ChannelValues.forEach(function(value) {
          values.push(value);
        });
        return values;
      }
    }
  }
</script>
