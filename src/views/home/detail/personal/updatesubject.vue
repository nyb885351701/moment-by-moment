<template>
  <div class="wrapper">
    <van-nav-bar title="修改个人信息" right-text="保存" left-arrow @click-left="toBack" @click-right="save" />
    <div class="main">
      <van-checkbox-group v-model="result" @change="updateCity">
        <van-cell v-for="item in list" :key="item.id">
          <van-checkbox :name="item.id" shape="square">{{ item.name }}</van-checkbox>
        </van-cell>
      </van-checkbox-group>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      result: [],
      list: [
        { name: '语文', id: 7 },
        { name: '数学', id: 8 },
        { name: '英语', id: 9 },
        { name: '物理', id: 12 },
        { name: '化学', id: 13 },
        { name: '生物', id: 24 },
        { name: '政治', id: 25 },
        { name: '信息技术', id: 26 }
      ],
      attr: []
    }
  },
  mounted() {},
  methods: {
    toBack() {
      this.$router.go(-1)
    },
    // 修改地址
    updateCity(res) {
      let val = []
      res.forEach(i => {
        val.push({ attr_id: 2, attr_val_id: i })
      })
      this.attr = val
      console.log(this.attr)
    },
    // 保存
    save() {
      this.$http.updateuser({ user_attr: JSON.stringify(this.attr) }).then(res => {
        console.log(res)
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