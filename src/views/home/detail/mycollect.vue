<template>
  <div>
    <van-nav-bar title="我的收藏" left-arrow @click-left="toBack" />
    <van-empty v-if="list.length == 0" class="custom-image" image="/empty.png" description="暂无收藏" />
    <div v-else>
      <van-divider>没有更多了</van-divider>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: []
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