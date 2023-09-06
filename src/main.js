import Vue from 'vue'
import 'assets/css/tailwindcss.css'
import 'assets/css/preflight.css'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { createPinia, PiniaVuePlugin } from 'pinia'
Vue.use(ElementUI)
Vue.use(PiniaVuePlugin)
const pinia = createPinia()


Vue.config.productionTip = false

new Vue({
  router,
  pinia,
  render: h => h(App)
}).$mount('#app')