const Home = () => import(/* webpackChunkName:'first' */ "../views/home/Home");
const Hall = () => import(/* webpackChunkName:'first' */ "../views/home/Hall");
const DownLoad = () =>
  import(/* webpackChunkName:'first' */ "../views/home/DownLoad");

export default [
  {
    path: "/",
    name: "home",
    meta: {
      keepAlive: true, // 缓存视图
      DocumentTitle: "首页"
    },
    component: Home
  },
  {
    path: "/hall",
    name: "hall",
    component: Hall
  },
  {
    path: "/download",
    name: "download",
    component: DownLoad
  }
];
