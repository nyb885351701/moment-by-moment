<template>
  <div>
    <van-nav-bar title="设置" left-arrow @click-left="toBack" />
    <div class="main">
      <van-cell title="设置密码" is-link />
      <van-button type="primary" block color="#EB6100" class="btn" @click="exit">退出登录</van-button>
    </div>
  </div>
</template>
<script>
import { Toast } from 'vant'
export default {
  data() {
    return {}
  },
  mounted() {},
  methods: {
    toBack() {
      this.$router.go(-1)
    },
    // 退出
    exit() {
      // localStorage.removeItem('token')
      this.$store.commit('out')
      this.$router.push('/home')
      Toast('退出成功！')
    }
  }
}
</script>
<style lang="scss" scoped>
.main {
  width: 100%;
  height: 33vh;
  background-color: white;
  margin-top: 2vh;
  padding: 2vh;
  box-sizing: border-box;
  .btn {
    margin-top: 13vh;
    border-radius: 5px;
  }
}
</style>