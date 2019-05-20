<template>
  <div class="body">
    <div class="top">
      <i class="iconfont" @click="back">&#xe629;</i>
      单日统计
      <div class="select" v-if="gameList">
        <cube-select
          v-model="value"
          :options="gameOptions"
          :placeholder="'全部游戏'"
          @change="changeGame"
        >
        </cube-select>
      </div>
    </div>
    <div class="content" v-if="list">
      <dl>
        <dt>
          <span>时间</span>
          <span>有效投注</span>
          <span>输赢</span>
        </dt>
        <dd v-for="(item, i) in list" :key="i">
          <span>{{ item.date }}</span>
          <span>{{ item.list.cellScore }}</span>
          <span>{{ item.list.profit }}</span>
        </dd>
      </dl>
    </div>
  </div>
</template>

<script>
import { ThirdList, serchTotal } from "../../api";
import { mapGetters } from "vuex";
export default {
  name: "Statistics",
  data() {
    return {
      value: "0",
      list: ""
    };
  },
  created() {
    ThirdList().then(res => {
      console.log(res, "今日统计数据--------------------------");
      if (res.status) {
        this.$store.commit("SET_GAME_LIST", res.data);
      }
    });
    this.initTotal();
  },
  computed: {
    ...mapGetters(["gameList"]),
    gameOptions() {
      let list = ["全部游戏"];
      for (let i = 0; i < this.gameList.length; i++) {
        list.push(this.gameList[i].name);
      }
      console.log(list);
      return list;
    },
    typeKey() {
      for (let i = 0; i < this.gameList.length; i++) {
        let item = this.gameList[i];
        if (this.value == item.name) {
          return item.typeKey;
        }
      }
      return 0;
    }
  },
  methods: {
    changeGame(value) {
      console.log(value);
      this.initTotal();
    },
    initTotal() {
      console.log("initTatal", this.typeKey, "1111111111111111111111111111");
      serchTotal({ typeKey: this.typeKey }).then(res => {
        console.log(res);
        if (res.status) {
          this.list = res.data.list;
          console.log(this.list, "list==============================");
        }
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
  text-align: center;
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
    .select {
      position: absolute;
      top: 0;
      right: 22px;
      width: 250px;
      height: 100px;
      line-height: 100px;
      text-align: right;
      .cube-select {
        background-color: #212529;
        color: #fff;
        display: inline-block;
        &:after {
          border: 0;
        }
      }
    }
  }
  .content {
    flex: 1;
    overflow-y: scroll;
    dl {
      dt {
        line-height: 82px;
        border-bottom: 1px solid #dfdcda;
        background-color: #f0f0f0;
        text-align: left;
        span {
          color: #333333;
          display: inline-block;
          text-align: left;
          font-size: 34px;
          &:nth-child(1) {
            width: 250px;
            margin-left: 40px;
          }
          &:nth-child(2) {
            width: 250px;
          }
        }
      }
      dd {
        line-height: 127px;
        border-bottom: 1px solid #dfdcda;
        text-align: left;
        &:nth-of-type(2n + 1) {
          background-color: #fafafa;
        }
        span {
          color: #333333;
          display: inline-block;
          text-align: left;
          font-size: 34px;
          &:nth-child(1) {
            width: 250px;
            margin-left: 40px;
          }
          &:nth-child(2) {
            width: 250px;
          }
        }
      }
    }
  }
}
</style>
