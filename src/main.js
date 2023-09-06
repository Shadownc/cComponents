import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'assets/css/tailwindcss.css'
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