<template>
  <div class="body" v-title="'登录'">
    <div class="top">
      <div @click="back">
        <i class="iconfont">&#xe629;</i>
        <span>返回</span>
      </div>
    </div>
    <div class="content">
      <div class="logo" @click="$router.push({ name: 'home' })">
        <img src="/images/logo.png" alt="" />
      </div>
      <ul>
        <li class="username">
          <i class="iconfont">&#xe613;</i>
          <input
            type="text"
            placeholder="请输入账号"
            v-model="user.username"
            @keyup.enter="goLogin"
          />
        </li>
        <li>
          <i class="iconfont">&#xe626;</i>
          <input
            type="password"
            placeholder="请输入密码"
            v-model="user.password"
            @keyup.enter="goLogin"
          />
        </li>
        <li>
          <i class="iconfont">&#xe61c;</i>
          <input
            type="number"
            placeholder="请输入验证码"
            class="code"
            v-model="user.verifyCode"
            @keyup.enter="goLogin"
          />
        </li>
        <li>
          <img :src="codeImg" alt="code" @click="changeCodeImg" />
        </li>
      </ul>
      <div class="middle">
        <div @click="goService">
          忘记密码？联系客服
        </div>
        <div>
          <span>记住密码</span>
          <input type="checkbox" name id="keep" v-model="keep" />
          <label for="keep"></label>
        </div>
      </div>
      <div class="login">
        <p @click="goLogin">登录</p>
        <p @click="$router.push({ name: 'register' })">立即注册</p>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import { goLogin } from "../../api/index";
import { Base64 } from "js-base64";
import { mapMutations } from "vuex";
export default {
  name: "Login",
  data() {
    return {
      codeImg: "",
      keep: false,
      fromUrl: this.$route.query.redirect || "/home",
      user: {
        verifyCode: "",
        username: "",
        password: ""
      },
      KeFuFlag: true,
      cliHeight: document.documentElement.clientHeight
    };
  },
  watch: {
    cliHeight(newVal, oldVal) {
      if (newVal < oldVal) {
        this.KeFuFlag = false;
      } else {
        this.KeFuFlag = true;
      }
    }
  },
  created() {
    this.codeImg = "/api/auth/captcha";
    this.user.username = this.$cookies.get("username")
      ? Base64.decode(this.$cookies.get("username"))
      : "";
    if (this.$cookies.get("password")) {
      this.keep = true;
      this.user.password = Base64.decode(this.$cookies.get("password"));
    }
  },
  mounted() {
    window.onresize = () => {
      this.cliHeight = document.documentElement.clientHeight;
    };
  },
  methods: {
    ...mapMutations(["CHANGE_OPEN"]),
    changeCodeImg() {
      this.user.verifyCode = "";
      this.codeImg = "/api/auth/captcha?" + Math.random();
    },
    goLogin() {
      /* 字段验证 */
      if (!this.user.username) {
        return Toast("用户名不能为空");
      }
      if (!this.user.password) {
        return Toast("密码不能为空");
      }
      if (!this.user.verifyCode) {
        return Toast("请输入验证码");
      }
      /* 设置cookie */
      this.$cookies.set("username", Base64.encode(this.user.username), "7d");
      if (this.keep) {
        this.$cookies.set("password", Base64.encode(this.user.password), "7d");
      } else {
        if (this.$cookies.get("password")) this.$cookies.remove("password");
      }
      /* 登录 */
      goLogin(this.user).then(res => {
        if (res.status) {
          console.log(res.data);
          this.$store.commit("SET_USER_INFO", res.data);
          this.$router.replace({
            path: this.fromUrl
          });
        } else {
          this.changeCodeImg();
          Toast(res.msg);
        }
      });
    },
    goService() {
      this.CHANGE_OPEN(1);
      this.$router.push({ name: "service" });
    }
  }
};
</script>

<style scoped lang="less">
.body {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: url("../../assets/img/register-login-bg.jpg") no-repeat 100%;
}

.top {
  font-size: 37px;
  position: relative;
  color: #fff;
  text-align: left;
  overflow: hidden;
  div {
    height: 104px;
    line-height: 104px;
    float: left;
    padding-left: 20px;
    overflow: hidden;
    i {
      font-size: 50px;
      display: inline-block;
      vertical-align: middle;
    }
    span {
      display: inline-block;
      vertical-align: middle;
      padding-top: 3px;
    }
  }
}

.content {
  flex: 1;
  overflow-y: scroll;

  .logo {
    text-align: center;
    height: 83px;
    margin-top: 27px;
    img {
      height: 100%;
      display: inline-block;
    }
  }

  ul {
    overflow: hidden;

    li {
      width: 589px;
      height: 100px;
      margin: 51px auto 0;
      border-radius: 15px;
      line-height: 100px;
      position: relative;
      background-color: rgba(0, 0, 0, 0.7);

      i {
        font-size: 45px;
        color: #fff;
        float: left;
        margin-left: 30px;
      }

      input {
        background: none;
        outline: none;
        border: 0;
        color: #fff;
        height: 44px;
        line-height: 44px;
        font-size: 30px;
        float: left;
        margin-top: 28px;
        margin-left: 23px;
        width: 470px;
      }

      input::-webkit-input-placeholder {
        color: #aab2bd;
      }
    }

    li:nth-child(3) {
      width: 400px;
      margin-left: 80px;
      border-radius: 15px 0 0 15px;
      input {
        width: 260px;
      }

      float: left;
    }

    li:last-child {
      width: 193px;
      height: 100px;
      float: left;
      overflow: hidden;
      border-radius: 0 15px 15px 0;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}

.middle {
  margin-top: 50px;
  margin-left: 80px;
  text-align: left;
  font-size: 27px;
  overflow: hidden;
  color: #fff;
  line-height: 34px;

  div:first-child {
    float: left;
  }

  div:last-child {
    float: right;
    margin-right: 90px;

    input {
      display: none;
    }

    input + label {
      display: inline-block;
      vertical-align: top;
      width: 34px;
      height: 34px;
      text-align: center;
      line-height: 34px;
      background-color: #fff;
      border-radius: 8px;
      margin-left: 8px;
    }

    input:checked + label::before {
      content: "\2714";
      font-size: 28px;
      font-weight: bold;
      color: #a07c96;
    }
  }
}

.login {
  margin-top: 70px;

  p {
    width: 588px;
    height: 100px;
    line-height: 100px;
    font-size: 35px;
    margin: auto;
    border-radius: 100px;
    text-align: center;
    background: linear-gradient(#fec830, #f37336);
    &:first-child {
      color: #fff;
    }
    &:last-child {
      margin-top: 46px;
      color: #fdc331;
      font-size: 37px;
      box-sizing: border-box;
      border: 4px solid;
      background: transparent;
    }
  }
}

.kefu {
  position: absolute;
  bottom: 41px;
  left: 212px;
  width: 330px;
  text-align: center;
  font-size: 26px;

  a {
    color: #666666;
  }

  i {
    vertical-align: top;
    font-size: 45px;
    margin-right: 8px;
  }

  span {
    display: inline-block;
    line-height: 45px;
    vertical-align: bottom;
  }
}
</style>
