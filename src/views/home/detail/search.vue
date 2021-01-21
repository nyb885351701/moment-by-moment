<template>
  <div>
    <form action="/">
      <van-search
        :autofocus="true"
        shape="round"
        v-model="search_value"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @input="estimate"
      />
    </form>
    <div class="search_history" v-if="isShow">
      <p><span>搜索历史</span> <van-icon name="delete-o" @click="clear_search_history" /></p>
      <div v-if="search_history_list.length != 0" class="search_history_list">
        <van-tag
          class="tags"
          v-for="(item, index) in search_history_list"
          :key="index"
          closeable
          size="large"
          type="primary"
          round
          @close="close(item)"
          @click="search(item)"
        >
          {{ item }}
        </van-tag>
      </div>

      <van-empty v-else description="暂无搜索记录" />
    </div>
    <div class="search_history" v-else>
      <van-empty v-if="show" description="没有相关数据" />
      <div v-else v-for="item in search_list" :key="item.id" class="topteacher">
        <img :src="item.cover_img" />
        <div>
          <p>{{ item.title }}</p>
          <p>
            {{ item.sales_num }}人报名 <span v-if="item.price == 0" class="price">免费</span>
            <span v-else style="color: red">{{ item.price }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant'

export default {
  data() {
    return {
      search_value: '',
      isShow: true,
      search_list: [],
      show: false,
      search_history_list: []
    }
  },

  //方法
  methods: {
    close(item) {
      // console.log(item)
      this.$store.commit('remove_search_history', item)
      Toast('已删除')
    },
    search(item) {
      this.search_value = item
      this.onSearch()
      this.isShow = false
    },
    clear_search_history() {
      this.$store.commit('clear_search_history')
      this.search_history_list = this.$store.state.search_history_list
      Toast('已清除')
    },
    estimate() {
      if (this.search_value != '') {
        this.isShow = false
      } else {
        this.isShow = true
        this.search_list = ''
        this.show = false
      }
    },
    onSearch() {
      if (this.search_value != '') {
        this.$http
          .courselist('', 10, this.search_value, 0)
          .then(res => {
            Toast(res.data.msg)
            this.search_list = res.data.data.list
            if (this.search_list.length == 0) {
              this.show = true
            } else {
              this.$store.commit('add_search_history', this.search_value)
              this.show = false
            }
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        Toast('搜索内容不能为空！')
      }

      // Toast(val)
    },
    onCancel() {
      Toast('取消')
      this.$router.push('/home')
    }
  },

  //挂载后生命周期函数
  mounted() {
    this.search_history_list = this.$store.state.search_history_list
  }
}
</script>

<style lang="scss" scoped>
.price {
  float: right;
  color: green;
}
.search_history {
  padding: 4vh 5vw;
  height: auto;
  p {
    font-size: 15px;
    font-weight: bold;
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  .topteacher {
    width: 100%;
    height: 10vh;
    background-color: white;
    border-radius: 5px;
    margin-bottom: 2vh;
    display: flex;
    justify-content: space-around;
    align-items: center;
    img {
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
    }
    div {
      width: 80%;
      height: 100%;
      p {
        &:nth-child(1) {
          font-size: 0.4rem;
          line-height: 6vh;
        }
        &:nth-child(2) {
          height: 50%;
          font-size: 0.2rem;
          color: gray;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
  .search_history_list {
    margin-top: 4vh;
    width: 100vw;
    height: auto;
    display: flex;
    justify-content: flex-start;
    justify-items: center;
    flex-flow: wrap;
    .tags {
      margin-top: 1vh;
      margin-left: 3vw;
      height: 2vh;
      background-color: rgb(201, 194, 194);
    }
  }
}
</style>