<template>
  <div class="wrapper">
    <van-nav-bar title="个人信息" left-arrow @click-left="toBack" />
    <div class="main">
      <van-cell title="头像" is-link size="large" center>
        <template #right-icon>
          <img :src="userinfo.avatar" alt="" class="avatar" @click="showimg = true" />
        </template>
      </van-cell>
      <van-cell title="昵称" is-link :value="userinfo.nickname" size="large" @click="toName(userinfo.nickname)" />
      <van-cell title="手机号" is-link :value="userinfo.mobile" size="large" />
      <van-cell title="性别" is-link :value="userinfo.sex == 0 ? '女' : '男'" size="large" @click="toSex" />
      <van-cell title="出生日期" is-link :value="userinfo.birthday" size="large" @click="showdate = true" />
      <van-cell
        title="所在城市"
        is-link
        :value="userinfo.province_name + '，' + userinfo.city_name + '，' + userinfo.district_name"
        size="large"
        @click="showcity = true"
      />
      <!-- <van-cell title="学科" is-link :value="subject" size="large" @click="toSubject" />
      <van-cell title="年级" is-link :value="grade" size="large" @click="showgrade = true" /> -->
    </div>
    <!-- 修改头像 -->
    <van-popup v-model="showimg" position="bottom" :style="{ height: '20%' }">
      <van-button type="default" block>拍照</van-button>
      <van-uploader :after-read="onRead" accept="image/*" style="width: 100%">
        <van-button type="default" block style="width: 100vw">从手机相册选择</van-button>
      </van-uploader>
      <van-button type="default" block @click="showimg = false">取消</van-button>
    </van-popup>
    <!-- 修改出生日期 -->
    <van-popup v-model="showdate" position="bottom" :style="{ height: '40%' }">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="updateDate"
        @cancel="showdate = false"
      />
    </van-popup>
    <!-- 修改所在城市 -->
    <van-popup v-model="showcity" position="bottom" :style="{ height: '45%' }">
      <van-area :area-list="areaList" @confirm="updateCity" @cancel="showdate = false" />
    </van-popup>
    <!-- 修改年级 -->
    <van-popup v-model="showgrade" position="bottom" :style="{ height: '45%' }">
      <van-picker show-toolbar :columns="gradelist" @confirm="updateGrade" @cancel="showgrade = false" />
    </van-popup>
  </div>
</template>
<script>
import area from '../../../utils/Area'
import { Toast } from 'vant'
export default {
  data() {
    return {
      userinfo: '',
      subject: '',
      grade: '',
      showdate: false,
      minDate: new Date(1970, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(),
      timer: '',
      showimg: false,
      showcity: false,
      areaList: area,
      gradelist: [],
      showgrade: false,
      attr: []
    }
  },
  mounted() {
    this.getUserInfo()
  },
  methods: {
    getUserInfo() {
      this.$http.userinfo().then(res => {
        this.userinfo = res.data.data
        if (res.data.data.attr.length > 0) {
          res.data.data.attr.forEach(item => {
            if (item.attr == '年级') {
              this.grade = item.attr_value
            }
            if (item.attr == '学科') {
              this.subject += item.attr_value + ' '
            }
          })
        }
      })
      this.$http.subject().then(res => {
        console.log('年纪无数据')
        // this.gradelist = res.data.data[0].value.map(item => {
        //   return { text: item.name, id: item.id }
        // })
      })
    },
    // 头像上传
    onRead(file) {
      let formData = new FormData()
      formData.append('file', file.file)
      this.$http.updateimg(formData).then(res => {
        let img = res.data.data.path
        this.showimg = false
        this.$http.updateuser({ avatar: img }).then(res => {
          this.getUserInfo()
          Toast('修改成功')
        })
      })
    },
    toBack() {
      this.$router.push('/my')
    },
    // 修改昵称
    toName(val) {
      this.$router.push({ path: '/updatename', query: { name: val } })
    },
    // 修改性别
    toSex() {
      this.$router.push('/updatesex')
    },
    // 修改出生日期
    updateDate(value) {
      let nd = new Date(value)
      let y = nd.getFullYear()
      let mm = nd.getMonth() + 1
      let d = nd.getDate()
      let h = nd.getHours()
      let m = nd.getMinutes()
      if (mm < 10) {
        mm = '0' + mm
      }
      if (d < 10) {
        d = '0' + d
      }
      if (h < 10) {
        h = '0' + h
      }
      if (m < 10) {
        m = '0' + m
      }
      this.timer = y + '-' + mm + '-' + d
      this.$http.updateuser({ birthday: this.timer }).then(res => {
        this.showdate = false
        // console.log(res)
        this.getUserInfo()
      })
    },
    // 修改所在地
    updateCity(res) {
      // console.log(res)
      let cityID = res[0].code
      let districtID = res[2].code
      let provinceID = res[1].code
      this.$http.updateuser({ city_id: cityID, district_id: districtID, province_id: provinceID }).then(res => {
        this.getUserInfo()
      })
      this.showcity = false
    },
    // 修改学科
    toSubject() {
      this.$router.push('/updatesubject')
    },
    // 修改年级
    updateGrade(res) {
      this.showgrade = false
      // console.log(res)
      let val = []
      val.push({ attr_id: 1, attr_val_id: res.id }, { attr_id: 2, attr_val_id: 24 })
      this.attr = val
      // console.log(this.attr)
      this.$http.updateuser({ user_attr: JSON.stringify(this.attr) }).then(res => {
        // console.log(res)
        this.getUserInfo()
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
    .avatar {
      width: 1rem;
      height: 1rem;
    }
  }
}
</style>