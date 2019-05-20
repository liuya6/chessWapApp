const Activity = () =>
  import(/* webpackChunkName:'first' */ "../views/activity/Activity.vue");
const Applyactivitylist = () =>
  import(/* webpackChunkName:'user' */ "../views/activity/Applyactivitylist.vue");
const ApplyActivityDetail = () =>
  import(/* webpackChunkName:'user' */ "../views/activity/ApplyActivityDetail.vue");

export default [
  {
    path: "/activity",
    name: "activity",
    mate: {
      keepAlive: true, // 缓存视图
      DocumentTitle: "活动"
    },
    component: Activity
  },
  {
    path: "/applyactivitylist",
    name: "applyactivitylist",
    component: Applyactivitylist,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/applyactivitydetail/:id",
    name: "applyactivitydetail",
    component: ApplyActivityDetail
  }
];
