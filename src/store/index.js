import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);


export default new Vuex.Store({
  state: {
    TOKEN: '' || JSON.parse(sessionStorage.getItem('TOKEN')),//用户信息
  },
  getters:{
    TOKEN: (state) => state.TOKEN,
  },
  mutations: {
    TOKEN: (state, TOKEN) => {
      state.TOKEN = TOKEN
      // 把登录的用户的名保存到sessionStorage中，防止页面刷新，导致vuex重新启动，用户名就成为初始值（初始值为空）的情况
      sessionStorage.setItem('TOKEN', JSON.stringify(TOKEN))
    },
  },
  actions: {},
  modules: {}
});
