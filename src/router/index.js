import Vue from 'vue'
import VueRouter from 'vue-router'
import FmSection from '@/views/FmSection';
import GyroSection from '@/views/GyroSection'
import EspConnectSection from '@/views/EspConnectSection'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'esp',
    component: EspConnectSection
  },
  {
    path: '/fm',
    name: 'fm',
    component: FmSection
  },
  {
    path: '/gyro',
    name: 'gyro',
    component: GyroSection
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
