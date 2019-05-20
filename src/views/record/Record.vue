<template>
  <div class="record" v-title="'游戏记录'">
    <div class="recordBox" :class="{ recordLeave: isOpen }">
      <div class="top">
        <i class="iconfont" @click="CHANGE_OPEN(isOpen)">&#xe69d;</i>
        <div>
          <span @click="drop">{{ title }}</span>
          <i
            class="iconfont"
            :class="showMenu ? '' : 'rotate'"
            @click="showMenu = !showMenu"
          >
            &#xe6a6;
          </i>
          <i class="iconfont right" @click="TabRight">&#xe6a7;</i>
        </div>
        <transition name="bounce">
          <ul class="nav" v-show="!showMenu">
            <li
              v-for="(item, i) in classify"
              :key="i"
              @click="Tab(item.typeKey, item.name)"
            >
              <i>
                <img :src="item.img" alt="" />
              </i>
              <span>
                {{ item.name }}
              </span>
            </li>
          </ul>
        </transition>
      </div>
      <div class="content">
        <component
          :is="selectVal"
          :TabShowFlag="TabShowFlag"
          :Tab="TabRight"
          :type="select"
          :AllClose="AllClose"
        ></component>
      </div>
      <my-foot v-show="!isShow"></my-foot>
      <div class="maskLayer" v-show="isOpen" @click="CHANGE_OPEN(isOpen)"></div>
    </div>
    <my-user></my-user>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from "vuex";
import { ThirdList } from "../../api";
import KaiYuan from "../../components/record/KaiYuan";
import ElectronicGame from "../../components/record/ElectronicGame";

export default {
  name: "recording",
  data() {
    return {
      classify: [],
      title: "开元棋牌",
      TabShowFlag: false,
      CqShowFlag: false,
      AgShowFlag: false,
      select: "KaiYuan",
      showMenu: true
    };
  },
  computed: {
    ...mapGetters(["isOpen"]),
    isShow() {
      return this.TabShowFlag;
    },
    selectVal() {
      switch (this.select) {
        case "KaiYuan":
        case "LeYou":
          return "KaiYuan";
        default:
          return "ElectronicGame";
      }
    }
  },
  components: {
    KaiYuan,
    ElectronicGame
  },
  created() {
    if (
      sessionStorage.getItem("select") &&
      sessionStorage.getItem("RecordTitle")
    ) {
      this.select = sessionStorage.getItem("select");
      this.title = sessionStorage.getItem("RecordTitle");
    }
    this.initialTitle();
  },
  methods: {
    ...mapMutations(["CHANGE_OPEN"]),
    ...mapActions(["checkedLogin"]),
    initialTitle() {
      ThirdList().then(res => {
        if (res.status) {
          console.log(res.data);
          this.classify = res.data;
        }
      });
    },
    Tab(type, RecordTitle) {
      if (this.title == RecordTitle) {
        return (this.showMenu = true);
      }
      console.log(type, RecordTitle);
      this.showMenu = true;
      this.TabShowFlag = false;
      sessionStorage.setItem("select", type);
      sessionStorage.setItem("RecordTitle", RecordTitle);
      this.select = type;
      this.title = RecordTitle;
    },
    TabRight() {
      this.TabShowFlag = !this.TabShowFlag;
      this.showMenu = true;
    },
    drop() {
      this.showMenu = !this.showMenu;
      this.TabShowFlag = false;
    },
    AllClose() {
      this.TabShowFlag = false;
    }
  }
};
</script>

<style scoped lang="less">
.record {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #151a1c;
  .recordLeave {
    transform: translateX(50%);
  }
}
.recordBox {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  height: 100%;
  text-align: center;
  transition: 0.38s;
  .rotate {
    transform: rotate(180deg);
  }
  .top {
    height: 104px;
    color: white;
    font-size: 28px;
    position: fixed;
    top: 0;
    width: 100%;
    line-height: 104px;
    z-index: 100;
    > i {
      position: absolute;
      left: 20px;
      font-size: 40px;
      color: #fff !important;
      z-index: 200;
    }
    .right {
      position: absolute;
      top: 31px;
      width: 38px;
      line-height: 38px;
      right: 20px;
      font-size: 45px;
    }
    div {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      line-height: 101px;
      background-color: #212529;
      z-index: 100;

      span {
        margin-right: 10px;
      }

      i {
        position: absolute;
        width: 38px;
        height: 38px;
        line-height: 38px;
        top: 31px;
        transition: 0.3s;
        vertical-align: middle;
        font-size: 30px;
      }
    }

    .nav {
      width: 100%;
      position: absolute;
      top: 100px;
      left: 0;
      background-color: #212529;
      transition: 0.3s;
      z-index: 99;

      li {
        border-top: 1px solid rgba(255, 255, 255, 0.5);
        height: 80px;
        line-height: 80px;
        text-align: left;
        i {
          display: inline-block;
          width: 68px;
          height: 80px;
          line-height: 80px;
          overflow: hidden;
          margin-right: 20px;
          margin-left: 35%;
          img {
            display: inline-block;
            vertical-align: middle;
            width: 100%;
          }
        }
        span {
          display: inline-block;
          vertical-align: top;
          line-height: 80px;
        }
        a {
          display: block;
          color: white;
          font-size: 25px;
        }
      }
    }
  }

  .bounce-enter-active {
    animation: downIn 0.3s;
  }

  .bounce-leave-active {
    animation: downIn 0.3s reverse;
  }

  @keyframes downIn {
    0% {
      transform: translateY(-580px);
    }
    100% {
      transform: translateY(0px);
    }
  }
  .content {
    flex: 1;
    padding-top: 104px;
    background-color: #fff;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
  }
}
</style>
