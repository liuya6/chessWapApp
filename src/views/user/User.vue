<template>
  <div class="user" :class="{ open: isOpen }">
    <dl>
      <dt v-if="isLogin" class="isLogin">
        <ul>
          <li>
            <div>
              <img :src="userInfo.avatar" alt="头像" />
            </div>
            <div>
              <p>{{ userInfo.username }}</p>
              <span>推荐码：{{ userInfo.uid }}</span>
            </div>
          </li>
          <li>余额{{ userInfo.coin }}</li>
          <li>
            <router-link :to="{ name: 'recharge' }">充值</router-link>
            <router-link :to="{ name: 'withdraw' }">提现</router-link>
          </li>
        </ul>
      </dt>
      <dt v-else class="noLogin">
        <div @click="$router.push({ name: 'login' })">
          <img src="../../assets/img/noLogin.png" alt="" />
        </div>
        <div @click="$router.push({ name: 'login' })">
          登录/注册
        </div>
      </dt>
      <dd
        v-for="(item, i) in dataList"
        :key="i"
        @click="$router.push({ name: item.pathName })"
      >
        {{ item.name }}
        <i class="iconfont">&#xe6a5;</i>
      </dd>
      <dd v-show="isLogin" @click="loginLeave">
        退出登录
        <i class="iconfont">&#xe6a5;</i>
      </dd>
    </dl>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { loginOut } from "../../api";
const dataList = [
  {
    name: "额度转换",
    pathName: "transfrom"
  },
  {
    name: "会员中心",
    pathName: "vip"
  },
  {
    name: "账户明细",
    pathName: "accountdetail"
  },
  {
    name: "银行账户",
    pathName: "bankcardlist"
  },
  {
    name: "提现密码",
    pathName: "withdrawpwd"
  },
  {
    name: "登录密码",
    pathName: "loginpwd"
  },
  {
    name: "今日统计",
    pathName: "statistics"
  },
  {
    name: "公告列表",
    pathName: "announcement"
  }
];
export default {
  name: "User",
  data() {
    return {
      dataList,
      isLogin: false
    };
  },
  created() {
    this.LoginStatus(this.userInfo);
  },
  activated() {
    this.LoginStatus(this.userInfo);
  },
  watch: {
    userInfo(newVal) {
      this.LoginStatus(newVal);
    }
  },
  computed: {
    ...mapGetters(["isOpen", "userInfo"])
  },
  methods: {
    ...mapMutations(["CHANGE_OPEN"]),
    LoginStatus(val) {
      if (val || val.username) {
        this.isLogin = true;
      } else {
        this.isLogin = false;
      }
    },
    loginLeave() {
      this.$createDialog({
        type: "confirm",
        title: "确定退出账号吗？",
        confirmBtn: {
          text: "确定",
          active: true,
          disabled: false,
          href: "javascript:;"
        },
        cancelBtn: {
          text: "取消",
          active: false,
          disabled: false,
          href: "javascript:;"
        },
        onConfirm: () => {
          loginOut().then(res => {
            console.log(res);
            if (res.status) {
              this.$createToast({
                type: "correct",
                time: 1000,
                txt: res.data
              }).show();
              this.CHANGE_OPEN(1);
              this.isLogin = false;
              this.$store.commit("SET_USER_INFO", "");
              this.$router.push({ name: "login" });
              sessionStorage.clear();
            }
          });
        }
      }).show();
    }
  }
};
</script>

<style scoped lang="less">
.open {
  transform: translateX(0%) !important;
}
.user {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  width: 50%;
  height: 100%;
  display: flex;
  background-color: #151a1c;
  border-right: 1px solid #1e2325;
  transform: translateX(-101%);
  box-sizing: border-box;
  transition: 0.38s;
  dl {
    flex: 1;
    overflow-y: scroll;
    dt {
      overflow: hidden;
      background: url("/images/btmborder.png") no-repeat bottom;
    }
    .isLogin {
      ul {
        li {
          overflow: hidden;
          &:first-child {
            div {
              float: left;
              &:first-child {
                width: 110px;
                height: 110px;
                border-radius: 50%;
                overflow: hidden;
                margin: 20px;
                img {
                  width: 100%;
                  height: 100%;
                }
              }
              &:last-child {
                margin-top: 20px;
                p {
                  color: #fff;
                  font-size: 38px;
                  line-height: 70px;
                }
                span {
                  color: #8aa0a6;
                  font-size: 22px;
                }
              }
            }
          }
          &:nth-child(2) {
            margin: 20px;
            height: 51px;
            border-radius: 51px;
            background-color: #263034;
            color: #da7a0a;
            text-align: center;
            line-height: 51px;
            font-size: 28px;
          }
          &:nth-child(3) {
            margin-bottom: 20px;
            a {
              margin-left: 20px;
              display: inline-block;
              width: 156px;
              height: 60px;
              color: white;
              text-align: center;
              line-height: 60px;
              border-radius: 10px;
              font-size: 26px;
              &:first-child {
                background: linear-gradient(
                  rgb(244, 186, 45),
                  rgb(247, 82, 55)
                );
              }
              &:last-child {
                background: linear-gradient(
                  rgb(71, 206, 255),
                  rgb(34, 68, 255)
                );
              }
            }
          }
        }
      }
    }
    .noLogin {
      div {
        float: left;
        color: #fff;
        line-height: 142px;
        font-size: 33px;
        &:first-child {
          width: 110px;
          height: 110px;
          border-radius: 50%;
          margin: 20px;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
    dd {
      line-height: 100px;
      font-size: 33px;
      color: #fff;
      background: url("/images/btmborder.png") no-repeat bottom;
      padding-left: 20px;
      i {
        color: #8aa0a6;
        font-size: 33px;
        float: right;
        margin-right: 20px;
      }
    }
  }
}
</style>
