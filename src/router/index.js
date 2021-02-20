import Vue from 'vue'
import VueRouter from 'vue-router'
import FmChannelValuesJsonShower from '../views/FmChannelValuesJsonShower';
import GyroJsonShower from '../views/GyroJsonShower.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'fm',
    component: FmChannelValuesJsonShower
  },
  {
    path: '/gyro',
    name: 'gyro',
    component: GyroJsonShower
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
