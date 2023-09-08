import Vue from 'vue'
import 'assets/css/tailwindcss.css'
import 'assets/css/preflight.css'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { createPinia, PiniaVuePlugin } from 'pinia'
import * as echarts from 'echarts';
Vue.use(ElementUI)
Vue.use(PiniaVuePlugin)
const pinia = createPinia()
import '@/permission'


Vue.config.productionTip = false
Vue.prototype.$echarts = echarts

new Vue({
  pinia,
  router,
  render: h => h(App)
}).$mount('#app')