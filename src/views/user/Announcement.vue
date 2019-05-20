<style scoped lang="less">
.body {
  .top {
    height: 100px;
    line-height: 100px;
    font-size: 37px;
    color: white;
    background-color: #212529;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1;
    text-align: center;

    i {
      position: absolute;
      left: 20px;
      font-size: 50px;
    }

    span {
      color: white;
      font-weight: normal;
      position: absolute;
      right: 25px;
      font-size: 30px;
    }
  }

  .content {
    background-color: #f6f6f6;
    padding-top: 100px;

    ul {
      overflow: hidden;
      li {
        background-color: #fff;
        margin: 25px;
        text-align: left;
        padding: 15px 15px 15px 35px;

        h3 {
          font-size: 40px;
          color: #333333;
          line-height: 60px;
        }

        span {
          color: #999999;
          line-height: 40px;
        }

        p {
          margin-top: 10px;
          color: #666666;
          font-size: 31px;
        }
      }
    }
  }
}
</style>
<template>
  <div class="body" v-title="'公告列表'">
    <div class="top shenLan">
      <i class="iconfont" @click="back">&#xe629;</i>
      公告
    </div>
    <div class="content">
      <ul v-if="announcementArr">
        <li v-for="(item, i) in announcementArr" :key="i">
          <h3>{{ item.title }}</h3>
          <span>{{ timestampToString(item.addTime) }}</span>
          <p>{{ item.content }}</p>
        </li>
      </ul>
      <div v-if="noData" class="noData">
        <div class="content_box">
          <div>
            <p><img src="../../assets/img/jx-cat_03.png" alt="" /></p>
            <h4>公告列表是空的噢！</h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { announcement } from "../../api";
export default {
  name: "AnnouncementList",
  data() {
    return {
      announcementArr: [],
      noData: false
    };
  },
  created() {
    announcement().then(res => {
      if (res.status) {
        this.announcementArr = res.data;
        console.log(res.data);
        if (!this.announcementArr || !this.announcementArr.length) {
          this.noData = true;
        } else {
          this.noData = false;
        }
      }
    });
  }
};
</script>
