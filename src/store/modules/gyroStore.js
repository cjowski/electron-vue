export default {
  namespaced: true,

  state: {
    espGyroValuesJson: null,
    gyroChartData: {
      valuesLimit: 250,
      time: [],
      pitch: [],
      roll: [],
      yaw: []
    }
  },

  getters: {
    espGyroValuesJson: state => {
      return state.espGyroValuesJson;
    },
    gyroChartData: state => {
      return state.gyroChartData;
    }
  },

  mutations: {
    setEspGyroValuesJson(state, newEspGyroValuesJson) {
      state.espGyroValuesJson = newEspGyroValuesJson;
    },
    addGyroValues(state, espGyroValuesJson) {
      espGyroValuesJson.GyroValues.forEach(function(gyroValue) {
        if (!state.gyroChartData.time.includes(gyroValue.Time)) {
          if (state.gyroChartData.time.length == state.gyroChartData.valuesLimit) {
            state.gyroChartData.time.shift();
            state.gyroChartData.pitch.shift();
            state.gyroChartData.roll.shift();
            state.gyroChartData.yaw.shift();
          }
          
          state.gyroChartData.time.push(
            parseInt(gyroValue.Time)
          );
          state.gyroChartData.pitch.push(
            parseFloat(gyroValue.Pitch)
          );
          state.gyroChartData.roll.push(
            parseFloat(gyroValue.Roll)
          );
          state.gyroChartData.yaw.push(
            parseFloat(gyroValue.Yaw)
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