<template>
  <div class="hall" v-title="'游戏大厅'">
    <div class="top">
      <i class="iconfont" @click="back">&#xe629;</i>
      {{ gameTitle }}
    </div>
    <div class="content">
      <mt-loadmore
        :top-method="loadTop"
        :bottom-method="loadBottom"
        :bottom-all-loaded="allLoaded"
        :auto-fill="false"
        ref="loadMore"
        style="min-height: 100%"
        bottomPullText=""
        :bottomDistance="100"
        :topDistance="100"
      >
        <ul>
          <li v-for="(item, j) in gameList" :key="j">
            <div @click="playGame(item.isHall, item.link, item.typeKey)">
              <i>
                <my-img :src="item.img" :small="true"></my-img>
              </i>
              <p>{{ item.title }}</p>
            </div>
          </li>
        </ul>
        <div slot="top" class="mint-loadmore-top">
          <span
            v-show="topStatus !== 'loading'"
            :class="{ 'is-rotate': topStatus === 'drop' }"
            >下拉刷新</span
          >
          <span v-show="topStatus === 'loading'" id="top">
            <mt-spinner type="double-bounce" color="#26a2ff"></mt-spinner>
          </span>
        </div>
        <div
          slot="bottom"
          class="mint-loadmore-bottom"
          v-if="!allLoaded && gameList.length"
        >
          <span
            v-show="bottomStatus !== 'loading'"
            :class="{ 'is-rotate': bottomStatus === 'drop' }"
            >上拉显示更多</span
          >
          <span v-show="bottomStatus === 'loading'" id="bottom">
            <mt-spinner type="double-bounce" color="#26a2ff"></mt-spinner>
          </span>
        </div>
      </mt-loadmore>
    </div>
  </div>
</template>

<script>
import { hallType } from "../../api";
import { Toast } from "mint-ui";
import { mapGetters } from "vuex";
export default {
  name: "Hall",
  data() {
    return {
      bottomStatus: false, //上拉动画
      topStatus: false, //下拉动画
      allLoaded: false, //上拉加载更多 无数据时的状态
      noData: false,
      gameList: [],
      parameter: {
        typeKey: "KaiYuan",
        pageSize: 20,
        page: 1
      }
    };
  },
  created() {
    console.log(this.parameter, this.gameType, this.gameTitle);
    this.parameter.typeKey = this.gameType;
    this.gameLists();
  },
  destroyed() {
    console.log(this.gameTitle);
    this.$store.commit("SET_GAME_TYPE", "");
    this.$store.commit("SET_GAME_TITLE", "");
  },
  computed: {
    ...mapGetters(["gameType", "gameTitle"])
  },
  methods: {
    gameLists() {
      hallType(this.parameter).then(res => {
        console.log(res);
        if (res.status) {
          this.gameList = res.data.list;
          if (res.data.list.length < this.parameter.pageSize) {
            this.allLoaded = true;
          }
        }
      });
    },
    loadTop() {
      this.topStatus = "loading";
      this.parameter.offset = 0;
      let that = this;
      new Promise(function(resolve, reject) {
        resolve(hallType(this.parameter));
        reject("网络繁忙");
      }).then(res => {
        if (res.length) {
          Toast("刷新成功");
        } else {
          Toast("暂无更多数据");
        }
        that.$refs.loadMore.onTopLoaded();
        that.topStatus = null;
      });
    },
    loadBottom() {
      this.bottomStatus = "loading";
      this.parameter.page++;
      hallType(this.parameter).then(res => {
        console.log(res);
        if (res.status) {
          if (res.data.list.length) {
            this.gameList = this.gameList.concat(res.data.list);
          } else {
            Toast("暂无更多数据");
            this.allLoaded = true;
          }
          this.bottomStatus = null;
          this.$refs.loadMore.onBottomLoaded();
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.hall {
  text-align: center;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .top {
    height: 100px;
    line-height: 100px;
    font-size: 37px;
    color: white;
    background-color: #212529;
    position: relative;

    i {
      position: absolute;
      left: 20px;
      font-size: 50px;
    }
  }
  .content {
    flex: 1;
    overflow-y: scroll;
    ul {
      overflow-y: scroll;
      display: flex;
      flex-wrap: wrap;
      align-content: flex-start;

      li {
        overflow: hidden;
        width: 25%;
        text-align: center;
        margin: 20px 0;

        div {
          i {
            display: inline-block;
            width: 120px;
            height: 120px;
            line-height: 120px;
            .loading {
              .loading-container {
                .loader {
                  .loading-bubbles {
                    .bubble-container {
                      display: none;
                    }
                  }
                }
              }
            }
            img {
              display: inline-block;
              vertical-align: middle;
              height: 100%;
            }
          }

          p {
            font-size: 28px;
            color: #666;
            margin-top: 10px;
          }
        }
      }
    }
  }
}
</style>
