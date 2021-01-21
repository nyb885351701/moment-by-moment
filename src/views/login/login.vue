<template>
  <div class="wrapper">
    <div class="logo">
      <img src="/logo.png" alt="" />
    </div>
    <div class="from">
      <van-form>
        <van-field
          v-model="mobile"
          name="用户名"
          placeholder="请输入手机号"
          :rules="[{ required: true, message: '请填写手机号' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div class="others">
          <p>找回密码</p>
          <p @click="toRegister">注册/验证码登录</p>
        </div>
        <div style="margin: 16px">
          <van-button
            round
            block
            type="info"
            native-type="submit"
            color="linear-gradient(to right, #FF944B, #FC5500)"
            @click="login"
            >登录</van-button
          >
        </div>
      </van-form>
    </div>
  </div>
</template>
<script>
import { Toast } from 'vant'
export default {
  data() {
    return {
      mobile: 15810195203,
      password: 6666666666
    }
  },
  mounted() {},
  methods: {
    // 登录
    login() {
      this.$http.login({ mobile: this.mobile, password: this.password, type: 1 }).then(res => {
        Toast(res.data.msg)
        if (res.data.code === 200) {
          // localStorage.setItem('token', res.data.data.remember_token)
          this.$store.commit('login', { token: res.data.data.remember_token })
          this.$router.push('/home')
        } else {
          Toast.fail(res.data.msg)
        }
      })
    },
    toRegister() {
      this.$router.push('/register')
    }
  }
}
</script>
<style lang="scss" scoped>
.wrapper {
  width: 100vw;
  height: 100vh;
  background-color: white;
}
.logo {
  width: 100%;
  height: 25vh;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 70%;
    height: 35%;
  }
}
.from {
  width: 90vw;
  margin: 0 auto;
  .others {
    width: 100%;
    height: 5vh;
    padding: 0 3vw;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    p {
      color: gray;
    }
    margin-bottom: 5vh;
  }
}
</style>