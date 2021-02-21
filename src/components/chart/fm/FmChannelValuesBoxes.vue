<template>
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
</template>

<script>
  import ChartValueBox from "@/components/chart/ChartValueBox"

  export default {
    name: 'FmChannelValuesBoxes',

    components: {
      ChartValueBox
    },

    props: {
      timeSettings: {
        type: Object
      },
      channelSettings: {
        type: Array
      },
      chartRef: {
        type: Object
      }
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