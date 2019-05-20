<template>
  <div class="home" v-title="'首页'">
    <div class="homeBox" :class="{ homeBoxLeave: isOpen }">
      <div class="top">
        <i class="iconfont" @click="CHANGE_OPEN(isOpen)">&#xe69d;</i>
        <span>
          <img src="/images/logo.png" alt="" />
        </span>
        <router-link :to="{ name: 'download' }">
          <i class="iconfont">&#xe69e;</i>
        </router-link>
      </div>
      <div class="content" v-if="initHomeData">
        <div class="gonggao">
          <div class="laba iconfont">&#xe69f;</div>
          <div class="text-box">
            <div class="text">
              <span>{{ initHomeData.setting.webGG }}</span>
            </div>
          </div>
        </div>
        <div class="slider-container" v-if="initHomeData.hasOwnProperty('banner')">
          <div class="slider-content">
            <div
              class="slider"
              v-for="(item, j) in initHomeData.banner"
              :key="j"
              :class="[
                { active: activeIndex === j },
                {
                  prev:
                    activeIndex - 1 < 0
                      ? initHomeData.banner.length - 1 === j
                      : activeIndex - 1 === j
                },
                {
                  next:
                    activeIndex + 1 >= initHomeData.banner.length
                      ? j === 0
                      : activeIndex + 1 === j
                }
              ]"
            >
              <my-img :src="item.image"></my-img>
            </div>
          </div>
        </div>
        <cube-tab-bar v-model="selectedLabel" show-slider @click="clickHandler">
          <cube-tab
            v-for="(item, index) in tabsList"
            :label="item.name"
            :value="index"
            :key="item.index"
          >
          </cube-tab>
        </cube-tab-bar>
        <swiper :options="gameListSwiper" ref="gameListSwiper">
          <swiper-slide v-for="(item, i) in tabsList" :key="i">
            <ul v-if="!item.list">
              <li
                v-for="(item, i) in initHomeData.recommend"
                :key="i"
                @click="playGame(item.isHall, item.link, item.typeKey)"
              >
                <div>
                  <my-img :src="item.bigImg"></my-img>
                </div>
                <p>{{ item.title }}</p>
              </li>
            </ul>
            <dl v-else>
              <dd
                v-for="(child, j) in item.list"
                :key="j"
                @click="
                  playGame(child.isHall, child.link, child.typeKey, child.title)
                "
              >
                <div>
                  <img :src="child.img" alt="" />
                </div>
                <p>{{ child.title }}</p>
              </dd>
            </dl>
          </swiper-slide>
        </swiper>
      </div>
      <my-foot></my-foot>
      <div class="maskLayer" v-show="isOpen" @click="CHANGE_OPEN(isOpen)"></div>
    </div>
    <my-user></my-user>
  </div>
</template>

<script>
import { announcement } from "@/common/common.js";
import { mapGetters, mapMutations } from "vuex";
import { initHome } from "../../api";
export default {
  name: "Home",
  data() {
    return {
      activeIndex: 1,
      bannerTimer: "",
      gameListSwiper: {
        on: {
          slideChangeTransitionStart: () => {
            this.selectedLabel = this.swiper.activeIndex;
          },
          touchStart: function(e) {
            e.stopPropagation();
          },
          touchEnd: function(e) {
            e.stopPropagation();
          }
        }
      },
      selectedLabel: 0,
      tabs: [
        {
          index: 0,
          name: "热门游戏"
        }
      ]
    };
  },
  created() {
    console.log(this.initHomeData, "首页数据----------------------");
    if (!this.initHomeData) {
      this.initHomes();
    } else {
      this.$nextTick(() => {
        announcement(".text", 1, 15);
        this.changeBanner();
      });
    }
  },
  computed: {
    ...mapGetters(["isOpen", "initHomeData"]),
    swiper() {
      return this.$refs.gameListSwiper.swiper;
    },
    tabsList() {
      return this.tabs.concat(this.initHomeData.hall);
    }
  },
  methods: {
    ...mapMutations(["CHANGE_OPEN"]),
    clickHandler(index) {
      this.selectedLabel = index;
      this.swiper.slideTo(index);
    },
    initHomes() {
      initHome().then(res => {
        console.log(res.data, "首页数据");
        if (res.status) {
          this.$store.commit("SET_HOME_DATA", res.data);
          this.$store.commit("SET_WEB_NAME", res.data.setting.webName);
          this.$store.commit("SET_KEFU_GG", res.data.setting.kefuGG);
        }
        this.$nextTick(() => {
          announcement(".text", 1, 15);
          this.changeBanner();
        });
      });
    },
    changeBanner() {
      let Slider = document.getElementsByClassName("slider-container")[0];
      let startX;
      let endX;
      let that = this;
      let MaxLength = this.initHomeData.banner.length;
      Slider.addEventListener("touchstart", function(e) {
        e = window.event || e;
        e.stopPropagation();
        startX = e.changedTouches[0].clientX;
        clearInterval(that.bannerTimer);
      });
      Slider.addEventListener("touchend", function(e) {
        e = window.event || e;
        e.stopPropagation();
        endX = e.changedTouches[0].clientX;
        if (startX - endX > 20) {
          that.activeIndex += 1;
          if (that.activeIndex >= MaxLength) {
            that.activeIndex = 0;
          }
        } else if (startX - endX <= -20) {
          that.activeIndex -= 1;
          if (that.activeIndex < 0) {
            that.activeIndex = MaxLength - 1;
          }
        }
        clearInterval(this.bannerTimer);
        this.bannerTimer = setInterval(Carousel, 2500);
      });
      this.bannerTimer = setInterval(Carousel, 2500);
      function Carousel() {
        that.activeIndex++;
        if (that.activeIndex >= MaxLength) {
          that.activeIndex = 0;
        }
      }
    }
  }
};
</script>

<style scoped lang="less">
.home {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #151a1c;
  .homeBox {
    transform: translateX(0%);
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: 0.38s;
  }
  .homeBoxLeave {
    transform: translateX(50%);
  }
  .top {
    height: 104px;
    background-color: #212529;
    > i {
      color: white;
      position: absolute;
      left: 20px;
      font-size: 40px;
      top: 30px;
    }
    span {
      display: block;
      width: 247px;
      height: 58px;
      margin: 25px auto 0;
      img {
        width: 100%;
        height: 100%;
      }
    }
    a {
      position: absolute;
      display: inline-block;
      right: 20px;
      top: 25px;
      color: #fff;
      i {
        font-size: 50px;
      }
    }
  }
  .content {
    flex: 1;
    overflow-y: scroll;
    background-color: #2d3137;
    .gonggao {
      width: 100%;
      height: 60px;
      line-height: 60px;
      overflow: hidden;
      background-color: #3c3d3d;
      margin-bottom: 34px;

      .laba {
        width: 46px;
        height: 46px;
        float: left;
        color: white;
        margin: 0 10px;
        font-size: 33px;
      }

      .text-box {
        position: relative;
        overflow: hidden;
        width: 90%;
        height: 60px;

        .text {
          color: white;
          line-height: 60px;
          white-space: nowrap;
          position: absolute;
          top: 0;
          left: 100%;
          overflow: hidden;

          span {
            display: inline-block;
            vertical-align: middle;
            font-size: 26px;
          }
        }
      }
    }
    .slider-container {
      width: 100%;
      height: 314px;
      position: relative;
      .slider-content {
        position: relative;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        margin: 0;
        padding: 0;
        background-size: inherit;
        overflow: hidden;
        .slider {
          width: 670px;
          height: 100%;
          position: absolute;
          top: 0;
          left: 50%;
          border-radius: 10px;
          overflow: hidden;
          transition: 500ms all ease-in-out;
          transform: translate3d(-50%, 0, 0);
          z-index: 1;
          opacity: 0;
          &.active {
            transform: translate3d(-50%, 0, 100px);
            z-index: 20;
            opacity: 1;
          }
          &.prev {
            transform: translate3d(-120%, 0, -200px) scale(0.85);
            z-index: 19;
            opacity: 0.3;
            filter: alpha(opacity=30);
            img {
              -webkit-filter: blur(1px);
              filter: blur(1px);
            }
          }
          &.next {
            transform: translate3d(30%, 0, -200px) scale(0.85);
            z-index: 18;
            opacity: 0.3;
            filter: alpha(opacity=30);
            img {
              -webkit-filter: blur(1px);
              filter: blur(1px);
            }
          }
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
    .cube-tab-bar {
      margin-top: 40px;
      margin-bottom: 35px;
      .cube-tab {
        font-size: 30px;
        color: #999999;
        padding: 16px 0;
        margin: 0 20px;
      }
      .cube-tab_active {
        color: #fff;
        border-color: #1e2325;
      }
    }
    ul {
      li {
        width: 222px;
        height: 180px;
        background-color: #252525;
        border-radius: 10px;
        overflow: hidden;
        float: left;
        margin-left: 20px;
        margin-bottom: 19px;
        div {
          height: 130px;
          img {
            height: 100%;
            width: 100%;
          }
        }
        p {
          line-height: 50px;
          color: rgb(149, 173, 180);
          font-size: 23px;
          text-align: center;
        }
      }
    }
    dl {
      overflow: hidden;
      dd {
        float: left;
        width: 25%;
        text-align: center;
        div {
          width: 120px;
          height: 120px;
          display: inline-block;
          line-height: 120px;
          img {
            width: 100%;
            display: inline-block;
            vertical-align: middle;
          }
        }
        p {
          text-align: center;
          line-height: 40px;
          font-size: 25px;
          color: #fff;
        }
      }
    }
  }
  .footText {
    background-color: #2d3137;
    height: 80px;
    line-height: 80px;
    text-align: center;
    z-index: 1;
    span {
      color: #999999;
      font-size: 27px;
      position: relative;
      &:after {
        content: " ";
        position: absolute;
        right: -175px;
        top: 13px;
        width: 148px;
        height: 1px;
        border-bottom: 1px solid #999999; /*no*/
      }
      &:before {
        content: " ";
        position: absolute;
        left: -175px;
        top: 13px;
        width: 148px;
        height: 1px;
        border-bottom: 1px solid #999999; /*no*/
      }
    }
  }
}
</style>
