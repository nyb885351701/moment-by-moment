<template>
  <div class="div_body">
    <div class="div_container">
      <div class="div_containers">
        <div class="div_warpper">
          <span> 给我们留言 </span>
        </div>
        <div class="i_icon">
          <van-icon name="diamond" @click="goback" />
        </div>
      </div>
    </div>
    <div class="div_text">
      <div class="div_text1">您好，很抱歉我们暂时无法为您提供服务，如需帮助，请留言，我们将尽快联系并解决您的问题</div>
    </div>
    <span>电话：</span><br />
    <input type="text" placeholder="请输入" v-model="text" />
    <p v-show="a" class="div_color">内容不能为空</p>
    <p v-show="c" class="div_color">请正确填写手机号</p>
    <span>留言内容:</span>
    <textarea name="" id="" cols="30" rows="10" v-model="textaread"></textarea>
    <p v-show="b" class="div_color">字段不能为空</p>
    <button>提交</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      a: false,
      b: false,
      c: false,
      text: '',
      textaread: ''
    }
  },
  methods: {
    goback() {
      this.$router.go(-1) //返回上一层
    }
  },
  watch: {
    text: function (val) {
      var reg = /^1[3|4|5|7|8][0-9]{9}$/ //验证规则
      if (!reg.test(val)&&val!='') {
        this.c = true
      } else {
        this.c = false
      }
      this.text = val
      if (val === '') {
        this.a = true
      } else {
        this.a = false
      }
    },
    textaread: function (val) {
      if (val === '') {
        this.b = true
      } else {
        this.b = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.div_body {
  width: 100%;
  height: 600px;
  background-color: rgb(242, 243, 245);
}
.div_container {
  width: 100%;
  height: 60px;
  background-color: rgb(99, 137, 179);
  .div_containers {
    width: 90%;
    height: 100%;
    display: flex;
    align-items: center;
    margin: 0 auto;
    .div_warpper {
      width: 90%;
      height: 20px;
      span {
        color: white;
        font-size: 16px;
      }
    }
  }
}
.div_text {
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  .div_text1 {
    font-size: 14px;
    width: 90%;
    margin: 0 auto;
  }
}
input {
  background-color: rgb(255, 255, 255);
  width: 100%;
  height: 40px;
  border: none;
}
textarea {
  width: 100%;
  background-color: rgb(255, 255, 255);
  height: 100px;
  border: none;
}
button {
  width: 90%;
  height: 40px;
  background-color: skyblue;
  margin: 20px 15px;
  color: white;
  border: none;
}
.div_color {
  color: red;
}
</style>