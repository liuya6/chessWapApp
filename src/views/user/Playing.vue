<style scoped lang="less">
.body {
  overflow: hidden;
  width: 100%;
  height: 100%;

  .loading {
    height: 100%;
    background-color: rgb(239, 239, 244);
    .loadingBox {
      width: 150px;
      height: 120px;
      text-align: center;
      position: fixed;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      margin: auto;
    }
  }
  .back {
    position: fixed;
    left: 50px;
    top: 100px;
    width: 35px;
    height: 35px;
    line-height: 80px;
    border-radius: 50%;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.8);
    font-size: 25px;
    color: silver;
    padding: 15px;
    z-index: 2;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .layer {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  }
}
</style>
<template>
  <div class="body">
    <div class="layer" v-show="showFlag"></div>
    <div class="back" v-show="!loading">
      <img src="../../assets/img/home.png" alt="" />
    </div>
    <div v-if="loading" class="loading">
      <div class="loadingBox">
        <cube-loading :size="40"></cube-loading>
        拼命加载中...
      </div>
    </div>
    <div style="width: 100%;height: 100%">
      <!--
              :src="gameUrl"
      -->
      <iframe
        :src="gameUrl"
        frameborder="0"
        width="100%"
        height="100%"
        id="iframeBox"
      ></iframe>
    </div>
  </div>
</template>

<script>
import { MessageBox } from "mint-ui";
import { mapGetters } from "vuex";
export default {
  name: "KYchess",
  data() {
    return {
      loading: true,
      showFlag: false
    };
  },
  created() {
    this.$nextTick(() => {
      let iframe = document.getElementById("iframeBox");
      let that = this;
      let flag = true;
      console.log(iframe);
      if (iframe.attachEvent) {
        iframe.attachEvent("onload", function() {
          // IE
          that.loading = false;
        });
      } else {
        iframe.onload = function() {
          // 非IE
          that.loading = false;
        };
      }
      let back = document.getElementsByClassName("back")[0];
      let WindowWidth = document.body.clientWidth;
      let WindowHeight = document.body.clientHeight;
      let boxWidth = back.offsetWidth || 33;
      let boxHeight = back.offsetHeight || 33;
      console.log(WindowWidth, WindowHeight, boxWidth, boxHeight);
      window.onresize = function() {
        WindowWidth = document.body.clientWidth;
        WindowHeight = document.body.clientHeight;
        boxWidth = back.offsetWidth;
        boxHeight = back.offsetHeight;
        back.style.left = 50 + "px";
        back.style.top = 50 + "px";
        console.log(WindowWidth, WindowHeight, boxWidth, boxHeight, "监听");
      };
      back.ontouchstart = function(e) {
        e = window.event || e;
        e.preventDefault();
        flag = true;
        that.showFlag = true;
      };
      back.ontouchmove = function(e) {
        e = window.event || e;
        e.preventDefault();
        flag = false;
        let endX = e.changedTouches[0].clientX - boxWidth / 2;
        let endY = e.changedTouches[0].clientY - boxHeight / 2;
        // console.log(endX,endY,WindowWidth,WindowHeight);
        if (endX <= 0) {
          endX = 0;
        }
        if (endX > WindowWidth - boxWidth) {
          endX = WindowWidth - boxWidth;
        }
        if (endY <= 0) {
          endY = 0;
        }
        if (endY > WindowHeight - boxHeight) {
          endY = WindowHeight - boxHeight;
        }
        back.style.left = endX + "px";
        back.style.top = endY + "px";
      };
      back.ontouchend = function(e) {
        e = window.event || e;
        e.preventDefault();
        that.showFlag = false;
        if (flag) {
          MessageBox.confirm("确定退出吗?")
            .then(action => {
              console.log(action);
              that.$router.push({ name: "home" });
            })
            .catch(e => {
              console.log(e);
            });
        }
      };
    });
  },
  computed: {
    ...mapGetters(["gameUrl"])
  },
  methods: {
    goBack() {}
  }
};
</script>
