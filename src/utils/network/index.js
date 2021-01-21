// 接口文件
import {
  request
} from './core'
import {
  URL,
  METHOD
} from './config'

export default {
  install(Vue) {
    Vue.prototype.$http = this
  },
  login(obj) { // 登录
    return request(METHOD.POST, URL.login, obj)
  },
  securitycode(obj) { // 获取短信验证码
    return request(METHOD.POST, URL.securitycode, obj)
  },
  setpwd(mobile, type) { // 设置密码（修改）
    return request(METHOD.POST, URL.setpwd, {
      params: {
        mobile: mobile,
        type: type
      }
    })
  },
  banner() { // ⾸⻚banner（轮播图）
    return request(METHOD.GET, URL.banner)
  },
  homedata() { // ⾸⻚数据
    return request(METHOD.GET, URL.homedata)
  },
  coursedetail(id) { // 课程详情
    return request(METHOD.GET, URL.coursedetail + `/basis_id=${id}`)
  },
  courseoutline(id) { // 课程详情-课程⼤纲
    return request(METHOD.POST, URL.courseoutline, {
      params: {
        id: id
      }
    })
  },
  coursecomment(obj) { // 课程详情-课程评论
    return request(METHOD.POST, URL.coursecomment, obj)
  },
  courseapply(id, type) { // 课程报名
    return request(METHOD.POST, URL.courseapply, {
      params: {
        id: id,
        type: type
      }
    })
  },
  coursecollect(id, type) { // 课程收藏
    return request(METHOD.POST, URL.coursecollect, {
      params: {
        id: id,
        type: type
      }
    })
  },
  courseshare() { // 课程分享
    return request(METHOD.GET, URL.courseshare)
  },
  cancelshare() { // 取消收藏
    return request(METHOD.GET, URL.cancelshare)
  },
  userinfo() { // 获取⽤户信息
    return request(METHOD.GET, URL.userinfo)
  },
  updateuser(obj) { // 更新⽤户资料
    return request(METHOD.PUT, URL.updateuser, obj)
  },
  updatehead(file) { // 修改头像
    return request(METHOD.POST, URL.updatehead, {
      params: {
        file: file
      }
    })
  },
  courselist(pagenum, pagesize,value='',course_type=0) { // 课程列表
    return request(METHOD.GET, URL.courselist + `?page=${pagenum}&limit=${pagesize}&keywords=${value}&course_type=${course_type}`)
  },
  teacherdetail(id) { // 讲师详情
    return request(METHOD.GET, URL.teacherdetail + `/${id}`)
  },
  teacherinfo(id) { // 讲师介绍
    return request(METHOD.GET, URL.teacherinfo + `/${id}`)
  },
  hotdetail(id) {
    return request(METHOD.POST, URL.hotdetail,{information_id:id})
  },
  courseclassify() { // 特色课分类
    return request(METHOD.GET, URL.courseclassify)
  },
  coursefilter(pagenum, pagesize, type, id, order, val, is) { // 课程筛选
    return request(
      METHOD.GET, URL.coursefilter +
      `?page=${pagenum}&limit=${pagesize}&course_type=${type}&classify_id=${id}&order_by=${order}&attr_val_id=${val}&is_vip=${is}`
    )
  },
  getcenterinfo() { // 获取特色课、一对一、学习币
    return request(METHOD.GET, URL.getcenterinfo)
  },
  record(obj) { // 约课记录
    return request(METHOD.POST, URL.record, obj)
  },
  mystudy(id) { // 我的学习
    return request(METHOD.GET, URL.mystudy + `/${id}`)
  },
  balance() { // 余额
    return request(METHOD.GET, URL.balance)
  },
  balancelist() { // 学习币列表
    return request(METHOD.GET, URL.balancelist)
  },
  concern(pagenum, pagesize, type) { // 我的关注列表数据
    return request(METHOD.GET, URL.concern + `?page=${pagenum}&limit=${pagesize}&type=${type}`)
  },
  gz(id) { // 关注
    return request(METHOD.GET, URL.gz + `/${id}`)
  },
  unfollow(id, type) { // 取消关注
    return request(METHOD.PUT, URL.unfollow + `/${id}/${type}`)
  },
  subject() { // 学科年级
    return request(METHOD.GET, URL.subject)
  },
  coath(pagenum, pagesize, id) { // 一对一辅导
    return request(METHOD.GET, URL.coath + `?page=${pagenum}&limit=${pagesize}&attr_val_id=${id}`)
  },
  order(obj) { // 确认订单
    return request(METHOD.POST, URL.order, obj)
  },
  updateimg(obj) { // 修改头像
    return request(METHOD.POST, URL.updateimg, obj)
  },
  //地址管理
  address(obj) { 
    return request(METHOD.GET, URL.address, obj)
  },
  // 添加地址
  add_site(obj){
    return request(METHOD.POST, URL.add_site, obj)
  },
  // 修改地址
  alter(obj,id){
    return request(METHOD.PUT, URL.alter+`/${id}`, obj)
  },
  // 删除地址
  remove_site(id){
    return request(METHOD.DELETE, URL.remove_site+`/${id}`)
  },
  // 获取地址信息
  get_site(id){
    return request(METHOD.GET, URL.get_site+`/${id}`)
  },
}
