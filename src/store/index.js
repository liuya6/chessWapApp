import Vue from "vue";
import VueX from "vuex";
Vue.use(VueX);

import Home from "./home";
import User from "./user";
import Game from "./game";

const handleStore = store => {
  let storage = window.sessionStorage;
  if (!storage) {
    return console.warn("当前浏览器不支持sessionStorage!");
  }
  /* 初始化store */
  if (sessionStorage.store) {
    let state = JSON.parse(sessionStorage.store);
    store.replaceState(state);
  }
  /* 在每个 mutation 完成后调用 */
  store.subscribe((mutation, state) => {
    sessionStorage.setItem("store", JSON.stringify(state));
  });
};

export default new VueX.Store({
  strict: process.env.NODE_ENV !== "production",
  modules: {
    Home,
    User,
    Game
  },
  plugins: [handleStore]
});
