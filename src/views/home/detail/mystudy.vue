<template>
  <div>
    <van-nav-bar title="我的学习" left-arrow @click-left="toBack">
      <template #right>
        <van-icon name="notes-o" size="18" />
      </template>
    </van-nav-bar>
    <van-tabs @change="cut">
      <van-tab v-for="item in typeNum" :key="item.type" :title="item.name + '(' + item.num + ')'" :name="item.type">
        <div class="item_wrap">
          <div v-for="items in list" :key="items.course_id" class="item">
            <p class="title">{{ items.title }}</p>
            <div class="time">
              <img src="tiem.png" alt="" />
              <p>{{ items.start_play_date | formatTime }} ~ {{ items.end_play_date | formatTime }}</p>
              <p style="margin: 0 0.2rem">|</p>
              <p>共{{ items.section_num }}课时</p>
            </div>
            <div class="progress">
              <div><van-progress :percentage="0" /></div>
              <p>已学习0%</p>
            </div>
          </div>
        </div>
      </van-tab>
    </van-tabs>
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
      type: 2,
      typeNum: [],
      list: []
    }
  },
  mounted() {
    this.$http.mystudy(this.type).then(res => {
      console.log(res)
      this.typeNum = res.data.data.typeNum
      this.list = res.data.data.courseList
    })
  },
  methods: {
    toBack() {
      this.$router.go(-1)
    },
    // 切换
    cut(val) {
      this.type = val
      this.$http.mystudy(this.type).then(res => {
        console.log(res)
        this.typeNum = res.data.data.typeNum
        this.list = res.data.data.courseList
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.item_wrap {
  padding: 2vh 4vw;
  box-sizing: border-box;
}
.item {
  background-color: #fff;
  border-radius: 1.33333vw;
  padding: 6vw 3.73333vw;
  margin-bottom: 4vw;
  position: relative;
  box-shadow: 0 0 2vw rgba(0, 0, 0, 0.1);
  .title {
    font-size: 4.26667vw;
    font-weight: 400;
    color: #333;
    vertical-align: top;
  }
  .time {
    margin-bottom: 8vw;
    font-size: 3.2vw;
    font-weight: 400;
    color: #666;
    margin-top: 2.66667vw;
    display: flex;
    align-items: center;
    img {
      width: 0.4rem;
      height: 0.4rem;
    }
  }
  .progress {
    display: flex;
    align-items: center;
    div {
      width: 70%;
    }
    p {
      width: 30%;
    }
  }
}
</style>