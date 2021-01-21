<template>
  <div v-show="isShowLoading" class="loading">
    <div class="loading_wrapper">
      <img src="https://img.zcool.cn/community/01deed576019060000018c1bd2352d.gif" alt="" />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isShowLoading: true
    }
  },
  methods: {
    close() {
      this.isShowLoading = false
    }
  }
}
</script>
<style lang="scss" scoped>
.loading {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  .loading_wrapper {
    width: 95px;
    margin: 300px auto;
    border-radius: 8px;
    height: 100px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 200px;
      height: 200px;
    }
  }
}
</style>