import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login",
    component: () =>import(/* webpackChunkName: "login" */ "../views/login.vue")
  },
  {
    path: "/content",
    name: "content",
    component: () =>import(/* webpackChunkName: "content" */ "../views/content.vue"),
    children:[
      {
        path:'/home',
        name: "home",
        component: () =>import(/* webpackChunkName: "home" */ "../views/modules/home.vue"),
      },
      {
        path:'/authority',
        name: "authority",
        component: () =>import(/* webpackChunkName: "authority" */ "../views/modules/authority.vue"),
      },
    ]

  },
  //根目录情况下重定向login
  {
    path: "/",
    redirect: "/login"
  },
  //路由表中不存在的路径重定向登录
  {
    path: "*",
    redirect: "/login"
  }
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes
});

const originalPush = VueRouter.prototype.push
   VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}

export default router;
