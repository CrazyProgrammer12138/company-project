<template>
  <div class="dayVoca">
    <div class="stduyFlow">请针对下面的文字描述写一篇英语短文，
      要求涵盖文字中全部病情相关信息，并于本周日将作业以微信或邮件形式发给班主任老师（邮箱：medenglish@163.com）
    </div>
    <div class="contentRead">
      <div class="titleRead">{{currentWrite.title}}</div>
      <div class="timeRead">{{currentWrite.beginTime | formatDate}}</div>
      <div class="textRead"></div>
      <div class="goKc" @click="goKc()">查看范文</div>
    </div>
    <van-popup class="IsLogin" v-model="showIsLogin" :close-on-click-overlay="false" type="default">
      <p>提示</p>
      您的登录状态已过期，请重新登录！
    </van-popup>
  </div>
</template>
<script>
import {formatDate} from '@/config/common'
import {gotoNative, jsbgoCpDetail, jsbGoLogin} from '@/config/jsb/hybird'
import { mapGetters } from 'vuex'
import $ from 'jquery'
import Vue from 'vue'
import { Popup } from 'vant'
Vue.use(Popup)
export default {
  name: 'writOne',
  updated () {
    // 设置导航栏
    if (this.getUserInfo.terminal === 'A') {
      this.jsb(this.jsbData)
    } else if (this.getUserInfo.terminal === 'I') {
      this.jsbData.return.position = '1'
      this.jsbData.btn.splice(0, 1)
      this.jsb(this.jsbData)
    } else {
      this.jsb(this.jsbData)
    }
  },
  data () {
    return {
      msg: '123',
      currentWrite: {beginTime: 0},
      kcId: '',
      zjId: '',
      jsbData: {
        title: {
          titName: this.$route.meta.title,
          titleImgUrl: 'https://static.hulian120.com/web/eglishtrain/english_train_w.png',
          titleImgColor: '161616',
          titleImgAlpha: '1',
          titleCntColor: ''
        },
        return: {
          ui_elm: 'return_btn',
          visible: 'true',
          position: '1',
          url: 'http://192.168.1.30:8080/activity/englishStudy/studyPage'
        },
        btn: [
          {
            ui_elm: 'return_btn',
            visible: 'true',
            position: '1'
          },
          {
            ui_elm: 'close_btn',
            visible: 'false',
            position: '2'
          }
        ]
      },
      courseUrl: '',
      showIsLogin: false /* 登录失败提示，默认不显示 */
    }
  },
  created () {
    let _this = this
    $.ajax({
      type: 'get',
      url: _this.httpHl + '/camp/currentWrite',
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
          _this.currentWrite = res.data
          $('.textRead').html(res.data.content)
          _this.courseUrl = res.data.courseUrl
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
  filters: {
    formatDate (time) {
      let date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd')
    }
  },
  methods: {
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
  computed: {
    ...mapGetters(['getUserInfo']),
    goNurse () {
      const a = this.online ? 'study' : 'teststudy'
      return `nurse://el_detail-https://${a}.hulian120.com/course/level_18360.html`
    }
  }
}
</script>
<style scoped lang="less">
  .stduyFlow{
    font-size: 30px;
    padding: 20px 40px;
    color: #0f244e;
    background-color: #f3f6f6;
  }
  .dayVoca{
    width: 100%;
    margin-top: 95px;
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
  /* 登录失败跳转 */
  .IsLogin{
    width: 80%;
    height: 240px;
    padding: 60px 50px 0 50px;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
    text-align: center;
    font-size: 28px;
    p{
      margin-bottom: 20px;
      font-size: 32px;
    }
  }
</style>
