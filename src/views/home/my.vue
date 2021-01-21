<template>
  <div class="my">
    <!-- 头部 -->
    <div class="header">
      <div class="bg">
        <div class="content">
          <div class="top" v-if="$store.state.token">
            <img :src="info.avatar" alt="" @click="$router.push('/pim')" />
            <span style="font-size: 16px">158***5203</span>
            <van-icon name="records" color="orange" size="30" @click="$router.push('/pim')" />
            <span>去约课</span>
          </div>
          <div class="top" v-if="!$store.state.token" @click="$router.push('/login')">
            <img src="http://120.53.31.103:86/img/avatar.71c6d2b4.png" alt="" @click="$router.push('/pim')" />
            <p style="font-size: 16px">去登录</p>
          </div>

          <ul class="bottom">
            <li v-for="(item, index) in header" :key="index" @click="goTo(item.url)">
              <p>{{ item.num }}</p>
              <p>{{ item.title }}</p>
              <p>{{ item.info }}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 广告 -->
    <van-notice-bar left-icon="volume-o" text="在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。" />
    <div class="main">
      <div class="class" v-for="(item, index) in nav" :key="index">
        <h4>{{ item.title }}</h4>
        <ul class="nav">
          <li v-for="(list, index) in item.present" :key="index" @click="goTo(list.url)">
            <p><van-icon :name="list.icon" /></p>
            <p>{{ list.info }}</p>
          </li>
        </ul>
        <van-divider />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: '',
      centerinfo: '',
      showyq: false,
      header: [
        {
          num: 0,
          title: '我的特色课',
          info: '已购特色课程',
          url: '/mystudy'
        },
        {
          num: 0,
          title: '一对一辅导',
          info: '我的一对一老师辅导',
          url: '/record'
        },
        {
          num: 0.0,
          title: '剩余学习币',
          info: '查看剩余学习币',
          url: '/mybalance'
        }
      ],
      nav: [
        {
          title: '课程相关',
          present: [
            {
              icon: 'friends-o',
              info: '关注的老师',
              url: '/myconcern'
            },
            {
              icon: 'star-o',
              info: '我的收藏',
              url: 'mycollect'
            }
          ]
        },
        {
          title: '订单相关',
          present: [
            {
              icon: 'notes-o',
              info: '课程订单',
              url: '/courseorder'
            },
            {
              icon: 'notes-o',
              info: '会员订单'
            },
            {
              icon: 'notes-o',
              info: '约课订单'
            }
          ]
        },
        {
          title: '我的账户',
          present: [
            {
              icon: 'gift-card-o',
              info: '优惠券'
            },
            {
              icon: 'coupon-o',
              info: '学习卡'
            },
            {
              icon: 'vip-card-o',
              info: '会员'
            }
          ]
        },
        {
          title: '自助服务',
          present: [
            {
              icon: 'comment-o',
              info: '我的消息'
            },
            {
              icon: 'question-o',
              info: '意见反馈'
            },
            {
              icon: 'smile-o',
              info: '在线客服'
            },
            {
              icon: 'setting-o',
              info: '设置',
              url: '/set'
            }
          ]
        }
      ]
    }
  },

  mounted() {
    // 获取用户信息
    this.$http.userinfo().then(res => {
      this.info = res.data.data
    })
    this.$http.getcenterinfo().then(res => {
      this.centerinfo = res.data.data
    })
  },
  methods: {
    goTo(url) {
      this.$router.push(url)
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  height: 5rem;
  .bg {
    border-top: 1px solid white;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    height: 100px;
    background: url(https://wap.365msmk.com/img/user_bg.ab306a5c.png) center no-repeat;
    .content {
      width: 95%;
      height: 180px;
      margin: auto;
      background: white;
      margin-top: 40px;
      border-radius: 5px;
      box-shadow: 1px 2px 3px 1px #ccc;
      //头-顶部
      .top {
        display: flex;
        align-items: center;
        img {
          width: 95px;
          height: 95px;
          margin: 5px 13px;
          border-radius: 5px;
        }
        // 约课
        span:nth-last-child(1) {
          text-align: center;
          padding: 8px 15px 8px 10px;
          color: white;
          margin-left: 60px;
          background: #eb6100;
          border-top-left-radius: 10px;
          border-bottom-left-radius: 10px;
        }
      }
      // 头-底部
      .bottom {
        display: flex;
        justify-content: space-around;
        align-items: center;
        li {
          p {
            text-align: center;
            margin: 5px 0;
          }
          p:nth-child(1) {
            color: #eb6100;
            font-size: 20px;
          }
          p:nth-child(2) {
            font-size: 16px;
          }
          p:nth-child(3) {
            color: #ccc;
          }
        }
      }
    }
  }
}
// 广告
.van-notice-bar {
  top: 40px;
}
//主体
.main {
  width: 95%;
  margin-top: 50px;
  padding-bottom: 50px;
  h4 {
    font-size: 18px;
    margin-left: 20px;
  }
  .nav {
    display: flex;
    align-items: center;
    font-size: 14px;
    li {
      text-align: center;
      width: 25%;
      .van-icon {
        font-size: 28px;
        color: #eb6100;
      }
      p {
        padding-top: 10px;
      }
    }
  }
}
</style>
