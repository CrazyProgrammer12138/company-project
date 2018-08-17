<template>
  <div class="dayVoca">
    <ul class="lineKs">
      <li class="lineKsLi" data-keys="1" v-for="(item, index) in pastWrites" :key="index" @click="gotoDetail($event, item.studyId)">
        <div class="meDiv">
          <img class="engImg" src="../views/activity/englishStudy/images/icos_1.png" alt="">
          <div class="rightEcl">
            <div class="meDicalTwo">{{item.title}}</div>
            <div class="meDicalThree">{{item.beginTime}}</div>
          </div>
          <div class="wxk meUlRightRed" data-study="1" v-if="item.hasStudy == 0">未学习</div>
          <div class="wxk meUlRightColor" data-study="2"  v-else>已学习</div>
          <!--<img :class="['redd',{isredd: item.hasStudy == 0}]" src="../../src/views/activity/englishStudy/images/redd.png" alt="">-->
        </div>
      </li>
    </ul>
    <van-popup class="overlay-class" v-model="show" :close-on-click-overlay="false">{{message}}</van-popup>
    <van-popup class="overlay-class1" v-model="show1" :close-on-click-overlay="false">
      <div @click="close()" class="close">
        <img class="icon_return" src="../../src/views/activity/englishStudy/images/iocn_return.png" alt="">
        <span>返回列表</span>
      </div>
      <div class="dayVoca1">
        <div class="stduyFlow">请针对下面的文字描述写一篇英语短文，要求涵盖文字中全部病情相关信息，
          并于本周日将作业以微信或邮件形式发给班主任老师（邮箱：medenglish@163.com）
        </div>
        <div class="contentRead">
          <div class="titleRead">{{title}}</div>
          <div class="timeRead">{{beginTime | formatDate}}</div>
          <div class="textRead"></div>
          <div class="goKc" @click="goKc()">查看范文</div>
        </div>
      </div>
    </van-popup>
    <van-popup class="overlay-class IsLogin" v-model="showIsLogin" :close-on-click-overlay="false" type="default">
      <p>提示</p>
      您的登录状态已过期，请重新登录！
    </van-popup>
  </div>
</template>
<script>
import {formatDate} from '@/config/common'
import Vue from 'vue'
import { Popup } from 'vant'
import $ from 'jquery'
import { mapGetters } from 'vuex'
import {gotoNative, jsbgoCpDetail, jsbGoLogin} from '@/config/jsb/hybird'
Vue.use(Popup)
export default {
  name: 'writTwo',
  data () {
    return {
      pastWrites: [],
      isShow: true,
      show: false,
      kcId: '',
      zjId: '',
      show1: false,
      message: '',
      messahe1: '您未开通特训营权限，无法查看往期课程详情咨询客服微信：hulianwangmi7',
      title: '',
      beginTime: 0,
      courseUrl: '',
      showIsLogin: false /* 登录失败提示，默认不显示 */
    }
  },
  created () {
    let _this = this
    $.ajax({
      type: 'get',
      url: _this.httpHl + '/camp/pastWrites',
      data: {
        accessToken: localStorage.getItem('accessToken')
      },
      success: function (data) {
        let res = data
        if (res.code === 50000) {
          /* 跳转登录页面（登录失效）您的登录状态已过期，请重新登录！ */
          _this.showIsLogin = true
          setTimeout(function () {
            _this.showIsLogin = false
            jsbGoLogin()
          }, 1000)
        } else if (res.code === 200 || res.respCode === 200 || res.code === '200') {
          _this.pastWrites = res.data
        } else if (res.code === -2) {
          // -2 代表没有购买此课程
          _this.show = true
          _this.message = res.message
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
  computed: {
    ...mapGetters(['getUserInfo']),
    // 在线课程跳转的链接
    goNurse () {
      const a = this.online ? 'study' : 'teststudy'
      return `nurse://el_detail-https://${a}.hulian120.com/course/level_18360.html`
    }
  },
  methods: {
    close: function () {
      this.show1 = false
      var s = 1
      /* 1: notStudy 2: hasStudy */
      for (let i = 0; i < $('.lineKsLi .wxk').length; i++) {
        console.log('line i -- ' + $('.lineKsLi .wxk').eq(i).attr('data-study'))
        if ($('.lineKsLi .wxk').eq(i).attr('data-study') === '1') {
          s = 0
          break
        }
      }
      if (s === 1) {
        this.$emit('childByValue', 'noShow')
      } else {
        this.$emit('childByValue', 'yesShow')
      }
    },
    gotoDetail: function (event, id) {
      let $this = event.currentTarget
      let $wxk = $this.getElementsByClassName('wxk')[0]
      $wxk.setAttribute('data-study', '2')
      $wxk.style.color = '#333333'
      $wxk.innerHTML = '已学习'
      console.log($wxk.getAttribute('data-study'))
      this.show1 = true
      let _this = this
      $.ajax({
        type: 'get',
        url: _this.httpHl + '/camp/pastStudy',
        data: {
          id: id,
          accessToken: localStorage.getItem('accessToken')
        },
        success: function (data) {
          let res = data
          if (res.code === 200 || res.respCode === 200 || res.code === '200') {
            _this.title = res.data.title
            _this.beginTime = res.data.beginTime
            _this.courseUrl = res.data.courseUrl
            $('.textRead').html(res.data.content)
            if (!(_this.courseUrl.split('_')[2] === undefined)) {
              _this.kcId = _this.courseUrl.split('_')[2]
              _this.zjId = _this.courseUrl.split('_')[3].split('.')[0]
            }
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
    // 在线课程跳转的链接
    goKc: function () {
      if (this.courseUrl.indexOf('cp_detail') > -1) {
        jsbgoCpDetail(this.kcId, this.zjId)
      } else {
        let url = 'nurse://el_detail-' + this.courseUrl
        gotoNative(url)
      }
    }
  },
  filters: {
    formatDate (time) {
      let date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd')
    }
  }
}
</script>
<style scoped lang="less">
  .dayVoca{
    width: 100%;
    height: 100%;
    background-color: #12224f;
    padding: 20px;
    position: fixed;
    top: 90px;
  }
  .lineKs{
    height: 100%;
    overflow-y: scroll;
    padding-bottom: 100px;
    li{
      overflow: hidden;
      list-style: none;
      border-radius: 5px;
      margin-bottom: 20px;
      background-color: #ffffff;
      .meDiv{
        width: 710px;
        height: 157px;
        border-radius: 5px;
        border-bottom: 2px solid #e5e5e5;
        background-color: #ffffff;
        position: relative;
        .engImg{
          width: 80px;
          height: 80px;
          float: left;
          margin: 40px;
        }
        .redd{
          width: 15px;
          height: 15px;
          position: absolute;
          top: 20px;
          right: 20px;
          display: none;
        }
        .isredd{
          display: block;
        }
        .rightEcl{
          float: left;
          margin-top: 30px;
          .meDical{
            img{
              width: 15px;
              height: 15px;
            }
            span{
              font-size: 24px;
              color: #4a4a4a;
              margin-left: 13px;
            }
          }
          .meDicalTwo{
            font-size: 36px;
            color: #000000;
            margin: 10px 0;
          }
          .meDicalThree{
            font-size: 22px;
            color: #666666;
            margin-left: 5px;
          }
        }
        .wxk{
          float: right;
          font-size: 24px;
          color: #999999;
          margin-top: 60px;
          margin-right: 20px;
        }
        .meUlRightColor{
          color: #999999;
        }
        .meUlRightRed{
          color: red;
        }
      }
    }
  }
  .overlay-class{
    width: 80%;
    height: 240px;
    padding: 60px 50px 0 50px;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
    text-align: center;
    font-size: 32px;
  }
  .overlay-class1 {
    width: 100%;
    height: 100%;
    margin-top: 90px;
    .close{
      height: 40px;
      margin: 20px 10px 20px 0;
      .icon_return{
        width: 42px;
        height: 42px;
        float: left;
        margin-left: 20px;
      }
      span{
        font-size: 32px;
        display: inline-block;
        margin-top: 3px;
      }
    }
    .stduyFlow{
      font-size: 30px;
      padding: 20px 40px;
      color: #0f244e;
      background-color: #f3f6f6;
    }
    .dayVoca1{
      width: 100%;
      height: 100%;
      overflow-y: scroll;
      padding-bottom: 160px;
      background-color: #ffffff;
    }
    .contentRead{
      padding: 20px 40px 40px 40px;
      .titleRead{
        font-size: 48px;
        font-weight: bold;
        color: #333333;
        padding-bottom: 15px;
        border-bottom: 1px solid #e5e5e5;
      }
      .timeRead{
        padding: 15px 0 40px 0;
        color: #999999;
        font-size: 28px;
      }
      .textRead{
        color: #333333;
        font-size: 32px;
      }
    }
    .goKc{
      width: 160px;
      border-bottom: 2px solid #333333;
      text-align: center;
      margin: 25px auto;
      font-size: 32px;
      color: #333333;
    }
  }
  /* 登录失败跳转 */
  .IsLogin{
    font-size: 28px;
    p{
      margin-bottom: 20px;
      font-size: 32px;
    }
  }
</style>
