import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'
import { library } from '@fortawesome/fontawesome-svg-core'
// import { fa } from '@fortawesome/free-regular-svg-icons'
// import { faFontAwesome } from '@fortawesome/free-brands-svg-icons'
import { faSatelliteDish } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faSatelliteDish)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(Vuetify);

export default new Vuetify({
  theme: { dark: true },
  iconfont: 'fa'
});
