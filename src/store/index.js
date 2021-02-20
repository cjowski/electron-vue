import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    espFmChannelValuesJson: null,
    espGyroValuesJson: null
  },
  getters: {
    espFmChannelValuesJson: state => {
      return state.espFmChannelValuesJson;
    },
    espGyroValuesJson: state => {
      return state.espGyroValuesJson;
    }
  },
  mutations: {
    setEspFmChannelValuesJson(state, newEspFmChannelValuesJson) {
      state.espFmChannelValuesJson = newEspFmChannelValuesJson;
    },
    setEspGyroValuesJson(state, newEspGyroValuesJson) {
      state.espGyroValuesJson = newEspGyroValuesJson;
    }
  },
  actions: {
  },
  modules: {
  }
})
