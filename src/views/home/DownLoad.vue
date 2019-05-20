<template>
  <div class="downLoad">
    <div class="top">
      <i class="iconfont" @click="back">&#xe629;</i>
      <div>
        <img src="/images/logo.png" alt="" />
      </div>
      <a target="_blank" :href="url">APP下载</a>
    </div>
    <div class="content">
      <a target="_blank" :href="url" class="downImg">
        <div v-if="ios">
          <img src="../../assets/img/down/ios.png" alt="" />
        </div>
        <div v-else>
          <img src="../../assets/img/down/android.png" alt="" />
        </div>
      </a>
      <div class="iosText" v-show="remind">
        <p>
          由于苹果大量封杀软件，为了更好的用户体验，请大家记住官网，若2223棋牌信任证书失效无法进入时，重新下载信任即可
        </p>
        <a target="_blank" :href="url">保存官网到桌面</a>
        <span @click="remind = false">关闭窗口</span>
      </div>
      <div class="classify">
        <img src="../../assets/img/down/img1.png" alt="" />
      </div>
      <div class="description">
        <img src="../../assets/img/down/img2.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import { download } from "../../api";
export default {
  name: "DownLoad",
  data() {
    return {
      ios: false,
      remind: true,
      url: "",
      androidUrl: "",
      iosUrl: ""
    };
  },
  created() {
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
      //判断iPhone|iPad|iPod|iOS
      this.ios = true;
      this.remind = true;
    } else if (/(Android)/i.test(navigator.userAgent)) {
      //判断Android
      this.ios = false;
      this.remind = false;
    } else {
      //pc
    }
    download().then(res => {
      if (res.status) {
        if (this.ios) {
          this.url = res.data.iosUrl;
        } else {
          this.url = res.data.androidUrl;
        }
      }
    });
  }
};
</script>
<style scoped lang="less">
.downLoad {
  .top {
    height: 104px;
    line-height: 104px;
    background-color: #343024;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 2;
    i {
      float: left;
      color: #959595;
      font-size: 40px;
      line-height: 104px;
      margin-left: 10px;
    }
    div {
      float: left;
      width: 270px;
      img {
        width: 100%;
        display: inline-block;
        vertical-align: middle;
      }
    }
    a {
      float: right;
      width: 177px;
      height: 80px;
      text-align: center;
      background: linear-gradient(#4db7d1, #4e5ca3);
      line-height: 80px;
      color: #fff;
      font-size: 27px;
      border-radius: 10px;
      margin-top: 12px;
      margin-right: 28px;
    }
  }
  .content {
    margin-top: 104px;
    min-height: 2000px;
    background: url("../../assets/img/down/bg-img.jpg") no-repeat
      rgb(70, 152, 225);
    -webkit-background-size: 100%;
    background-size: 100%;
    overflow: hidden;
    position: relative;

    .downImg {
      div {
        width: 459px;
        margin: 730px auto 0;
        img {
          width: 100%;
        }
      }
    }
    .iosText {
      width: 670px;
      background-color: #fff;
      border-radius: 10px;
      padding: 20px;
      font-size: 28px;
      position: fixed;
      bottom: 10px;
      left: 50%;
      transform: translate(-50%);
      p {
        line-height: 40px;
      }
      a {
        text-align: center;
        line-height: 78px;
        box-sizing: border-box;
        margin-top: 28px;
        border-radius: 78px;
        color: #fff;
        display: inline-block;
        width: 412px;
        height: 78px;
        background: linear-gradient(#4db7d1, #4e5ca3);
      }
      span {
        text-align: center;
        line-height: 78px;
        box-sizing: border-box;
        margin-top: 28px;
        border-radius: 78px;
        display: inline-block;
        width: 233px;
        border: 1px solid #fe0000; /*no*/
        color: #fe0000;
        margin-left: 10px;
      }
    }
    .classify {
      width: 710px;
      margin: 32px auto 0;
      img {
        width: 100%;
      }
    }
    .description {
      width: 710px;
      margin: 32px auto 150px;
      img {
        width: 100%;
      }
    }
  }
}
</style>
