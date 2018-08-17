<template>
  <div :class="['textCont', { heights:heights }, { heightsX:heightsX }]">
    <div class="coverageOne">
      <div class="home" @click="goAc(acmsg.contentUrl)">
        <img class="homeImg" :src="acmsg.imgUrl" alt="">
        <p class="homeActivityTitle">{{acmsg.name}}</p>
        <div class="contents" style="-webkit-box-orient: vertical;">
          <span class="intro2">{{acmsg.introduction}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import gif from './gifAnimation'
import { ACTIVITY_ENGLISH_STUDY } from '@/config/viewsBaseName'
import { mapGetters } from 'vuex'
import $ from 'jquery'
export default {
  name: 'indexPage',
  mixins: [gif],
  data () {
    return {
      baseName: ACTIVITY_ENGLISH_STUDY,
      acmsg: '7月23日开放 敬请期待',
      state: true,
      heights: true,
      heightsX: false
    }
  },
  mounted () {
    let domClass = document.getElementsByClassName('home')
    let isIphoneX = function () {
      return /iphone/gi.test(navigator.userAgent) && (screen.height === 812 && screen.width === 375)
    }
    if (domClass >= 3) {
      this.heights = false
      this.heightsX = false
    } else {
      if (isIphoneX()) {
        this.heightsX = true
      }
    }
  },
  created: function () {
    let _this = this
    $.ajax({
      type: 'get',
      url: _this.httpHl + '/camp/activity',
      data: {
        accessToken: localStorage.getItem('accessToken')
      },
      success: function (data) {
        console.log(data)
        let res = data
        if (res.code === 200 || res.respCode === 200 || res.code === '200') {
          _this.acmsg = res.data
        } else if (res.code === -2) {
          // -2 代表没有购买此课程
          console.log(res)
        } else {
          // 服务器有正常返回 但不是 code 不是200
          console.log(new Error(res.msg))
        }
      },
      error: function (error) {
        console.log(error)
      }
    })
  },
  methods: {
    goAc: function (urlAct) {
      window.location.href = 'nurse://third_path-' + urlAct
    }
  },
  computed: {
    ...mapGetters(['getUserInfo'])
  }
}
</script>
<style scoped lang="less">
  .textCont{
    background-color: #071637;
    background-image: url("../images/bgmin1.png");
    background-size: 100% 417px;
  }
  .coverageOne{
    padding: 20px;
  }
  .home{
    height: 448px;
    border-radius: 5px;
    background-color: #ffffff;
    margin-top: 20px;
    overflow: hidden;
    .homeImg{
      width: 101%;
      height: 300px;
      border-radius: 4px;
    }
    .homeActivityTitle{
      font-weight: bold;
      padding: 20px 20px 10px 20px;
      font-size: 32px;
    }
    .contents{
      height: 60px;
      margin: 0 20px 20px 20px;
      overflow: hidden;
      font-size: 28px;
      display: -webkit-box;
      text-overflow: ellipsis;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp:2 ;
      /*! autoprefixer: off  */
      -webkit-box-orient:vertical;
      /* autoprefixer: on  */
    }
  }
  .heights{
    height: 1028px;
  }
  .heightsX{
    height: 1228px;
  }
</style>
