<template>
  <div class="wrapper">
    <div class="logo">
      <img src="/logo.png" alt="" />
    </div>
    <div class="from">
      <van-form>
        <van-field
          v-model="mobile"
          type="text"
          name="用户名"
          placeholder="请输入手机号"
          :rules="[{ required: true, message: '请填写手机号' }]"
        >
          <template #button>
            <van-button v-if="getcode" size="small" type="primary" @click="getCode">获取验证码</van-button>
            <van-button v-else size="small" type="primary" disabled @click="getCode">获取验证码{{ second }}</van-button>
          </template>
        </van-field>
        <van-field
          v-model="code"
          type="text"
          name="验证码"
          placeholder="请输入短信验证码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div class="others">
          <p>*未经注册的手机号将自动注册</p>
          <p @click="toLogin">使用密码登录</p>
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
      mobile: '',
      code: '',
      getcode: true,
      second: ''
    }
  },
  mounted() {},
  methods: {
    toLogin() {
      this.$router.push('/login')
    },
    // 获取验证码
    getCode() {
      if (this.mobile.trim() == '') {
        return
      }
      clearInterval(timer)
      this.getcode = false
      this.second = 60
      let timer = setInterval(() => {
        if (this.second == 0) {
          this.getcode = true
          clearInterval(timer)
          return
        } else {
          this.second--
        }
        console.log(this.second)
      }, 1000)
      this.$http.securitycode({ mobile: this.mobile, sms_type: 'login' }).then(res => {
        console.log(res)
      })
    },
    // 登录
    login() {
      this.$http.login({ mobile: this.mobile, sms_code: this.code, type: 2 }).then(res => {
        console.log(res)
        if (res.data.code == 200) {
          localStorage.setItem('token', res.data.data.remember_token)
          this.$router.push('/my')
        } else {
          Toast.fail(res.data.msg)
        }
      })
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