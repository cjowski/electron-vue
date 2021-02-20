<template>
  <v-container class="ma-0 pa-0">
    <v-card>
      <fm-channel-values-chart
        :channelSettings="channelSettings"
        :fmSignalState="fmSignalState"
        class="ma-0 mt-1 pt-2 pb-0"
      />
      <v-card-actions class="ma-0 pt-0">
        <v-col class="ma-0 pa-1">
          <chart-value-box
            v-model="timeSettings"
            :chartValue="timeInSeconds + ' (s)'"
          />
        </v-col>
        <v-col
          v-for="(fmChannelValue, index) in fmChannelValues"
          :key="index"
          class="ma-0 pa-1"
        >
          <chart-value-box
            v-model="channelSettings[index]"
            :chartValue="fmChannelValue.toString()"
            showEye
          />
        </v-col>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
  import FmChannelValuesChart from "../components/chart/FmChannelValuesChart"
  import ChartValueBox from "../components/chart/ChartValueBox"

  export default {
    name: 'EspJsonShower',

    components: {
      FmChannelValuesChart,
      ChartValueBox
    },

    data: () => ({
      timeSettings: {
        show: true,
        color: "#4d4d4d"
      },
      channelSettings: [
        {
          show: true,
          color: "#ebc437"
        },
        {
          show: true,
          color: "#dd2222"
        },
        {
          show: true,
          color: "#1eb370"
        },
        {
          show: true,
          color: "#0067e6"
        }
      ]
    }),
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
      fmSignalState() {
        if (this.lastFmChannelValues == null) {
          return 0;
        }
        return this.lastFmChannelValues.FmSignalState;
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
