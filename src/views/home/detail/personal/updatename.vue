<template>
  <div class="wrapper">
    <van-nav-bar title="修改个人信息" right-text="保存" left-arrow @click-left="toBack" @click-right="save" />
    <div class="main">
      <van-cell-group>
        <van-field v-model="name" />
      </van-cell-group>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: ''
    }
  },
  mounted() {
    this.name = this.$route.query.name
  },
  methods: {
    toBack() {
      this.$router.go(-1)
    },
    // 保存
    save() {
      this.$http.updateuser({ nickname: this.name }).then(res => {
        // console.log(res)
        this.$router.push('/pim')
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
  .main {
    margin-top: 2vh;
  }
}
</style>