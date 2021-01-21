<template>
  <div>
    <van-nav-bar title="图书" />
    <van-tabs v-model="active">
      <van-tab title="按时间"></van-tab>
      <van-tab title="按热度"></van-tab>
      <van-tab title="按价格"></van-tab>
    </van-tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: 0
    }
  }
}
</script>
<style lang="scss">
</style>