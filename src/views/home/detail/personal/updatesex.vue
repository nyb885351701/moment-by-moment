<template>
  <div class="wrapper">
    <van-nav-bar title="修改个人信息" right-text="保存" left-arrow @click-left="toBack" @click-right="save" />
    <div class="main">
      <van-radio-group v-model="sex">
        <van-cell-group>
          <van-cell title="男" clickable>
            <template #right-icon>
              <van-radio :name="1" />
            </template>
          </van-cell>
          <van-cell title="女" clickable>
            <template #right-icon>
              <van-radio :name="0" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      sex: ''
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
      this.$http.updateuser({ sex: this.sex }).then(res => {
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