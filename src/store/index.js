import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    espFmChannelValuesJson: null
  },
  getters: {
    espFmChannelValuesJson: state => {
      return state.espFmChannelValuesJson;
    }
  },
  mutations: {
    setEspFmChannelValuesJson(state, newEspFmChannelValuesJson) {
      state.espFmChannelValuesJson = newEspFmChannelValuesJson;
    }
  },
  actions: {
  },
  modules: {
  }
})
