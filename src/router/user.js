const Register = () =>
  import(/* webpackChunkName:'first' */ "../views/user/Register.vue");
const Login = () =>
  import(/* webpackChunkName:'first' */ "../views/user/Login.vue");
const TransFrom = () =>
  import(/* webpackChunkName:'user' */ "../views/user/TransFrom.vue");
const AccountDetail = () =>
  import(/* webpackChunkName:'user' */ "../views/user/AccountDetail.vue");
const LoginPwd = () =>
  import(/* webpackChunkName:'user' */ "../views/user/LoginPwd.vue");
const WithdrawPwd = () =>
  import(/* webpackChunkName:'user' */ "../views/user/WithdrawPwd.vue");
const Announcement = () =>
  import(/* webpackChunkName:'user' */ "../views/user/Announcement.vue");
const BankCardList = () =>
  import(/* webpackChunkName:'user' */ "../views/user/BankCardList.vue");
const BoundBank = () =>
  import(/* webpackChunkName:'user' */ "../views/user/BoundBank.vue");
const Withdraw = () =>
  import(/* webpackChunkName:'user' */ "../views/user/Withdraw.vue");
const WithdrawCaption = () =>
  import(/* webpackChunkName:'user' */ "../views/user/WithdrawCaption.vue");
const Recharge = () =>
  import(/* webpackChunkName:'user' */ "../views/user/Recharge.vue");
const RechargeRecord = () =>
  import(/* webpackChunkName:'user' */ "../views/user/RechargeRecord.vue");
const WithdrawRecord = () =>
  import(/* webpackChunkName:'user' */ "../views/user/WithdrawRecord.vue");
const Paying = () =>
  import(/* webpackChunkName:'user' */ "../views/user/Paying.vue");
const BankPaying = () =>
  import(/* webpackChunkName:'user' */ "../views/user/BankPaying.vue");
const ScanCodePaying = () =>
  import(/* webpackChunkName:'user' */ "../views/user/ScanCodePaying.vue");
const BankSubmit = () =>
  import(/* webpackChunkName:'user' */ "../views/user/BankSubmit.vue");
const ScanCodeSubmit = () =>
  import(/* webpackChunkName:'user' */ "../views/user/ScanCodeSubmit.vue");
const Statistics = () =>
  import(/* webpackChunkName:'user' */ "../views/user/Statistics.vue");
const VIP = () => import(/* webpackChunkName:'user' */ "../views/user/VIP.vue");
const Playing = () =>
  import(/* webpackChunkName:'user' */ "../views/user/Playing.vue");
const LegalNotices = () =>
  import(/* webpackChunkName:'user' */ "../views/user/LegalNotices.vue");
const ChessDetail = () =>
  import(/* webpackChunkName:'user' */ "../views/user/ChessDetail.vue");

export default [
  {
    path: "/register",
    name: "register",
    component: Register
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/transfrom",
    name: "transfrom",
    component: TransFrom,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/accountdetail",
    name: "accountdetail",
    component: AccountDetail,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/loginpwd",
    name: "loginpwd",
    component: LoginPwd,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/withdrawpwd",
    name: "withdrawpwd",
    component: WithdrawPwd,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/announcement",
    name: "announcement",
    component: Announcement
  },
  {
    path: "/bankcardlist",
    name: "bankcardlist",
    component: BankCardList,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/boundbank",
    name: "boundbank",
    component: BoundBank,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/withdraw",
    name: "withdraw",
    component: Withdraw,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/withdrawcaption",
    name: "withdrawcaption",
    component: WithdrawCaption
  },
  {
    path: "/recharge",
    name: "recharge",
    component: Recharge,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/rechargerecord",
    name: "rechargerecord",
    component: RechargeRecord
  },
  {
    path: "/withdrawrecord",
    name: "withdrawrecord",
    component: WithdrawRecord
  },
  {
    path: "/paying",
    name: "paying",
    component: Paying
  },
  {
    path: "/bankpaying",
    name: "bankpaying",
    component: BankPaying
  },
  {
    path: "/scancodepaying",
    name: "scancodepaying",
    component: ScanCodePaying
  },
  {
    path: "/banksubmit",
    name: "banksubmit",
    component: BankSubmit
  },
  {
    path: "/scancodesubmit",
    name: "scancodesubmit",
    component: ScanCodeSubmit
  },
  {
    path: "/statistics",
    name: "statistics",
    component: Statistics,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/vip",
    name: "vip",
    component: VIP,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/playing",
    name: "playing",
    component: Playing
  },
  {
    path: "/legalnotices",
    name: "legalnotices",
    component: LegalNotices
  },
  {
    path: "/chessdetail",
    name: "chessdetail",
    component: ChessDetail
  }
];
