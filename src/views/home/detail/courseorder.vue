<template>
  <div class="wrapper">
    <van-nav-bar title="订单" left-arrow @click-left="toBack" />
    <van-tabs v-model="active">
      <van-tab v-for="item in cate" :key="item.status" :title="item.name" @click="cut"></van-tab>
    </van-tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: 0,
      cate: [
        { name: '全部订单', status: 0 },
        { name: '待支付', status: 1 },
        { name: '交易完成', status: 2 },
        { name: '交易关闭', status: 3 }
      ]
    }
  },
  mounted() {},
  methods: {
    toBack() {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="scss" scoped>
</style>