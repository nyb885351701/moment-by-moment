<template>
  <div class="div_container">
    <img :src="list.thumb_img" alt="">
    <p>{{list.title}}</p>
    <p>{{list.click_rate}}</p>
    <p>{{list.description}}</p>
    <div class="div_warpper" v-html="list.content"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list:[]
    }
  },
  mounted() {
      console.log(this.$route.query.id)
      this.$http.hotdetail(this.$route.query.id).then(res => {
       console.log(res)
        this.list = res.data.data
    })
  },
}
</script>

<style lang="scss" scoped>
.div_container{
  width: 100%;
  height: 100%;
  img{
    width: 100%;
    height: 250px;
  }
  p{
    padding-bottom: 10px;
  }
  .div_warpper{
    font-size:18px;
  }
}
</style>