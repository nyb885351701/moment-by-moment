import Vue from 'vue'
import VueRouter from 'vue-router'

const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}

Vue.use(VueRouter)

const routes = [
    {
      path : '/site',
      name : 'site',
      component:()=>import('../views/home/detail/personal/site.vue'),
      meta: {
        title: '管理地址',
        keepAlive: false
      },
    },

    {
      path : '/add_site',
      name : 'add_site',
      component:()=>import('../views/home/detail/personal/add_site.vue'),
      meta: {
        title: '添加地址',
        keepAlive: false
      },
    },

    {
      path : '/alter_site',
      name : 'alter_site',
      component:()=>import('../views/home/detail/personal/alter_site.vue'),
      meta: {
        title: 'alter_site',
        keepAlive: false
      },
    },

    {
    path: '/',
    component: () => import('@/views/layouts/index'),
    redirect: '/home',
    meta: {
      title: '首页',
      keepAlive: false
    },
    children: [{
        path: '/home',
        name: 'Home',
        component: () => import('@/views/home/index'),
        meta: {
          title: '首页',
          keepAlive: false
        }
      },
      {
        path: '/course',
        name: 'Course',
        component: () => import('@/views/home/course'),
        meta: {
          title: '课程',
          keepAlive: false
        }
      },
      {
        path: '/record',
        name: 'Record',
        component: () => import('@/views/home/record'),
        meta: {
          title: '约课记录',
          keepAlive: false
        }
      },
      {
        path: '/exercise',
        name: 'Exercise',
        component: () => import('@/views/home/exercise'),
        meta: {
          title: '图书',
          keepAlive: false
        }
      },
      {
        path: '/my',
        name: 'My',
        component: () => import('@/views/home/my'),
        meta: {
          title: '我的',
          keepAlive: false
        }
      }
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/login'),
    meta: {
      title: '登录',
      keepAlive: false
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/login/register'),
    meta: {
      title: '注册',
      keepAlive: false
    }
  },
  {
    path: '/message',
    name: 'Message',
    component: () => import('@/views/message/message'),
    meta: {
      title: '留言',
      keepAlive: false
    }
  },
  {
    path: '/teacherdetail',
    name: 'Teacherdetail',
    component: () => import('@/views/home/detail/teacherdetail'),
    meta: {
      title: '讲师详情',
      keepAlive: false
    }
  },
  {
    path: '/coursedetail',
    name: 'Coursedetail',
    component: () => import('@/views/home/detail/coursedetail'),
    meta: {
      title: '课程详情',
      keepAlive: false
    }
  },
  {
    path: '/pim',
    name: 'Pim',
    component: () => import('@/views/home/detail/pim'),
    meta: {
      title: '个人信息',
      keepAlive: false
    }
  },
  {
    path: '/set',
    name: 'Set',
    component: () => import('@/views/home/detail/set'),
    meta: {
      title: '设置',
      keepAlive: false
    }
  },
  {
    path: '/mystudy',
    name: 'Mystudy',
    component: () => import('@/views/home/detail/mystudy'),
    meta: {
      title: '我的学习',
      keepAlive: false
    }
  },
  {
    path: '/mybalance',
    name: 'Mybalance',
    component: () => import('@/views/home/detail/mybalance'),
    meta: {
      title: '我的余额',
      keepAlive: false
    }
  },
  {
    path: '/myconcern',
    name: 'Myconcern',
    component: () => import('@/views/home/detail/myconcern'),
    meta: {
      title: '我的关注',
      keepAlive: false
    }
  },
  {
    path: '/mycollect',
    name: 'Mycollect',
    component: () => import('@/views/home/detail/mycollect'),
    meta: {
      title: '我的收藏',
      keepAlive: false
    }
  },
  {
    path: '/updatename',
    name: 'Updatename',
    component: () => import('@/views/home/detail/personal/updatename'),
    meta: {
      title: '修改个人信息',
      keepAlive: false
    }
  },
  {
    path: '/updatesex',
    name: 'Updatesex',
    component: () => import('@/views/home/detail/personal/updatesex'),
    meta: {
      title: '修改个人信息',
      keepAlive: false
    }
  },
  {
    path: '/updatesubject',
    name: 'Updatesubject',
    component: () => import('@/views/home/detail/personal/updatesubject'),
    meta: {
      title: '修改个人信息',
      keepAlive: false
    }
  },
  {
    path: '/specialcourses',
    name: 'SpecialCourses',
    component: () => import('@/views/home/detail/special_courses'),
    meta: {
      title: '一对一辅导',
      keepAlive: false
    }
  },
  {
    path: '/order',
    name: 'Order',
    component: () => import('@/views/home/detail/order'),
    meta: {
      title: '确认订单',
      keepAlive: false
    }
  },
  {
    path: '/courseorder',
    name: 'Courseorder',
    component: () => import('@/views/home/detail/courseorder'),
    meta: {
      title: '课程订单',
      keepAlive: false
    }
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/home/detail/search'),
    meta: {
      title: '搜索',
      keepAlive: false
    }
  },
  {
    path:'/hotdetail',
    name: 'Hotdetail',
   component: () => import('@/views/home/detail/hotdetail')
  }

]

const router = new VueRouter({
  routes
})

export default router
