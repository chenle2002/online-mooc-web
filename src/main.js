import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 2. 全局注册并引用
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.prototype.$axios = axios
Vue.use(VueAxios, axios)
axios.defaults.baseURL = "http://116.204.65.192:88/api"
Vue.config.productionTip = false

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
new Vue({
  router,
  beforeCreate() {
    //此时这个this就是vm，只不过这个时候还并没有去解析模版
    Vue.prototype.$bus = this; //安装全局事件总线
  },
  render: h => h(App)
}).$mount('#app')
