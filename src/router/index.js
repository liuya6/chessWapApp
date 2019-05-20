import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

import Home from "./home";
import Record from "./record";
import Activity from "./activity";
import Service from "./service";
import Users from "./user";

const router = new Router({
  mode: "history",
  routes: [
    ...Home,
    ...Record,
    ...Activity,
    ...Service,
    ...Users,
    {
      path: "*",
      redirect: "/"
    }
  ]
});

router.beforeEach((to, from, next) => {
  let userInfo = router.app.$options.store.getters.userInfo;
  if (to.meta.requiresAuth) {
    if (!userInfo) {
      // 登录验证
      // 将跳转的路由path作为参数，登录成功后跳转到该路由
      // next = push
      return next({
        path: "/login",
        query: { redirect: to.fullPath }
      });
    }
  }
  return next();
});

export default router;
