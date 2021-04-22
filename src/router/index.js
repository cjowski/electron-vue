import Vue from "vue"
import VueRouter from "vue-router"
import EspConnectSection from "@/views/EspSection/EspConnectSection"
import EspTestSection from "@/views/EspSection/EspTestSection"
import FmSection from "@/views/FmSection";
import GyroSection from "@/views/GyroSection"
import MotorSection from "@/views/MotorSection"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "espConnect",
    component: EspConnectSection
  },
  {
    path: "/espTest",
    name: "espTest",
    component: EspTestSection
  },
  {
    path: "/fm",
    name: "fm",
    component: FmSection
  },
  {
    path: "/gyro",
    name: "gyro",
    component: GyroSection
  },
  {
    path: "/motor",
    name: "motor",
    component: MotorSection
  }
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
})

export default router
