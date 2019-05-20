import { fetch } from "../axios";

/* 注册准备 */
export function registerField() {
  return fetch({
    url: "/auth/registerBefore",
    method: "get",
    loading: true
  });
}

/* 注册 */
export function register(query) {
  return fetch({
    url: "/auth/register",
    method: "post",
    data: query,
    loading: true
  });
}

/* 登录 */
export function goLogin(query) {
  return fetch({
    url: "/auth/login",
    method: "post",
    data: query,
    loading: true
  });
}
/* 登出 */
export function loginOut() {
  return fetch({
    url: "/auth/logout",
    method: "post",
    loading: true
  });
}
// 一键归户
export function exchangeAllToLottery() {
  return fetch({
    url: "/game/exchangeAllToLottery",
    method: "get",
    loading: true
  });
}
// 余额转换
export function exchangeMoney(query) {
  return fetch({
    url: "/game/exchangeMoney",
    method: "post",
    data: query,
    loading: true
  });
}
// 游戏余额
export function thirdMoney(query) {
  return fetch({
    url: "/game/thirdMoney",
    method: "post",
    data: query
  });
}
// 余额列表
export function thirdGameList() {
  return fetch({
    url: "/game/thirdGameList",
    method: "get",
    loading: true
  });
}
/* 账目明细 */
export function accountDetails(query) {
  return fetch({
    url: "/cash/account",
    method: "get",
    params: query,
    loading: true
  });
}
/* 修改登录密码 */
export function changeUserPwd(query) {
  return fetch({
    url: "/member/resetPassword",
    method: "post",
    data: query
  });
}
/* 修改提现密码 */
export function changeWithdrawPwd(query) {
  return fetch({
    url: "/member/resetCoinPassword",
    method: "post",
    data: query
  });
}
/* 公告列表 */
export function announcement() {
  return fetch({
    url: "/member/notice",
    method: "get",
    loading: true
  });
}
/* 我的银行卡 */
export function myBankCard() {
  return fetch({
    url: "/member/bank",
    method: "get",
    loading: true
  });
}
/* 银行卡 */
export function bankCard() {
  return fetch({
    url: "/member/bindingBefore",
    method: "get",
    loading: true
  });
}
/* 绑定银行卡 */
export function bindingBank(query) {
  return fetch({
    url: "/member/binding",
    method: "post",
    data: query,
    loading: true
  });
}
/* 提现金额 */
export function withdrawMoney(query) {
  return fetch({
    url: "/cash/withdraw",
    method: "post",
    data: query,
    loading: true
  });
}
// 提现金额限制50~
export function cashConfigs(query) {
  return fetch({
    url: "/system/cashConfigs",
    method: "get",
    params: query
  });
}

/* 充值申请 */
export function rechargeApply(query) {
  return fetch({
    url: "/cash/rechargeApply",
    method: "post",
    data: query,
    loading: true
  });
}

/* 充值准备 */
export function rechargeBefore(query) {
  return fetch({
    url: "/cash/rechargeBefore",
    method: "get",
    params: query,
    loading: true
  });
}

/* 提现记录 */
export function withdrawalsRecord(query) {
  return fetch({
    url: "/cash/withdrawRecord",
    method: "get",
    params: query,
    loading: true
  });
}

/* 充值申请完后提交 */
export function rechargeSubmit(query) {
  return fetch({
    url: "/cash/rechargeSubmit",
    method: "post",
    data: query,
    loading: true
  });
}

/* 充值记录 */
export function rechargeRecord(query) {
  return fetch({
    url: "/cash/rechargeRecord",
    method: "get",
    params: query,
    loading: true
  });
}

/* 游戏列表 */
export function ThirdList() {
  return fetch({
    url: "/game/ThirdList",
    method: "get"
  });
}
/* 单日统计 */
export function serchTotal(query) {
  return fetch({
    url: "/cash/serchTotal",
    method: "get",
    params: query,
    loading: true
  });
}
/* 配置项 */
export function settings() {
  return fetch({
    url: "/system/settings",
    method: "get",
    loading: true
  });
}
/* 会员中心*/
export function getMember() {
  return fetch({
    url: "/member/memberLevel",
    method: "get",
    loading: true
  });
}
/* 游戏记录 */
export function thirdRecord(query) {
  return fetch({
    url: "/game/thirdRecord",
    method: "get",
    params: query,
    loading: true
  });
}
/* 棋牌详情 */
export function recordDetail(query) {
  return fetch({
    url: "/chess/recordDetail",
    method: "get",
    params: query,
    loading: true
  });
}
/* 活动申请 */
export function applyActivity(query) {
  return fetch({
    url: "/activity/apply",
    method: "post",
    data: query,
    loading: true
  });
}
/* 活动申请列表 */
export function activityApplyList(query) {
  return fetch({
    url: "/activity/applyList",
    method: "post",
    data: query,
    loading: true
  });
}
/* 活动申请记录详情 */
export function getActivityDetail(query) {
  return fetch({
    url: "/activity/applyDetail",
    method: "get",
    params: query,
    loading: true
  });
}
/* 检查登录状态 */
export function checkLogin() {
  return fetch({
    url: "/auth/checkLogin",
    method: "get"
  });
}
