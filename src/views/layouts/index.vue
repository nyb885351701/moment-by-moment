<template>
  <div class="app-container">
    <div class="layout-content">
      <keep-alive v-if="$route.meta.keepAlive">
        <router-view></router-view>
      </keep-alive>
      <router-view v-else></router-view>
    </div>
    <div class="layout-footer">
      <TabBar :data="tabbars" @change="handleChange" />
    </div>
  </div>
</template>

<script>
import TabBar from '@/components/TabBar'
export default {
  name: 'AppLayout',
  components: {
    TabBar
  },
  data() {
    return {
      tabbars: [
        {
          title: '首页',
          to: {
            name: 'Home'
          },
          icon: 'home-o'
        },
        {
          title: '课程',
          to: {
            name: 'Course'
          },
          icon: 'description'
        },
        {
          title: '约课记录',
          to: {
            name: 'Record'
          },
          icon: 'newspaper-o'
        },
        {
          title: '练习',
          to: {
            name: 'Exercise'
          },
          icon: 'records'
        },
        {
          title: '我的',
          to: {
            name: 'My'
          },
          icon: 'contact'
        }
      ]
    }
  },
  methods: {
    handleChange(v) {
      // console.log('tab value:', v)
    }
  }
}
</script>
