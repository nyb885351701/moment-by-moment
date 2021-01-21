<template>
  <div class="wrapper">
    <van-nav-bar title="我的关注" left-arrow @click-left="toBack" />
    <van-empty v-if="list.length == 0" class="custom-image" image="/empty.png" description="暂无关注" />
    <div v-else class="main">
      <div v-for="item in list" :key="item.teacher_id" class="list">
        <img :src="item.avatar" alt="" />
        <div class="info">
          <p style="font-size: 0.4rem">
            {{ item.teacher_name }} <span style="font-size: 0.35rem; color: #ea7a2f">{{ item.level_name }}</span>
          </p>
          <p class="ms">{{ item.introduction }}</p>
        </div>
        <p class="btn" @click="cancel(item.collect_id)">取消关注</p>
      </div>
      <van-divider>没有更多了</van-divider>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [],
      pagenum: 1,
      pagesize: 10,
      type: 2
    }
  },
  mounted() {
    this.$http.concern(this.pagenum, this.pagesize, this.type).then(res => {
      // console.log(res)
      this.list = res.data.data.list
    })
  },
  methods: {
    toBack() {
      this.$router.go(-1)
    },
    cancel(id) {
      this.$http.unfollow(id, this.type).then(res => {})
      this.$http.concern(this.pagenum, this.pagesize, this.type).then(res => {
        this.list = res.data.data.list
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.wrapper {
  width: 100%;
  height: 100vh;
}
.main {
  width: 100%;
  padding: 0 4vw;
  margin-top: 2vh;
  box-sizing: border-box;
  .list {
    background-color: #fff;
    padding: 2.66667vw;
    margin-bottom: 2.66667vw;
    border-radius: 1.33333vw;
    position: relative;
    display: flex;
    align-items: center;
    img {
      width: 10.66667vw;
      height: 10.66667vw;
    }
    .info {
      margin-left: 2.66667vw;
      line-height: 6.66667vw;
      .ms {
        font-size: 3.2vw;
        color: #b7b7b7;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 53.33333vw;
      }
    }
    .btn {
      position: absolute;
      top: 50%;
      right: 4vw;
      transform: translateY(-50%);
      font-size: 3.46667vw;
      color: #eb6100;
      text-align: center;
      width: 20.26667vw;
      height: 7.46667vw;
      line-height: 7.46667vw;
      background: rgba(235, 97, 0, 0.1);
      border-radius: 4.13333vw;
    }
  }
}
</style>