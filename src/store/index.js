import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    espFmChannelValuesJson: null,
    espGyroValuesJson: null,
    fmChannelChartData: {
      channelsCount: 4,
      valuesLimit: 250,
      time: [],
      ch1: [],
      ch2: [],
      ch3: [],
      ch4: []
    },
    gyroChartData: {
      valuesLimit: 250,
      time: [],
      pitch: [],
      roll: [],
      yaw: []
    }
  },
  getters: {
    espFmChannelValuesJson: state => {
      return state.espFmChannelValuesJson;
    },
    espGyroValuesJson: state => {
      return state.espGyroValuesJson;
    },
    fmChannelChartData: state => {
      return state.fmChannelChartData;
    },
    gyroChartData: state => {
      return state.gyroChartData;
    }
  },
  mutations: {
    setEspFmChannelValuesJson(state, newEspFmChannelValuesJson) {
      state.espFmChannelValuesJson = newEspFmChannelValuesJson;
    },
    setEspGyroValuesJson(state, newEspGyroValuesJson) {
      state.espGyroValuesJson = newEspGyroValuesJson;
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
})
