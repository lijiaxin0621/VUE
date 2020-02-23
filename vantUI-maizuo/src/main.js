import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
/* import 'lib-flexible/flexible' */
import axios from 'axios'
import Vant from 'vant'
import 'vant/lib/index.css';
import 'amfe-flexible/index.js'
import { IndexBar, IndexAnchor } from 'vant';
Vue.config.productionTip = false
axios.defaults.baseURL = 'https://douban.uieee.com/v2/movie';
Vue.use(Vant);
Vue.use(IndexBar).use(IndexAnchor);
Vue.prototype.axios = axios
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  store.state.isLoading = true;
  return config;
});
axios.interceptors.response.use(function (response) {
  // Do something with response data
  store.state.isLoading = false
  return response;
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')