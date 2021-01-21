<template>
  <div>
    <van-nav-bar title="约课记录" />
    <van-tabs v-model="active" @click="cut">
      <van-tab v-for="item in tab" :key="item.type" :title="item.title" :name="item.type">
        <van-empty v-if="list.length == 0" image="/no-message.png" :description="alt">
          <van-button v-if="item.type !== 3" type="danger" class="bottom-button" color="#EB6100" @click="yk"
            >立即约课</van-button
          >
        </van-empty>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pagenum: 1,
      pagesize: 10,
      type: 1,
      list: [],
      active: 0,
      tab: [
        { title: '待上课', type: 1 },
        { title: '已上课', type: 2 },
        { title: '已取消', type: 3 }
      ],
      alt: '还没有待上课记录哦'
    }
  },
  mounted() {
    this.$http.record({ limit: this.pagesize, page: this.pagenum, type: this.type }).then(res => {
      // console.log(res)
      this.list = res.data.data.list
    })
  },
  methods: {
    cut(name) {
      this.type = name
      this.$http.record({ limit: this.pagesize, page: this.pagenum, type: this.type }).then(res => {
        console.log(res)
        this.list = res.data.data.list
      })
      if (name == 1) {
        this.alt = '还没有待上课记录哦'
      } else if (name == 2) {
        this.alt = '还没有上课记录哦'
      } else if (name == 3) {
        this.alt = '还没有取消上课记录哦'
      }
    },
    // 立即约课
    yk() {
      this.$router.push('/specialcourses')
    }
  }
}
</script>
<style lang="scss">
.van-empty__image {
  width: 200px;
  height: 150px;
}
</style>