<template>
  <div class="footer">
    <ul>
      <li v-for="(item, i) in footArr" :key="i">
        <router-link :to="item.pathName">
          <i class="iconfont" v-html="item.icon"></i>
          <span>{{ item.name }}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
const footArr = [
  { name: "首页", pathName: "/", icon: "&#xe6a0;" },
  { name: "记录", pathName: "/record", icon: "&#xe6a1;" },
  { name: "活动", pathName: "/activity", icon: "&#xe6a3;" },
  { name: "客服", pathName: "/service", icon: "&#xe6a4;" }
];
export default {
  name: "Footer",
  data() {
    return {
      footArr
    };
  }
};
</script>

<style scoped lang="less">
.footer {
  height: 104px;
  background-color: #212529;
  ul {
    li {
      width: 25%;
      float: left;
      text-align: center;
      a {
        color: rgb(138, 160, 166);
        i {
          display: block;
          font-size: 39px;
          line-height: 72px;
        }
        span {
          font-size: 23px;
        }
      }
    }
  }
  .router-link-exact-active {
    color: #fff;
  }
}
</style>
