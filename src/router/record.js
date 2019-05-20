const Record = () =>
  import(/* webpackChunkName:'first' */ "../views/record/Record.vue");

export default [
  {
    path: "/record",
    name: "record",
    component: Record,
    meta: {
      requiresAuth: true
    }
  }
];
