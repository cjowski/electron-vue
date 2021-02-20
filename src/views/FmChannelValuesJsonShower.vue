<template>
  <v-container>
    <v-row class="pt-6">
      <v-col class="d-flex justify-end">
        <v-card
          outlined
          width="130"
          :style="'border: 4px solid ' + fmSignalBorderColor"
        >
          <v-card-title class="justify-center text-subtitle-1">
            <span>
              {{fmSignalActiveText}}
            </span>
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <fm-channel-values-chart :channelColors="channelColors" />
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
  import FmChannelValuesChart from "../components/chart/FmChannelValuesChart"

  export default {
    name: 'EspJsonShower',
    data: () => ({
      channelColors: [
        "#ebc437",
        "#dd2222",
        "#1eb370",
        "#0067e6"
      ]
    }),
    components: {
      FmChannelValuesChart
    },
    computed: {
      espFmChannelValuesJson() {
        return this.$store.getters.espFmChannelValuesJson;
      },
      lastFmChannelValues() {
        if (this.espFmChannelValuesJson == null) {
          return null;
        }
        return this.espFmChannelValuesJson.FmChannelValues[this.espFmChannelValuesJson.FmChannelValues.length - 1];
      },
      timeInSeconds() {
        if (this.lastFmChannelValues == null) {
          return -1;
        }
        return parseInt(this.lastFmChannelValues.Time / 1000);
      },
      fmSignalActive() {
        if (this.lastFmChannelValues == null) {
          return false;
        }
        return this.lastFmChannelValues.FmSignalActive;
      },
      fmSignalActiveText() {
        return this.fmSignalActive
          ? "SIGNAL"
          : "NO SIGNAL";
      },
      fmSignalBorderColor() {
        return this.fmSignalActive
          ? "green"
          : "red";
      },
      fmChannelValues() {
        if (this.lastFmChannelValues == null) {
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
