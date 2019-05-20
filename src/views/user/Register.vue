<template>
  <div class="body" v-title="'注册'">
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
          <span>用户名</span>
          <input
            type="text"
            placeholder="5~15个字母或数字"
            v-model="user.username"
          />
        </li>
        <li>
          <span>登录密码</span>
          <input
            type="password"
            placeholder="6~12个包含字母和数字的组合"
            v-model="user.password"
          />
        </li>
        <li>
          <span>确认密码</span>
          <input
            type="password"
            placeholder="再次输入密码"
            v-model="user.password_confirm"
          />
        </li>

        <li v-for="(FieldItem, i) in registerField" :key="i">
          <span>{{ FieldItem.name }}</span>
          <input
            v-if="FieldItem.formtype != 'select'"
            :type="FieldItem.formtype"
            :placeholder="
              '请输入' +
                FieldItem.name +
                (FieldItem.isrequired ? '(必填)' : '(选填)')
            "
            v-model="user[FieldItem.field]"
            :readonly="readOnly && FieldItem.field == 'xcode'"
          />
          <select v-else v-model="user[FieldItem.field]">
            <option disabled value="">{{ FieldItem.tips }}</option>
            <option v-for="(item, i) in bankList" :key="i" :value="item.id">{{
              item.name
            }}</option>
          </select>
        </li>
        <li v-show="otherBankShowFlag">
          <span>
            其他银行
          </span>
          <input
            type="text"
            placeholder="请输入银行名称"
            v-model="otherBankName"
          />
        </li>
        <li class="code">
          <span>验证码</span>
          <input
            type="number"
            placeholder="输入验证码"
            class="code"
            v-model="user.verifyCode"
          />
        </li>
        <li>
          <img :src="codeImg" alt="code" @click="changeCode" />
        </li>
      </ul>
      <div class="protocol">
        <input type="checkbox" name id="keep" checked v-model="user.accept" />
        <label for="keep"></label>
        <span>我已年满18周岁，并且同意接受</span>
        <router-link to="/legalnotices">《法律声明》</router-link>
      </div>
      <div class="registerBtn" @click="Register">立即注册</div>
    </div>
  </div>
</template>

<script>
import { registerField, register } from "../../api";
import { Toast } from "mint-ui";

export default {
  name: "Register",
  data() {
    return {
      codeImg: "",
      registerField: [],
      bankList: [],
      xcode: "",
      otherBankShowFlag: false,
      otherBankName: "",
      user: {
        username: "",
        password: "",
        password_confirm: "",
        verifyCode: "",
        accept: true,
        bankId: ""
      }
    };
  },
  created() {
    /* 设置推广码 */
    this.codeImg = "/api/auth/captcha";
    /* 注册配置项 */
    registerField().then(res => {
      this.setXcode();
      let list = res.data.paramsList.filter(v => {
        // 不显示列表中字段
        // return ["coinPassword", "mobileNum"].indexOf(v.field) < 0;
        return true;
      });
      this.registerField = list;
      for (let i = 0; i < list.length; i++) {
        let tempField = list[i].field;
        if (tempField === "xcode") {
          this.user[tempField] = this.xcode;
        } else {
          this.user[tempField] = "";
        }
      }
      this.bankList = res.data.bankList;
    });
  },
  watch: {
    "user.bankId": {
      handler(newVal) {
        if (newVal == "10000") {
          this.otherBankShowFlag = true;
          return;
        }
        this.otherBankShowFlag = false;
      },
      deep: true
    }
  },
  computed: {
    readOnly() {
      return !!this.xcode;
    }
  },
  methods: {
    bankName(bank) {
      for (let i = 0; i < this.bankList.length; i++) {
        let bankListOne = this.bankList[i];
        if (bankListOne.id === bank) {
          return bankListOne.name;
        }
      }
    },
    setXcode() {
      let xcode = this.$route.query.xcode || "";
      let cookieXcode = this.$cookies.get("xcode") || "";
      if (cookieXcode !== "" && /^[1-9]\d*$/.test(cookieXcode)) {
        xcode = cookieXcode;
      }
      if (xcode !== "" && !/^[1-9]\d*$/.test(xcode)) {
        xcode = "";
      }
      if (xcode !== "") {
        this.$cookies.set("xcode", xcode, "1D");
      }
      this.xcode = xcode;
    },
    changeCode() {
      this.user.verifyCode = "";
      this.codeImg = "/api/auth/captcha?" + Math.random();
    },
    Register() {
      if (!this.user.username) {
        return Toast("用户名不能为空");
      } else {
        if (!/^[a-zA-Z0-9_-]{5,15}$/.test(this.user.username)) {
          return Toast("请按照要求填写用户名（5~15个字母或数字）");
        }
      }
      if (!this.user.password || !this.user.password_confirm) {
        return Toast("密码不能为空");
      } else {
        if (
          !/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z_]{6,12}$/.test(
            this.user.password
          )
        ) {
          return Toast("请按要求填写密码（6~12个包含字母和数字的组合）");
        } else {
          if (this.user.password !== this.user.password_confirm) {
            return Toast("两次输入的密码不同");
          }
        }
      }
      if (!this.user.verifyCode) {
        return Toast("请输入验证码");
      }
      for (var i = 0; i < this.registerField.length; i++) {
        var item = this.registerField[i];
        if (item.isrequired) {
          if (!this.user[item.field]) {
            return Toast("请输入" + item.name);
          } else {
            if (item.pattern) {
              if (!this.$_eval(item.pattern).test(this.user[item.field])) {
                return Toast(item.errortips);
              }
            }
          }
        }
      }
      if (!this.user.accept) {
        return Toast("请阅读并同意法律声明");
      }
      let users = { ...this.user };
      if (this.otherBankShowFlag) {
        if (!/^([\u4e00-\u9fa5]){4,10}$/.test(this.otherBankName)) {
          return Toast("请输入正确的开户银行名称");
        }
        users.bankName = this.otherBankName;
      } else {
        users = {
          ...this.user,
          bankName: this.bankName(this.user.bankId)
        };
      }

      console.log(users, "注册数据--------------");
      register(users).then(res => {
        if (res.status) {
          this.$store.commit("SET_USER_INFO", res.data);
          this.$router.replace({
            path: "/user"
          });
        } else {
          this.changeCode();
        }
        Toast(res.msg);
      });
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
      margin: 18px auto 0;
      border-radius: 15px;
      line-height: 100px;
      position: relative;
      background: rgba(0, 0, 0, 0.7);
      span {
        float: left;
        font-size: 29px;
        color: #a0a0a0;
        margin-left: 22px;
        width: 130px;
        text-align: right;
        display: inline-block;
        vertical-align: middle;
      }
      input {
        background: none;
        outline: none;
        border: 0;
        color: #666;
        height: 44px;
        line-height: 44px;
        font-size: 30px;
        float: left;
        margin-top: 25px;
        margin-left: 23px;
        width: 400px;
      }
      input::-webkit-input-placeholder {
        color: #aab2bd;
      }
      select {
        float: left;
        width: 300px;
        border: 0;
        height: 50px;
        background: none;
        outline: none;
        text-align-last: left;
        margin-top: 23px;
        margin-left: 23px;
        font-size: 30px;
        color: #aab2bd;
        option {
          color: black;
          text-align-last: left;
        }
      }
    }
    li:first-child {
      margin-top: 51px;
    }
    .code {
      width: 400px;
      float: left;
      margin-left: 80px;
      border-radius: 15px 0 0 15px;
      input {
        width: 200px;
        margin-left: 23px;
      }
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
.protocol {
  margin-top: 26px;
  color: #fff;
  font-size: 26px;
  text-align: center;
  line-height: 34px;
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
    margin-right: 10px;
  }
  input:checked + label::before {
    content: "\2714";
    font-size: 28px;
    font-weight: bold;
    color: #a07c96;
  }
  a {
    color: red;
    display: inline-block;
    vertical-align: middle;
  }
  span {
    display: inline-block;
    vertical-align: middle;
  }
}
.registerBtn {
  width: 588px;
  height: 100px;
  background: linear-gradient(#fec830, #f37336);
  text-align: center;
  line-height: 100px;
  color: #fff;
  border-radius: 100px;
  margin: 50px auto 50px;
  font-size: 33px;
}
</style>
