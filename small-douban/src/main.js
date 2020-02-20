import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible/index'
import Vant from 'vant'
import "vant/lib/index.css"
import axios from 'axios'
Vue.config.productionTip = false
Vue.use(Vant)
Vue.prototype.axios = axios
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
