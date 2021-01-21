<template>
  <div class="wrapper">
    <!-- 轮播图 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item><img src="/swiper1.jpeg" alt="" /></van-swipe-item>
      <van-swipe-item><img src="/swiper2.jpeg" alt="" /></van-swipe-item>
      <van-swipe-item><img src="/swiper3.jpeg" alt="" /></van-swipe-item>
      <van-swipe-item><img src="/swiper4.jpeg" alt="" /></van-swipe-item>
    </van-swipe>
    <!-- 分类 -->
    <div class="kinds">
      <div class="kind" @click="toCourse">
        <img src="/kind1.png" alt="" />
        <p>特色课</p>
      </div>
      <div class="kind">
        <img src="/kind2.png" alt="" />
        <p>一对一辅导</p>
      </div>
      <div class="kind">
        <img src="/kind3.png" alt="" />
        <p>学习日历</p>
      </div>
    </div>
    <div class="space_box"></div>
    <van-notice-bar left-icon="volume-o" text="在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。" />

    <!-- 主要内容 -->
    <div class="main">
      <p class="title">
        <span>名师阵容</span>
      </p>
      <div
        v-for="item in topteacher"
        :key="item.teacher_id"
        class="topteacher"
        @click="topTeacherDetail(item.teacher_id)"
      >
        <img :src="item.teacher_avatar" alt="" />
        <div>
          <p>{{ item.teacher_name }}</p>
          <p>{{ item.introduction }}</p>
        </div>
      </div>

      <p class="title" @click="go">
        <span>热门资讯</span>
      </p>
      <div class="boutique">
        <div class="boutique_warpper" v-for="item in boutique" :key="item.id" @click="hotDetail(item.id)">
          <div class="boutique_left">
            <img :src="item.thumb_img" alt="" />
          </div>
          <div class="boutique_right">
            <p>
              {{ item.click_rate }}
            </p>
            <p class="p_height">{{ item.description }}</p>
            <b><p>{{ item.click_rate}}</p></b>
          </div>
        </div>
      </div>

      <p class="title">
        <span>明星讲师</span>
      </p>
      <div
        v-for="(item, index) in recommend"
        :key="index"
        class="topteacher"
        @click="topTeacherDetail(item.teacher_id)"
      >
        <img :src="item.teacher_avatar" alt="" />
        <div>
          <p>
            {{ item.teacher_name }} <span style="color: #eb8540">{{ item.level_name }}</span>
          </p>
          <p>{{ item.introduction }}</p>
        </div>
      </div>
    </div>
    <!-- 遮罩层 -->
    <van-overlay :show="overlay">
      <div class="overlay_wrap" @click.stop>
        <div class="overlay_block">
          <van-icon name="cross" class="cross" size="20" @click="overlay = false" />
          <img src="/feiji.decaf161.png" alt="" />
          <p style="font-size: 0.4rem">赶紧登录一下吧</p>
          <p style="color: gray; margin-bottom: 0.8rem">立即预约一对一辅导，浏览更多视频课程~</p>
          <van-button
            type="primary"
            block
            color="#EB6100"
            round
            style="width: 80%; height: 6vh; margin: 0 auto"
            @click="toLogin"
            >立即登录</van-button
          >
        </div>
      </div>
    </van-overlay>
  </div>
</template>
<script>
export default {
  data() {
    return {
      topteacher: [],
      boutique: [],
      recommend: [],
      starteacher: [],
      overlay: false
    }
  },
  created() {
    // 首页数据
    this.$http.homedata().then(res => {
      console.log(res)
      this.topteacher = res.data.data[0].list
      this.boutique = res.data.data[1].list
      this.recommend = res.data.data[2].list
    })
  },
  mounted() {},
  methods: {
    toCourse() {
      this.$router.push('/course')
    },
    // 名师阵容详情
    topTeacherDetail(id) {
      if (this.$store.state.token) {
        this.$router.push({ path: '/teacherdetail', query: { id: id } })
      } else {
        this.overlay = true
      }
    },
    // 去登陆
    toLogin() {
      this.$router.push('/login')
    },
    // 精品课程详情
    toCourseDetail(id) {
      this.$router.push({ path: '/coursedetail', query: { id: id } })
    },
    //热门资讯详情
    hotDetail(id) {
       if (this.$store.state.token) {
        this.$router.push({ path: '/hotdetail', query: { id: id } })
      } else {
        this.overlay = true
      }
    },
    go(){
      this.$router.push('/record')
    }
  }
}
</script>
<style lang="scss">
.wrapper {
  background-color: #f0f2f5;
  width: 100%;
  position: relative;
}
// 轮播图
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  height: 35vh;
  text-align: center;
  img {
    width: 100%;
    height: 100%;
    border-radius: 5px;
  }
}
.kinds {
  width: 100%;
  height: 20vh;
  position: absolute;
  top: 26vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .kind {
    width: 30%;
    height: 80%;
    background-color: white;
    border-radius: 10px;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
      width: 40px;
      height: 40px;
      margin-bottom: 8px;
    }
  }
}
.space_box {
  width: 100%;
  height: 13vh;
}
.main {
  width: 100%;
  height: 100%;
  padding: 0 3vw;
  box-sizing: border-box;
  // 标题
  .title {
    padding-left: 1vw;
    font-size: 0.4rem;
    color: gray;
    border-left: 3px solid red;
    align-items: center;
    box-sizing: border-box;
    margin: 3vh 0 2vh;
  }
  // 名师阵容
  .topteacher {
    width: 100%;
    height: 10vh;
    background-color: white;
    border-radius: 5px;
    margin-bottom: 2vh;
    display: flex;
    justify-content: space-around;
    align-items: center;
    img {
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
    }
    div {
      width: 80%;
      height: 100%;
      p {
        &:nth-child(1) {
          font-size: 0.4rem;
          line-height: 6vh;
        }
        &:nth-child(2) {
          height: 50%;
          font-size: 0.2rem;
          color: gray;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
  // 精品课程
  .boutique {
    width: 100%;
    height: 24vh;
    background-color: white;
    border-radius: 5px;
    margin-bottom: 2vh;
    .boutique_warpper {
      width: 100%;
      height: 45%;
      display: flex;
      padding: 5px 0px;
      align-items: center;
      justify-content: center;
      .boutique_left {
        width: 40%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding-right: 10px;
        img {
          width: 90%;
          height: 90%;
        }
      }
      .boutique_right {
        width: 55%;
        height: 90%;
        p{
          padding-bottom: 8px;
        }
        .p_height {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
}
// 遮罩层
.overlay_wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  .overlay_block {
    width: 75vw;
    height: 52vh;
    background-color: #fff;
    border-radius: 10px;
    position: relative;
    text-align: center;
    .cross {
      position: absolute;
      right: 2vw;
      top: 1vh;
    }
    img {
      width: 100%;
      height: 60%;
      margin-top: 2vh;
    }
  }
}
</style>