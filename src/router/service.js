const Service = () =>
  import(/* webpackChunkName:'first' */ "../views/service/Service.vue");

export default [
  {
    path: "/service",
    name: "service",
    component: Service
  }
];
