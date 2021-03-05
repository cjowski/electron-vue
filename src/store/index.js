import Vue from 'vue'
import Vuex from 'vuex'
import espConnectStore from '@/store/modules/espConnectStore'
import fmStore from '@/store/modules/fmStore'
import gyroStore from '@/store/modules/gyroStore'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    espConnect: espConnectStore,
    fm: fmStore,
    gyro: gyroStore
  }
})
