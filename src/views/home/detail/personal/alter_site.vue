<template>
  <div>
    <van-nav-bar title="编辑" left-arrow @click-left="$router.go(-1)" />
    <van-cell-group>
      <van-field v-model="username" label="姓名" placeholder="必填，最多输入25个汉字" />
      <van-field v-model="mobile" label="手机号" placeholder="请输入手机号" />
      <van-field v-model="address" label="地址信息" readonly @click="showcity = true" />
      <van-field
        v-model="detailaddress"
        rows="2"
        autosize
        label="详细地址"
        type="textarea"
        placeholder="请输入详细地址，如道路、门牌号、校区、楼栋数、单元等"
      />
      <div class="space"></div>
      <van-cell center title="设为默认地址">
        <template #right-icon>
          <van-switch v-model="checked" size="24" />
        </template>
      </van-cell>
      <div class="space"></div>
      <van-cell value="删除收货地址" @click="remove" />
    </van-cell-group>
    <van-button type="primary" block color="#e60012" round class="bottom_btn" @click="savw">保存</van-button>
    <!-- 修改所在城市 -->
    <van-popup v-model="showcity" position="bottom" :style="{ height: '45%' }">
      <van-area :area-list="areaList" @cancel="showcity = false" @confirm="save" />
    </van-popup>
  </div>
</template>
<script>
import area from '../../../../utils/Area'
export default {
  data() {
    return {
      username: '', // 姓名
      mobile: '', // 手机号
      address: '', // 地址
      detailaddress: '', // 详细地址
      checked: '',
      showcity: false,
      areaList: area,
      provinceID: '', // 省
      cityID: '', // 市
      districtID: '', // 区
      data: []
    }
  },
  mounted() {
    this.$http.get_site(this.$route.query.id).then(res => {
      console.log(res);
      this.data = res.data.data
      this.username = this.data.user_name
      this.mobile = this.data.mobile
      this.provinceID = res.data.data.province_id
      this.cityID = res.data.data.city_id
      this.districtID = res.data.data.district_id
      this.address = this.data.province_name + this.data.city_name + this.data.district_name
      this.detailaddress = this.data.address
      if (this.data.is_default == 1) {
        this.checked = true
      } else {
        this.checked = false
      }
    })
  },
  methods: {
    // 返回
    toBack() {
      this.$router.go(-1)
    },
    //点击确认按钮，修改地址
    save(res) {
      this.showcity = false
      this.provinceID = res[0].code
      this.cityID = res[1].code
      this.districtID = res[2].code
      this.address = res[0].name + res[1].name + res[2].name
    },
    //点击删除地址
    remove() {
      this.$http
        .remove_site(this.$route.query.id)
        .then(result => {
          console.log(result)
          this.$router.push({ path: '/site' })
        })
        .catch(err => {})
    },
    //点击保存，保存修改后的地址
    savw() {
      let number
      if (this.checked == true) {
        number = 1
      } else {
        number = 2
      }
      let params = {
        address: this.detailaddress,
        city_id: this.cityID,
        district_id: this.districtID,
        is_default: number,
        mobile: this.mobile,
        province_id: this.provinceID,
        user_name: this.username
      }
      this.$http
        .alter(params, this.$route.query.id)
        .then(result => {
          console.log(result)
          this.$router.push({path:"/site"})
        })
        .catch(err => {})
    }
  }
}
</script>
<style lang="scss" scoped>
.bottom_btn {
  position: fixed;
  bottom: 0;
}
.space {
  width: 100%;
  height: 2vh;
  background-color: #f7f8fa;
}
</style>