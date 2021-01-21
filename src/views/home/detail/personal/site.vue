<template>
    
  <div class="Address_box">
    <div class="Address">
      <ul v-for="item in address_data" :key="item.id">
        <li>
          <img src="@/assets/223.png" class="Address_img" />
        </li>
        <li>
          <p>
            <span class="Address_top">{{ item.user_name }}</span
            ><span class="Address_top_right">{{ item.mobile }}</span>
          </p>
          <p class="Address_bottom">
            <!-- <span  class="Address_bottom_spn">默认</span> -->

            <span>{{ item.province_name + item.city_name + item.district_name + item.address }}</span
            ><span></span>
          </p>
        </li>
        <li>
          <button class="Address_btn" @click="gotoalter_site(item.id)">编辑</button>
        </li>
      </ul>
      <van-button @click="gotoadd_site" type="danger" block class="Address_btn_bottom">添加新地址</van-button>
    </div>
      
  </div>
</template>

<script>
export default {
  data() {
    return {
      address_data: [],
      type: ''
    }
  }, //方法

  methods: {
    gotoalter_site(id) {
      // console.log(id)
      this.$router.push({
        path: 'alter_site',
        query: { id }
      })
    },
    gotoadd_site() {
      this.type = 0
      let type = this.type
      this.$router.push({
        path: 'add_site',
        query: { type }
      })
    }
  }, //挂载后生命周期函数

  mounted() {
    this.$http
      .address()
      .then(res => {
        // console.log(res);
        this.address_data = res.data.data
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>

<style lang="scss" scoped>
.Address_box {
  width: 100vw;
  height: 100vh;
  background: white;
}
.Address {
  width: 100vw;
  height: 10vh;
  // background: yellowgreen;
  ul {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    li {
      &:nth-child(1) {
        width: 15vw;
        // border: 1px solid red;
      }
      &:nth-child(2) {
        width: 60vw;
        // border: 1px solid red;
      }
      &:nth-child(3) {
        width: 25vw;
        // border: 1px solid red;
      }
      .Address_img {
        width: 35px;
        height: 33px;
        text-align: center;
        margin-left: 10px;
      }
      .Address_top {
        font-size: 14px;
      }
      .Address_top_right {
        padding-left: 5px;
        color: #6d6d6d;
      }
      .Address_bottom {
        padding-top: 3px;
      }
      .Address_bottom_spn {
        display: inline-block;
        border: 1px solid rgb(241, 133, 133);
        color: rgb(245, 66, 66);
        background: rgb(241, 157, 171);
        margin-right: 5px;
      }
      .Address_btn {
        width: 56px;
        height: 22px;
        color: red;
        background: pink;
        border: none;
        border-radius: 10px;
        margin-left: 15px;
      }
    }
  }
  .Address_btn_bottom {
    width: 93vw;
    border-radius: 20px;
    position: fixed;
    bottom: 0;
    left: 13px;
  }
}
</style>