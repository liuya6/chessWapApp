<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive">
        <!-- 这里是会被缓存的视图组件，比如列表A页面 -->
      </router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive">
      <!-- 这里是不被缓存的视图组件，比如详情B页面-->
    </router-view>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {};
  },
  created() {
    this.$nextTick(() => {
      let startX;
      // let startY;
      let endX;
      // let endY;
      let that = this;
      document.addEventListener("touchstart", function(e) {
        e = window.event || e;
        startX = e.changedTouches[0].clientX;
        // startY = e.changedTouches[0].clientY;
      });
      document.addEventListener("touchend", function(e) {
        e = window.event || e;
        endX = e.changedTouches[0].clientX;
        // endY = e.changedTouches[0].clientY;
        if (startX - endX > 50) {
          if (that.isOpen) {
            that.CHANGE_OPEN(1);
          }
        }
        // else if (endX - startX > 130 && parseInt(endY - startY) < 130) {
        //   console.log(startX - endX, endY - startY);
        //   if (!that.isOpen) {
        //     that.CHANGE_OPEN(0);
        //   }
        // }
      });
    });
  },
  computed: {
    ...mapGetters(["isOpen"])
  },
  methods: {
    ...mapMutations(["CHANGE_OPEN"])
  }
};
</script>
