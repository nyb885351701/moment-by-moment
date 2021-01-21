<template>
  <div class="wrapper">
    <van-nav-bar title="确认订单" left-arrow @click-left="toBack" />
    <div class="main">
      <div class="info">
        <div class="title">
          <div>
            <p class="p1">{{ type }}</p>
            <p class="p2">{{ info.title }}</p>
          </div>
          <p class="price">{{ info.price }}</p>
        </div>
        <p class="time">共{{ info.section_num }}课时</p>
      </div>
      <van-cell title="优惠券" :value="info.has_coupon == 0 ? '无可用' : info.has_coupon + '元'" size="large" />
      <div class="count">
        <p>
          <span>商品金额</span>
          <span>{{ info.price }}</span>
        </p>
        <p>
          <span>优惠券金额</span>
          <span>-{{ info.has_coupon }}</span>
        </p>
        <p>
          <span>合计</span>
          <span style="color: #e02020">{{ count }}</span>
        </p>
      </div>
    </div>
    <van-submit-bar :price="count * 100" button-text="提交订单" label="实付价格：" @submit="onSubmit" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      info: '',
      type: '',
      count: ''
    }
  },
  mounted() {
    console.log(this.$route.query.info)
    let _id = this.$route.query.info.id
    let type = this.$route.query.info.course_type
    this.$http.order({ group_id: 0, product_number: 1, shop_id: _id, spell_id: '', type: type }).then(res => {
      console.log(res)
      if (res.data.data.info.course_type == 1) {
        this.type = '一对一'
      } else if (res.data.data.info.course_type == 2) {
        this.type = '大班课'
      } else if (res.data.data.info.course_type == 7) {
        this.type = '面授课'
      } else if (res.data.data.info.course_type == 4) {
        this.type = '公开课'
      }
      this.info = res.data.data.info
      this.count = res.data.data.info.price - res.data.data.info.has_coupon
    })
  },
  methods: {
    toBack() {
      this.$router.go(-1)
    },
    onSubmit() {}
  }
}
</script>
<style lang="scss">
.wrapper {
  width: 100%;
  height: 100vh;
  background-color: #f0f2f5;
  .main {
    padding: 0 4vw;
    box-sizing: border-box;
  }
}
.info {
  background: #fff;
  border-radius: 2.66667vw;
  margin: 2.66667vw 0;
  padding: 3.2vw 4vw;
  box-sizing: border-box;
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .p1 {
      display: inline-block;
      font-size: 2.4vw;
      padding: 1.06667vw 1.33333vw;
      background: #fdf3eb;
      border-radius: 0.53333vw;
      color: #ea7a2f;
      margin-right: 1.6vw;
      vertical-align: 0.8vw;
    }
    .p2 {
      display: inline;
      line-height: 5.6vw;
      font-size: 3.73333vw;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.85);
      vertical-align: bottom;
    }
  }
  .price {
    flex: none;
    font-size: 4.26667vw;
    font-weight: 400;
    color: #ee1f1f;
    line-height: 5.6vw;
  }
  .time {
    font-size: 3.2vw;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.45);
    line-height: 5.86667vw;
    padding-top: 2.66667vw;
  }
}
.count {
  margin-top: 2.66667vw;
  background: #fff;
  padding: 4vw;
  border-radius: 2.66667vw;
  p {
    font-size: 3.46667vw;
    font-weight: 400;
    line-height: 5.86667vw;
    display: flex;
    justify-content: space-between;
    .s1 {
      font-size: 3.46667vw;
      font-weight: 400;
      color: #595959;
      line-height: 5.86667vw;
    }
  }
}
</style>