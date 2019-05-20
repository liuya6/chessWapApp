import { fetch } from "../axios";

/* 首页数据 */
export function initHome() {
  return fetch({
    url: "/Index/initHomeData",
    method: "post"
  });
}

/* 全部活动 */
export function activity(query) {
  return fetch({
    url: "/activity/index",
    method: "get",
    params: query,
    loading: true
  });
}
/* 活动申请 √ */
export function appllyActivity(query) {
  return fetch({
    // url: "/game",
    url: "/activity/apply",
    method: "post",
    data: query,
    loading: true
  });
}
/* 游戏列表 */
export function hallType(query) {
  return fetch({
    url: "/game/hallType",
    method: "get",
    params: query,
    loading: true
  });
}

/* 下载链接 */
export function download() {
  return fetch({
    url: "/system/download",
    method: "get"
  });
}
