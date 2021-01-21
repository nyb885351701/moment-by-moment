<template>
  <div class="wrapper">
    <div class="header">
      <div class="header_top">
        <van-icon name="arrow-left" color="white" size="20" @click="goBack" />
        <div style="font-size: 0.45rem; color: white">讲师详情</div>
        <div></div>
      </div>
      <div class="header_bottom">
        <div class="tx"><img :src="iao.avatar" alt="" /></div>
        <div class="name">
          <p>
            {{ iao.real_name }} <span>{{ iao.level_name }}</span>
          </p>
          <p>{{ iao.sex == 0 ? '男' : '女' }} {{ iao.teach_age }}年教龄</p>
        </div>
        <div class="gz">
          <button v-if="flag == 2" class="btn_gz" @click="concern(iao.id)">关注</button>
          <p v-else style="font-size: 0.4rem; color: #b7b7b7" @click="concern(iao.id)">已关注</p>
        </div>
      </div>
    </div>
    <div class="main">
      <van-tabs v-model="active">
        <van-tab title="讲师介绍">
          <div v-for="(item, index) in attr" :key="index" class="box1">
            <p>{{ item.attr_name }}</p>
            <p>{{ item.attr_value[0].attr_value_name }}</p>
          </div>
          <div class="box2">
            <p>老师简介</p>
            <p style="line-height: 0.75rem">{{ intro }}</p>
          </div>
        </van-tab>
        <van-tab title="主讲课程">内容2</van-tab>
        <van-tab title="学员评价">内容3</van-tab>
      </van-tabs>
    </div>
    <van-button type="primary" block class="make" color="#EB6100">立即预约</van-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      iao: '',
      attr: [],
      intro: '',
      active: 0,
      flag: ''
    }
  },
  mounted() {
    // 讲师详情信息
    this.$http.teacherdetail(this.$route.query.id).then(res => {
      this.iao = res.data.data.teacher
      console.log(this.iao)
      this.flag = res.data.data.flag
    })
    // 讲师介绍
    this.$http.teacherinfo(this.$route.query.id).then(res => {
      // console.log(res)
      this.attr = res.data.data.attr
      this.intro = res.data.data.intro
    })
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    // 关注
    concern(id) {
      this.$http.gz(id).then(res => {
        this.flag = res.data.data.flag
      })
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
.header {
  width: 100%;
  height: 15vh;
  background: linear-gradient(to bottom, #62b4fc, #4e7ee3);
  position: relative;
  .header_top {
    width: 100%;
    height: 6vh;
    padding: 0 3vw;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .header_bottom {
    width: 95%;
    height: 14vh;
    border-radius: 6px;
    background-color: white;
    position: absolute;
    bottom: -5vh;
    left: 50%;
    transform: translateX(-50%);
    padding: 0 3vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    .tx {
      width: 15%;
      height: 100%;
      display: flex;
      align-items: center;
      img {
        width: 1.2rem;
        height: 1.2rem;
        border-radius: 50%;
      }
    }
    .name {
      width: 60%;
      height: 100%;
      display: flex;
      justify-content: center;
      flex-direction: column;
      p {
        line-height: 0.7rem;
        text-indent: 10px;
        &:nth-child(1) {
          font-size: 0.4rem;
          span {
            color: #ef8f2f;
          }
        }
        &:nth-child(2) {
          color: gray(196, 191, 191);
        }
      }
    }
    .gz {
      width: 25%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      .btn_gz {
        width: 16.53333vw;
        height: 7.46667vw;
        background: #ebeefe;
        border-radius: 4.13333vw;
        font-size: 3.46667vw;
        color: #eb6100;
        border: 0;
      }
    }
  }
}
.main {
  width: 100%;
  background-color: white;
  margin-top: 7vh;
  padding: 0 4vw;
  box-sizing: border-box;
  .box1 {
    width: 100%;
    height: 7vh;
    display: flex;
    align-items: center;
    p {
      font-size: 0.36rem;
      color: gray;
      &:nth-child(1) {
        width: 25%;
      }
      &:nth-child(2) {
        width: 75%;
      }
    }
  }
  .box2 {
    width: 100%;
    display: flex;
    p {
      font-size: 0.36rem;
      color: gray;
      &:nth-child(1) {
        width: 25%;
      }
      &:nth-child(2) {
        width: 75%;
      }
    }
  }
}
.make {
  position: fixed;
  bottom: 0;
}
</style>