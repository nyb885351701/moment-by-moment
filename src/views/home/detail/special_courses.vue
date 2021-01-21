<template>
  <div class="wrapper">
    <van-nav-bar title="一对一辅导" left-arrow @click-left="toBack">
      <template #right>
        <van-icon name="search" size="18" />
      </template>
    </van-nav-bar>
    <van-dropdown-menu :overlay="false">
      <van-dropdown-item ref="date" title="选择上课时间">
        <div class="date"></div>
      </van-dropdown-item>
      <van-dropdown-item ref="con" title="选择老师条件">
        <div class="con"></div>
      </van-dropdown-item>
    </van-dropdown-menu>
    <div class="main">
      <div v-for="item in list" :key="item.teacher_id" class="box">
        <img :src="item.cover_img" alt="" />
        <div class="center">
          <p>{{ item.real_name }}</p>
          <p>{{ item.sex == 0 ? '男' : '女' }} {{ item.teach_age }}年教龄</p>
        </div>
        <div class="yy">预约</div>
      </div>
      <van-divider>没有更多了</van-divider>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pagenum: 1,
      pagesize: 10,
      list: []
    }
  },
  mounted() {
    this.$http.coath(this.pagenum, this.pagesize, 18).then(res => {
      console.log(res)
      this.list = res.data.data
    })
  },
  methods: {
    toBack() {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="scss" scoped>
.wrapper {
  width: 100%;
  height: 100vh;
  background-color: #f0f2f5;
}
.date,
.con {
  position: fixed;
  top: 14vh;
  width: 100%;
  height: 85.9vh;
  background-color: white;
}
.main {
  width: 100%;
  padding: 4vw;
  box-sizing: border-box;
  .box {
    display: flex;
    align-items: center;
    padding: 0 4vw;
    background: #fff;
    border-radius: 1.06667vw;
    height: 21.6vw;
    margin-top: 2.66667vw;
    img {
      width: 10.66667vw;
      height: 10.66667vw;
      margin-right: 3.2vw;
      border-radius: 50%;
      flex: none;
    }
    .center {
      flex: 1;
      p {
        &:nth-child(1) {
          padding-bottom: 0.8vw;
        }
        &:nth-child(2) {
          font-size: 3.2vw;
          color: #b7b7b7;
          line-height: 4.53333vw;
        }
      }
    }
    .yy {
      flex: none;
      width: 18.66667vw;
      height: 8.26667vw;
      line-height: 8.26667vw;
      background: #ebeefe;
      border-radius: 4.13333vw;
      font-size: 3.73333vw;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: #eb6100;
      border: none;
      text-align: center;
    }
  }
}
</style>