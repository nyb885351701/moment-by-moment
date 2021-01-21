<template>
  <div class="wrapper">
    <van-nav-bar title="课程详情" left-arrow @click-left="goBack">
      <template #right>
        <van-icon name="cluster-o" size="18" />
      </template>
    </van-nav-bar>
    <div class="logo">
      <img :src="info.cover_img" alt="" />
    </div>
    <div class="info">
      <van-icon name="star-o" class="star" size="20" />
      <p style="width: 90%; font-size: 0.4rem">{{ info.title }}</p>
      <div v-if="info.price < 1" style="color: #eb6100; font-size: 0.45rem; margin: 2vh 0">免费</div>
      <div v-else style="color: red; font-size: 0.45rem; margin: 2vh 0">
        <van-icon name="points" color="#FFAE01" size="16" />{{ info.price / 100 + '.00' }}
      </div>
      <p style="color: gray; font-size: 0.4rem">共{{ info.total_periods }}课时 | {{ info.sales_num }}人已报名</p>
    </div>
    <div class="team">
      <p style="font-size: 0.4rem">教学团队</p>
      <div class="teach">
        <div v-for="item in teachers" :key="item.teacher_id">
          <img :src="item.avatar" alt="" />
          <p style="font-size: 0.35rem">{{ item.teacher_name }}</p>
        </div>
      </div>
    </div>
    <div class="introduce">
      <p style="font-size: 0.4rem">课程介绍</p>
      <div style="font-size: 0.38rem" v-html="info.course_details"></div>
    </div>
    <div class="outline">
      <p style="font-size: 0.4rem">课程大纲</p>
      <div style="color: gray" v-html="info.course_details"></div>
    </div>
    <div class="comment">
      <p style="font-size: 0.4rem">课程评论</p>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :immediate-check="false"
        offset="50"
        @load="onLoad"
      >
        <div v-for="item in comment" :key="item.id" class="comment_list">
          <div class="head">
            <img :src="item.avatar" alt="" />
          </div>
          <div class="content">
            <p style="font-size: 0.4rem">
              {{ item.nickname }}<van-rate v-model="item.grade" readonly size="14" gutter="1" />
            </p>
            <p style="color: gray">{{ item.content }}</p>
          </div>
          <div class="time" style="color: gray">{{ item.created_at | formatTime }}</div>
        </div>
      </van-list>
    </div>
    <van-button type="primary" block class="apply" color="#E60012" round @click="apply">立即报名</van-button>
  </div>
</template>
<script>
export default {
  filters: {
    formatTime(curTime) {
      if (!curTime) {
        return ''
      }
      let nd = new Date(curTime * 1000)
      let y = nd.getFullYear()
      let mm = nd.getMonth() + 1
      let d = nd.getDate()
      let h = nd.getHours()
      let m = nd.getMinutes()
      if (mm < 10) {
        mm = '0' + mm
      }
      if (d < 10) {
        d = '0' + d
      }
      if (h < 10) {
        h = '0' + h
      }
      if (m < 10) {
        m = '0' + m
      }
      return y + '-' + mm + '-' + d + ' ' + h + ':' + m
    }
  },
  data() {
    return {
      info: {},
      teachers: [],
      pagesize: 10,
      pagenum: 1,
      comment: [],
      loading: false,
      finished: false
    }
  },
  mounted() {
    this.$http.coursedetail(this.$route.query.id).then(res => {
      console.log(res)
      this.info = res.data.data.info
      this.teachers = res.data.data.teachers
    })
    // 课程评论
    this.$http.coursecomment({ id: this.$route.query.id, limit: this.pagesize, page: this.pagenum }).then(res => {
      console.log(res)
      this.comment = res.data.data.list
    })
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    // 上拉加载
    onLoad() {
      console.log(1)
    },
    // 立即报名
    apply() {
      // console.log(this.info)
      this.$router.push({ path: '/order', query: { info: this.info } })
    }
  }
}
</script>
<style lang="scss" scoped>
.wrapper {
  width: 100%;
  background-color: #f0f2f5;
}
.logo {
  width: 100%;
  height: 30vh;
  img {
    width: 100%;
    height: 100%;
  }
}
.info {
  width: 100%;
  height: 20vh;
  position: relative;
  background-color: white;
  padding: 2vh 3vw;
  margin-bottom: 2vh;
  box-sizing: border-box;
  .star {
    position: absolute;
    right: 2vw;
    top: 1vh;
  }
}
.team {
  width: 100%;
  height: 20vh;
  padding: 2vh;
  background-color: white;
  box-sizing: border-box;
  margin-bottom: 2vh;
  p {
    line-height: 4.5vh;
  }
  .teach {
    width: 100%;
    height: 80%;
    display: flex;
    align-items: center;
    div {
      width: 20%;
      height: 100%;
      text-align: center;
      img {
        width: 70%;
        height: 55%;
        border-radius: 50%;
      }
      p {
        line-height: 2vh;
        font-size: 0.5rem;
      }
    }
  }
}
.introduce {
  width: 100%;
  height: 13vh;
  background-color: white;
  margin-bottom: 2vh;
  padding: 2vh;
  box-sizing: border-box;
}
.outline {
  width: 100%;
  height: 18vh;
  background-color: white;
  margin-bottom: 2vh;
  padding: 2vh;
  box-sizing: border-box;
}
.apply {
  position: fixed;
  bottom: 0;
}
.comment {
  width: 100%;
  background-color: white;
  margin-bottom: 2vh;
  padding: 2vh;
  box-sizing: border-box;
  margin-bottom: 5vh;
}
.comment_list {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 2vh 0;
  .head {
    width: 15%;
    height: 100%;
    img {
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
    }
  }
  .content {
    width: 55%;
    height: 100%;
    p {
      line-height: 0.6rem;
      &:nth-child(1) {
        display: flex;
        align-items: center;
      }
    }
  }
  .time {
    width: 30%;
    height: 100%;
  }
}
</style>