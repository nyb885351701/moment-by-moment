<template>
  <div class="wrapper">
    <van-nav-bar
      title="我的余额"
      left-text="返回"
      right-text="余额明细"
      left-arrow
      @click-left="toBack"
      @click-right="toBalanceDetail"
    />
    <div class="header">
      <p>我的余额</p>
      <p style="color: #dc692a; margin-left: 20px">{{ balance }}学习币</p>
    </div>
    <div class="main">
      <div v-for="item in list" :key="item.id" class="list" @click="check">
        <p>{{ item.coin }}学习币</p>
        <p style="color: #dc692a">￥{{ item.rmb }}</p>
      </div>
    </div>
    <div class="explain">
      <p style="font-weight: 700; font-size: 0.38rem">充值说明</p>
      <p>{{ explain.agreement }}</p>
    </div>
    <div style="height: 7vh"></div>
    <div :class="pay == true ? 'pay_t' : 'pay_f'" @click="buy">立即充值</div>
    <van-popup v-model="showpay" position="bottom" :style="{ height: '30%' }">
      <div class="popup">
        <p style="font-weight: 700; font-size: 0.38rem; margin-bottom: 20px">支付方式</p>
        <van-radio-group v-model="radio">
          <van-radio name="1"><img src="/wx.png" alt="" style="width: 0.7rem; height: 0.7rem" /> 微信</van-radio>
          <van-radio name="2"><img src="/zfb.png" alt="" style="width: 0.7rem; height: 0.7rem" /> 支付宝</van-radio>
        </van-radio-group>
      </div>
    </van-popup>
  </div>
</template>
<script>
export default {
  data() {
    return {
      balance: '',
      list: [],
      pay: false,
      explain: '',
      showpay: false,
      radio: ''
    }
  },
  mounted() {
    // this.$http.balance().then(res => {
    //   this.balance = res.data.data.balance
    // })
    // this.$http.balancelist().then(res => {
    //   this.list = res.data.data.list
    //   this.explain = res.data.data.coinInfo
    // })
  },
  methods: {
    toBack() {
      this.$router.go(-1)
    },
    // 余额明细
    toBalanceDetail() {},
    check() {
      this.pay = true
    },
    // 立即充值
    buy() {
      if (this.pay == true) {
        this.showpay = true
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.wrapper {
  background-color: #eeeeee;
  width: 100%;
}
.header {
  width: 100%;
  height: 8vh;
  background-color: white;
  padding: 0 4vw;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  font-size: 0.4rem;
}
.main {
  width: 100%;
  margin-top: 2vh;
  padding: 0 4vw;
  box-sizing: border-box;
  .list {
    width: 100%;
    height: 8vh;
    background-color: white;
    border-radius: 10px;
    padding: 0 4vw;
    box-sizing: border-box;
    margin-bottom: 2vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.38rem;
  }
  .list:hover {
    background: #fcede2;
    border: 0.26667vw solid #eb6100;
    box-shadow: 0 0.66667vw 0.66667vw 0 rgba(235, 97, 0, 0.75);
    border-radius: 2.13333vw;
  }
}
.pay_t {
  width: 100%;
  height: 7vh;
  line-height: 7vh;
  text-align: center;
  color: white;
  font-size: 0.4rem;
  position: fixed;
  bottom: 0;
  background-color: #eb6100;
  z-index: 999999;
}
.pay_f {
  width: 100%;
  height: 7vh;
  line-height: 7vh;
  text-align: center;
  color: white;
  font-size: 0.4rem;
  position: fixed;
  bottom: 0;
  background-color: #cccccc;
  z-index: 999999;
}
.explain,
.popup {
  width: 100%;
  background-color: white;
  padding: 4vw;
  box-sizing: border-box;
}
</style>