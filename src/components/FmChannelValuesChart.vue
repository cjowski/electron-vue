<template>
  <v-container>
    <line-chart
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
      channelColors: {
        type: Array
      }
    },

    components: {
      LineChart
    },

    data: () => ({
      chartData: {},
      fmChannelValues: {
        time: [],
        ch1: [],
        ch2: [],
        ch3: [],
        ch4: []
      },
      channelsCount: 4,
      valuesLimit: 250,
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
      }

    },

    watch: {

      espFmChannelValuesJson() {
        let self = this;
        this.espFmChannelValuesJson.FmChannelValues.forEach(function(fmValue) {
          if (!self.fmChannelValues.time.includes(fmValue.Time)) {
            self.addChannelValues(
              parseInt(fmValue.Time),
              parseInt(fmValue.ChannelValues[0]),
              parseInt(fmValue.ChannelValues[1]),
              parseInt(fmValue.ChannelValues[2]),
              parseInt(fmValue.ChannelValues[3])
            );
          }
        });
        this.updateChartData();
      }

    },

    methods: {

      addChannelValues(time, ch1, ch2, ch3, ch4) {
        if (this.fmChannelValues.time.length == this.valuesLimit) {
          this.fmChannelValues.time.shift();
          this.fmChannelValues.ch1.shift();
          this.fmChannelValues.ch2.shift();
          this.fmChannelValues.ch3.shift();
          this.fmChannelValues.ch4.shift();
        }

        this.fmChannelValues.time.push(time);
        this.fmChannelValues.ch1.push(ch1);
        this.fmChannelValues.ch2.push(ch2);
        this.fmChannelValues.ch3.push(ch3);
        this.fmChannelValues.ch4.push(ch4);
      },

      updateChartData() {
        let fill = false;
        let borderWidth = 3;

        this.chartData = {
          labels: this.fmChannelValues.time,
          datasets: [
            {
              label: "FM CH1",
              data: this.fmChannelValues.ch1,
              fill: fill,
              borderColor: this.channelColors[0],
              borderWidth: borderWidth
            },
            {
              label: "FM CH2",
              data: this.fmChannelValues.ch2,
              fill: fill,
              borderColor: this.channelColors[1],
              borderWidth: borderWidth
            },
            {
              label: "FM CH3",
              data: this.fmChannelValues.ch3,
              fill: fill,
              borderColor: this.channelColors[2],
              borderWidth: borderWidth
            },
            {
              label: "FM CH4",
              data: this.fmChannelValues.ch4,
              fill: fill,
              borderColor: this.channelColors[3],
              borderWidth: borderWidth
            }
          ]
        };
      }

    }
  }
</script>