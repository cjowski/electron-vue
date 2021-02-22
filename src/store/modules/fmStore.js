export default {
  namespaced: true,
  
  state: {
    espFmChannelValuesJson: null,
    fmChannelChartData: {
      channelsCount: 4,
      valuesLimit: 250,
      time: [],
      ch1: [],
      ch2: [],
      ch3: [],
      ch4: []
    },
  },

  getters: {
    espFmChannelValuesJson: state => {
      return state.espFmChannelValuesJson;
    },
    fmChannelChartData: state => {
      return state.fmChannelChartData;
    },
    fmSignalState: state => {
      if (state.espFmChannelValuesJson == null) {
        return 0;
      }
      return state.espFmChannelValuesJson.FmChannelValues[state.espFmChannelValuesJson.FmChannelValues.length - 1].FmSignalState;
    }
  },

  mutations: {
    setEspFmChannelValuesJson(state, newEspFmChannelValuesJson) {
      state.espFmChannelValuesJson = newEspFmChannelValuesJson;
    },
    addFmChannelValues(state, espFmChannelValuesJson) {
      espFmChannelValuesJson.FmChannelValues.forEach(function(fmValue) {
        if (!state.fmChannelChartData.time.includes(fmValue.Time)) {
          if (state.fmChannelChartData.time.length == state.fmChannelChartData.valuesLimit) {
            state.fmChannelChartData.time.shift();
            state.fmChannelChartData.ch1.shift();
            state.fmChannelChartData.ch2.shift();
            state.fmChannelChartData.ch3.shift();
            state.fmChannelChartData.ch4.shift();
          }
  
          state.fmChannelChartData.time.push(
            parseInt(fmValue.Time)
          );
          state.fmChannelChartData.ch1.push(
            parseInt(fmValue.ChannelValues[0])
          );
          state.fmChannelChartData.ch2.push(
            parseInt(fmValue.ChannelValues[1])
          );
          state.fmChannelChartData.ch3.push(
            parseInt(fmValue.ChannelValues[2])
          );
          state.fmChannelChartData.ch4.push(
            parseInt(fmValue.ChannelValues[3])
          );
        }
      });
    }
  },

  actions: {
  },

  modules: {
  }
}