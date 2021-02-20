<template>
  <v-container>
    <v-card class="ma-0">
      <v-navigation-drawer
        app
        right
        permanent
        mini-variant
        mini-variant-width=64
        color="grey darken-4"
      >
        <v-list>
          <v-list-item>
            <v-icon color="deep-orange accent-3" v-if="fmSignalState == 0">mdi-wifi-cancel</v-icon>
            <v-icon color="light-green accent-3" v-if="fmSignalState == 1">mdi-wifi-check</v-icon>
            <v-icon color="cyan accent-2" v-if="fmSignalState == 2">mdi-wifi-sync</v-icon>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-card>
    <line-chart
      :style="'height: ' + chartHeight + 'px'"
      :chart-data="chartData"
      :options="chartOptions"
    />
  </v-container>
</template>

<script>
  import LineChart from "./LineChart.vue"

  export default {
    name: 'FmChannelValuesChart',

    props: {
      fmSignalState: {
        type: Number
      },
      channelSettings: {
        type: Array
      }
    },

    components: {
      LineChart
    },

    data: () => ({
      chartData: {},
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [{
            ticks: {
              display: false
            },
            gridLines: {
              display: false,
            }
          }],
          yAxes: [{
            ticks: {
              max: 2600,
              min: 800,
              stepSize: 200,
              fontColor: "#d1d1d1",
              fontSize: 16,
              fontFamily: "Calibri"
            },
            gridLines: { 
              color: "#4d4d4d"
            }
          }]
        },
        animation: {
          duration: 0
        },
        elements: {
          point:{
            radius: 0
          }
        },
        legend: {
          display: false,
          labels: {
            fontColor: "#d1d1d1",
            fontSize: 16,
            fontFamily: "Calibri"
          }
        }
      }
    }),

    computed: {
      espFmChannelValuesJson() {
        return this.$store.getters.espFmChannelValuesJson;
      },
      fmChannelChartData() {
        return this.$store.getters.fmChannelChartData;
      },
      chartHeight () {
        switch (this.$vuetify.breakpoint.name) {
          case 'xs': return 200;
          case 'sm': return 230;
          case 'md': return 500;
          case 'lg': return 600;
          case 'xl': return 800;
          default : throw Error("Invalid $vuetify.breakpoint.name: " + this.$vuetify.breakpoint.name);
        }
      }
    },

    watch: {
      espFmChannelValuesJson() {
        this.updateChartData();
      }
    },

    methods: {
      updateChartData() {
        let fill = false;
        let borderWidth = 3;
        let chartDatasets = [];

        if (this.channelSettings[0].show) {
          chartDatasets.push({
            label: "FM CH1",
            data: this.fmChannelChartData.ch1,
            fill: fill,
            borderColor: this.channelSettings[0].color,
            borderWidth: borderWidth
          });
        }

        if (this.channelSettings[1].show) {
          chartDatasets.push({
            label: "FM CH2",
            data: this.fmChannelChartData.ch2,
            fill: fill,
            borderColor: this.channelSettings[1].color,
            borderWidth: borderWidth
          });
        }

        if (this.channelSettings[2].show) {
          chartDatasets.push({
            label: "FM CH3",
            data: this.fmChannelChartData.ch3,
            fill: fill,
            borderColor: this.channelSettings[2].color,
            borderWidth: borderWidth
          });
        }

        if (this.channelSettings[3].show) {
          chartDatasets.push({
            label: "FM CH4",
            data: this.fmChannelChartData.ch4,
            fill: fill,
            borderColor: this.channelSettings[3].color,
            borderWidth: borderWidth
          });
        }

        this.chartData = {
          labels: this.fmChannelChartData.time,
          datasets: chartDatasets
        };
      }
    }
  }
</script>