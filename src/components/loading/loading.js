import Vue from 'vue'
import Loading from './Loading.vue'
// 通过vue.extend()新建一个子类LoadingConstructor
// loadingvue是对应的loading的模板
const LoadingContrustor = Vue.extend(Loading) // 关键步骤
let loading = null
const service = () => {
  // 创建loading对象
  if (!loading) {
    // 不能同时创建多个loading
    loading = new LoadingContrustor()
  }
  // 创建loading挂载元素
  let divElement = document.createElement('div')
  // 将组件挂载到元素
  loading.$mount(divElement)
  // 将挂载loading组件的div添加到页面
  document.body.appendChild(loading.$el)
  loading.$nextTick(() => {
    loading.isShowLoading = true
  })
  return loading
}

export default service
