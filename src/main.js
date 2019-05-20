import Vue from "vue";
import "./cube-ui";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./style/index.less";
import "swiper/dist/css/swiper.css";

import VueClipboard from "vue-clipboard2"; //银行卡复制模块
Vue.use(VueClipboard);

// import Foot from "./components/common/Footer";
const Foot = () =>
  import(/* webpackChunkName:'first' */ "./components/common/Footer");
Vue.component("my-foot", Foot);
const User = () =>
  import(/* webpackChunkName:'first' */ "./views/user/User.vue");
// import User from "./views/user/User.vue";
Vue.component("my-user", User);
// import ImgLoading from "./components/common/ImgLoading";
const ImgLoading = () =>
  import(/* webpackChunkName:'first' */ "./components/common/ImgLoading");
Vue.component("my-img", ImgLoading);

import VueAwesomeSwiper from "vue-awesome-swiper";
Vue.use(VueAwesomeSwiper);
import VueCookies from "vue-cookies";
Vue.use(VueCookies);

import "mint-ui/lib/style.css";
import {
  Swipe,
  SwipeItem,
  Toast,
  Lazyload,
  TabContainer,
  TabContainerItem,
  Spinner,
  Progress,
  Range,
  Loadmore,
  Popup,
  Picker
} from "mint-ui";
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(TabContainer.name, TabContainer);
Vue.component(TabContainerItem.name, TabContainerItem);
Vue.component(Progress.name, Progress);
Vue.component(Spinner.name, Spinner);
Vue.component(Range.name, Range);
Vue.component(Loadmore.name, Loadmore);
Vue.component(Popup.name, Popup);
Vue.component(Picker.name, Picker);
Vue.use(Lazyload);

Vue.prototype.back = function() {
  //全局返回
  if (window.history.length < 3) {
    return router.push({ name: "home" });
  }
  router.go(-1);
};

Vue.prototype.$_eval = function(fn) {
  return new Function("return " + fn)();
};

Vue.directive("title", {
  // 指令的定义
  inserted: function(el, binding) {
    if (!router.currentRoute.meta.keepAlive) {
      let titles = router.app.$options.store.getters.webName || "";
      if (binding.value !== "") {
        titles = binding.value + " - " + titles;
      }
      document.title = titles;
    }
  },
  update: function() {
    if (router.currentRoute.meta.keepAlive) {
      let titles = router.app.$options.store.getters.webName || "";
      let bindingVal = router.currentRoute.meta.DocumentTitle;
      titles = bindingVal + " - " + titles;
      document.title = titles;
    }
  }
});

Vue.prototype.bankImg = function(url) {
  //银行卡图片
  return `/images/${url}`;
  // return require("./assets/" + url);
};
Vue.prototype.bankNum = function(card) {
  return card
    .replace(/\s/g, "")
    .replace(/(\d{4})\d+(\d{4})$/, "$1 **** **** $2");
};

Vue.prototype.playGame = function(isHall, url, type, title) {
  console.log(isHall, url, type, title, "playGame");
  if (!this.$store.getters.userInfo) {
    return Toast("请登录后进行游戏");
  }
  if (isHall) {
    this.$store.commit("SET_GAME_TYPE", type);
    this.$store.commit("SET_GAME_TITLE", title);
    return this.$router.push({ name: "hall" });
  }
  if (type == "AG") {
    return window.open(url);
  }
  this.$store.commit("SET_GAME_URL", url);
  this.$router.push({
    name: "playing"
  });
};

Vue.prototype.timestampToString = function(timestamp = +new Date()) {
  //解析时间戳
  if (timestamp) {
    let time = new Date(timestamp * 1000);
    let y = time.getFullYear();
    let M = time.getMonth() + 1;
    let d = time.getDate();
    let h = time.getHours();
    let m = time.getMinutes();
    let s = time.getSeconds();
    M = M < 10 ? "0" + M : M;
    d = d < 10 ? "0" + d : d;
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;
    return y + "-" + M + "-" + d + " " + h + ":" + m + ":" + s;
  } else {
    return "";
  }
};

Vue.directive("focus", {
  //全局input聚焦
  inserted: function(el) {
    el.focus();
  }
});

import "lib-flexible/flexible.js"; // 移动端自适应
import "amfe-flexible";
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
