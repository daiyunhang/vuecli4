import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './styles/style.css'
import axios from "./axios";
import QS from "qs";

Vue.config.productionTip = false;

// 引入axios，并加到原型链中
Vue.prototype.axios = axios;
Vue.prototype.qs = QS;
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
