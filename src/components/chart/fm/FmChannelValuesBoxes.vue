<template>
  <v-card-actions class="ma-0 pa-0 pb-2">
    <v-col class="ma-0 pa-0 pb-1 pt-1">
      <chart-value-box
        v-model="timeSettings"
        :chartValue="time"
      />
    </v-col>
    <v-col
      v-for="(fmChannelValue, index) in fmChannelValues"
      :key="index"
      class="ma-0 pa-0 pb-1 pt-1"
    >
      <chart-value-box
        v-model="channelSettings[index]"
        :chartValue="fmChannelValue.toString()"
        :onClickFunction="function () { fmChartToolsRef.centerYByMiddleValue(fmChannelValue) }"
        showEye
      />
    </v-col>
  </v-card-actions>
</template>

<script>
  import ChartValueBox from "@/components/chart/ChartValueBox"
  import commonMethods from "@/common/commonMethods"

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
      fmChartToolsRef: {
        type: Object
      }
    },

    computed: {
      espFmChannelValuesJson() {
        return this.$store.getters['fm/espFmChannelValuesJson'];
      },
      lastFmChannelValues() {
        if (this.espFmChannelValuesJson == null) {
          return null;
        }
        return this.espFmChannelValuesJson.FmChannelValues[this.espFmChannelValuesJson.FmChannelValues.length - 1];
      },
      time() {
        if (this.lastFmChannelValues == null) {
          return "0:00";
        }
        return commonMethods.getTimeMSSFromMs(this.lastFmChannelValues.Time);
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