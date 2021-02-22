import Vue from 'vue'
import Vuex from 'vuex'
import fmStore from '@/store/modules/fmStore'
import gyroStore from '@/store/modules/gyroStore'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    fm: fmStore,
    gyro: gyroStore
  }
})
