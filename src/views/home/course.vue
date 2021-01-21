<template>
  <div class="wrapper">
    <div class="header">
      <van-nav-bar title="特色课" right-text="按钮" @click-right="search">
        <template #right>
          <van-icon name="search" size="20" />
        </template>
      </van-nav-bar>
      <van-dropdown-menu>
        <van-dropdown-item ref="item" title="分类">
          <div class="classify">
            <div class="bottom">
              <van-button type="default" class="btn" @click="reset">重置</van-button>
              <van-button type="default" color="#EB6100" class="btn" @click="affirm">确认</van-button>
            </div>
          </div>
        </van-dropdown-item>
        <van-dropdown-item :options="option2" title="排序" @change="changeSort"></van-dropdown-item>
        <van-dropdown-item ref="item2" title="筛选">
          <div class="filter">
            <span v-for="item in filtercourse" :key="item.type" @click="changFilter(item.type)">{{ item.name }}</span>
          </div>
        </van-dropdown-item>
      </van-dropdown-menu>
    </div>
    <div class="space"></div>
    <div class="main">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :immediate-check="false"
        offset="50"
        @load="onLoad"
      >
        <div v-for="item in courselist" :key="item.id" class="boutique" @click="toCourseDetail(item.id)">
          <div class="boutique_top">
            <p style="font-size: 0.4rem">{{ item.title }}</p>
            <p style="margin: 1vh 0 4vh">共{{ item.total_periods }}课时</p>
            <div class="boutique_top_teacher">
              <img
                :src="item.teachers_list[0].teacher_avatar"
                alt=""
                style="width: 0.8rem; height: 0.8rem; border-radius: 50%"
              />
              <p style="margin-left: 2vw">{{ item.teachers_list[0].teacher_name }}</p>
            </div>
            <div v-if="item.has_buy == 1" class="state">
              <img src="/has-buy.png" alt="" />
            </div>
          </div>
          <div class="boutique_bottom">
            <div style="color: gray">{{ item.sales_num }}人已报名</div>
            <div v-if="item.price < 1" style="color: #47a529; font-size: 0.4rem">免费</div>
            <div v-else style="color: red; font-size: 0.4rem">
              <van-icon name="points" color="#FFAE01" size="16" />{{ item.price / 100 + '.00' }}
            </div>
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      courselist: [],
      pagesize: 10,
      pagenum: 1,
      option2: [
        { text: '综合排序', value: 0 },
        { text: '最新', value: 1 },
        { text: '最热', value: 2 },
        { text: '价格从低到高', value: 4 },
        { text: '价格从高到低', value: 3 }
      ],
      loading: false,
      finished: false,
      filtercourse: [
        { name: '全部', type: 1 },
        { name: '大班课', type: 2 },
        { name: '公开课', type: 4 },
        { name: '面授课', type: 6 }
      ],
      coursetype: 0,
      classifyid: 0,
      orderby: 0,
      attr: [0, 0],
      isvip: 0,
      gradeid: 0,
      subjectid: 0
    }
  },
  mounted() {
    this.$http.courselist(this.pagenum, this.pagesize).then(res => {
      console.log(res)
      this.courselist = res.data.data.list
    })
  },
  methods: {
    search() {
      this.$router.push('search')
    },
    onLoad() {
      this.pagenum = this.pagenum + 1
      this.$http.courselist(this.pagenum, this.pagesize).then(res => {
        if (res.data.data.list.length == 0 || !res.data.data.list) {
          this.finished = true
        }
        this.courselist = this.courselist.concat(res.data.data.list)
        this.loading = false
      })
    },
    // 筛选
    changekind() {
      this.$http.coursefilter(this.pagenum, this.pagesize, this.coursetype, 0, this.orderby, this.attr, 0).then(res => {
        this.courselist = res.data.data.list
      })
    },
    // 年级
    changGrade(id) {
      this.gradeid = id
      this.attr = [this.gradeid, this.subjectid]
    },
    // 学科
    changSubject(id) {
      this.subjectid = id
      this.attr = [this.gradeid, this.subjectid]
    },
    // 筛选
    changFilter(id) {
      this.coursetype = id
      this.changekind()
      this.$refs.item2.toggle()
    },
    // 排序
    changeSort(id) {
      this.orderby = id
      this.changekind()
    },
    // 确认
    affirm() {
      this.changekind()
      this.$refs.item.toggle()
    },
    // 重置
    reset() {
      this.pagenum = 1
      this.pagesize = 10
      this.$http.courselist(this.pagenum, this.pagesize).then(res => {
        this.courselist = res.data.data.list
      })
      this.$refs.item.toggle()
    },
    toCourseDetail(id) {
      this.$router.push({ path: '/coursedetail', query: { id: id } })
    }
  }
}
</script>
<style lang="scss" scoped>
.wrapper {
  background-color: #f0f2f5;
}
.header {
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 99;
}
.space {
  height: 17vh;
}
.main {
  width: 100%;
  height: 100%;
  padding: 0 3vw;
  box-sizing: border-box;
  .boutique {
    width: 100%;
    height: 30vh;
    background-color: white;
    border-radius: 5px;
    margin-bottom: 2vh;
    .boutique_top {
      width: 100%;
      height: 23vh;
      padding: 2vh;
      box-sizing: border-box;
      position: relative;
      .boutique_top_teacher {
        display: flex;
        align-items: center;
      }
      .state {
        width: 2rem;
        height: 1.5rem;
        position: absolute;
        right: 4vw;
        top: 1.5rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .boutique_bottom {
      width: 100%;
      height: 7vh;
      border-top: 1px solid rgb(223, 219, 219);
      padding: 0 2vh;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
}
.classify {
  width: 100%;
  height: 10vh;
  background-color: white;
  .top,
  .center {
    width: 100%;
    height: 20vh;
    padding: 2vh;
    box-sizing: border-box;
    border-bottom: 1px solid rgb(228, 225, 225);
    div {
      width: 100%;
      height: 15vh;
      display: flex;
      flex-wrap: wrap;
      span {
        display: inline-block;
        margin: 2px 9px;
        width: 1.84rem;
        height: 0.88rem;
        background: #f5f5f5;
        border-radius: 0.08rem;
        font-size: 0.34667rem;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: #646464;
        text-align: center;
        line-height: 0.88rem;
        overflow: hidden;
      }
      span:hover {
        color: #eb6100;
        background: #ebeefe;
      }
    }
  }
  .bottom {
    width: 100%;
    height: 10vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2vh;
    box-sizing: border-box;
    .btn {
      width: 48%;
      height: 85%;
      border-radius: 5px;
    }
  }
}
.filter {
  width: 100%;
  height: 10vh;
  background-color: white;
  padding: 2vh;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  span {
    display: inline-block;
    margin: 2px 9px;
    width: 1.84rem;
    height: 0.88rem;
    background: #f5f5f5;
    border-radius: 0.08rem;
    font-size: 0.34667rem;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: #646464;
    text-align: center;
    line-height: 0.88rem;
    overflow: hidden;
  }
  span:hover {
    color: #eb6100;
    background: #ebeefe;
  }
}
</style>