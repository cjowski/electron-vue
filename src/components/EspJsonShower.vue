<template>
  <v-container>
    <v-row class="pt-6">
      <fm-channel-values-chart :espJson="espJson" :channelColors="channelColors" />
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
      espJson: null,
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
      lastFmChannelValues: function () {
        if (this.espJson == null) {
          return null;
        }
        return this.espJson.FmChannelValues[this.espJson.FmChannelValues.length - 1];
      },
      time: function () {
        if (this.espJson == null) {
          return -1;
        }
        return this.lastFmChannelValues.Time;
      },
      fmChannelValues: function () {
        if (this.espJson == null) {
          return [-1, -1, -1, -1];
        }
        var values = [];
        this.lastFmChannelValues.ChannelValues.forEach(function(value) {
          values.push(value);
        });
        return values;
      }
    },
    mounted: function() {
      const self = this;          
      this.fetchJsonInterval = setInterval(function(){
        fetch("http://192.168.0.31/")
          .then(response => response.json())
          .then(data => {
            if (data != null) {
              self.espJson = data;
            }
          });
      }, 50);
    }
  }
</script>
