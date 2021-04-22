export default {
  namespaced: true,
  
  state: {
    espMotorsJson: null,
    motorsChartData: {
      motorsCount: 4,
      valuesLimit: 250,
      time: [],
      motorSpeed1: [],
      motorSpeed2: [],
      motorSpeed3: [],
      motorSpeed4: []
    },
  },

  getters: {
    espMotorsJson: state => {
      return state.espMotorsJson;
    },
    motorsChartData: state => {
      return state.motorsChartData;
    }
  },

  mutations: {
    setEspMotorsJson(state, newEspMotorsJson) {
      state.espMotorsJson = newEspMotorsJson;
    },
    addMotorsChartData(state, espMotorsJson) {
      espMotorsJson.Motors.forEach(function(motor) {
        if (!state.motorsChartData.time.includes(motor.Time)) {
          if (state.motorsChartData.time.length == state.motorsChartData.valuesLimit) {
            state.motorsChartData.time.shift();
            state.motorsChartData.motorSpeed1.shift();
            state.motorsChartData.motorSpeed2.shift();
            state.motorsChartData.motorSpeed3.shift();
            state.motorsChartData.motorSpeed4.shift();
          }
  
          state.motorsChartData.time.push(
            parseInt(motor.Time)
          );
          state.motorsChartData.motorSpeed1.push(
            parseInt(motor.MotorSpeed[0])
          );
          state.motorsChartData.motorSpeed2.push(
            parseInt(motor.MotorSpeed[1])
          );
          state.motorsChartData.motorSpeed3.push(
            parseInt(motor.MotorSpeed[2])
          );
          state.motorsChartData.motorSpeed4.push(
            parseInt(motor.MotorSpeed[3])
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