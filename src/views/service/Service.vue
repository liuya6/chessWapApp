<template>
  <div class="service" v-title="'在线客服'">
    <div class="serviceBox" :class="{ serviceLeave: isOpen }">
      <div class="top">
        <i class="iconfont" @click="CHANGE_OPEN(isOpen)">&#xe69d;</i>
        在线客服
      </div>
      <div class="content">
        <div v-if="loading" class="loading">
          <div class="loadingBox">
            <cube-loading :size="40"></cube-loading>
            拼命加载中...
          </div>
        </div>
        <iframe
          :src="kefuGG || kefu"
          frameborder="0"
          width="100%"
          height="100%"
          id="iframeBox"
        ></iframe>
      </div>
      <my-foot></my-foot>
      <div class="maskLayer" v-show="isOpen" @click="CHANGE_OPEN(isOpen)"></div>
    </div>
    <my-user></my-user>
  </div>
</template>

<script>
import { settings } from "../../api";
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "Service",
  data() {
    return {
      loading: true,
      kefu: ""
    };
  },
  created() {
    console.log(this.kefuGG, "11111111111");
    if (!this.kefuGG) {
      settings().then(res => {
        if (res.status) {
          this.kefu = res.data.kefuGG;
          this.$store.commit("SET_WEB_NAME", res.data.webName);
          this.$store.commit("SET_KEFU_GG", res.data.kefuGG);
        }
      });
    } else {
      this.load();
    }
  },
  computed: {
    ...mapGetters(["isOpen", "kefuGG"])
  },
  methods: {
    ...mapMutations(["CHANGE_OPEN"]),
    load() {
      this.$nextTick(() => {
        let iframe = document.getElementById("iframeBox");
        let that = this;
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
      });
    }
  },
  watch: {
    kefuGG(newVal) {
      if (newVal) {
        this.load();
      }
    }
  }
};
</script>

<style scoped lang="less">
.service {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #151a1c;
  .serviceLeave {
    transform: translateX(50%);
  }
  .serviceBox {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: 0.38s;
    .top {
      height: 104px;
      background-color: #212529;
      font-size: 30px;
      color: #fff;
      text-align: center;
      line-height: 104px;
      i:first-child {
        position: absolute;
        left: 20px;
        font-size: 40px;
      }
    }
    .content {
      flex: 1;
      overflow-y: scroll;
      position: relative;
      .loading {
        position: absolute;
        width: 100%;
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
    }
  }
}
</style>
