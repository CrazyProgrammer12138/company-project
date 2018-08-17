<template>
  <div class="textCont">
    <div class="content">
      <div class="culHeader">
        <span class="titleCul">第一期医学英语特训营-护士成长案例</span>
        <img style="display: none;" @click="share()" src="../images/share1_03.png" alt="">
      </div>
      <div class="culText">
        <p class="pTime">2018-07-23</p>
        <div class="pText">
          <p>案例1：Tina 部队三甲医院干部科护士</p>
          <img src="../images/grow_1_1.jpg" alt="">
          <div class="depict">加入医学英语特训营前：Tina她在部队医院已工作10年，因为对英语的热爱来到医学英语特训营，
            她希望自己能够熟练掌握医学英语，能够流利对话、将英语用于工作和生活之中。</div>
          <img src="../images/grow_2_2.jpg" alt="">
          <div class="depict">完成特训营学习后：通过第一期医学英语特训营的学习，她现在英语听说读写水平很高，
            并且拥有强大的国外朋友圈子，目前是护士加英语角最受学员欢迎的老师，可以全程流畅的用英语与所有人沟通交流。</div>
        </div>
        <div class="pText">
          <p>案例2：Anna  北京某三甲医院手术室护士</p>
          <p class="depict">加入医学英语特训营前：Anna大学毕业后工作1年，
            因为想要到国外工作而来到了医学英语特训营，她希望自己能够提升自己的英语表达能力，能够去往国外做护士。</p>
          <img src="../images/grow_3_3.jpg" alt="">
          <div class="depict">完成特训营学习后：Anna目前已拿到签证，正在准备赴沙特工作，
            她擅长于medical，OR临床护理，目前是护士加英语角最受学员喜爱的老师。</div>
          <img src="../images/grow_4_4.jpg" alt="">
        </div>
        <div class="pText">
          <p>案例3：Samantha 原天坛医院护士长</p>
          <img src="../images/grow_5_5.jpg" alt="">
          <div class="depict">加入医学英语特训营前：Samantha是原是天坛医院护士长，从事临床护理工作已有25年，
            因为想要改变自己的职业平台而来到医学英语特训营，她希望自己提升英语水平，应对任何挑战。</div>
          <img src="../images/grow_6_6.jpg" alt="">
          <div class="depict">完成特训营学习后：Samantha现在是某外资医院的护理总监，现在的她从容自信，
            浑身上下都散发着成功女性的魅力。她已经可以非常流畅的和外籍院长交流工作了。</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import $ from 'jquery'
import { jsbGoShare } from '@/config/jsb/hybird'
import wx from 'weixin-js-sdk'
import { returnBtn } from './returnBtn'
export default {
  name: 'detailaCz',
  beforeRouteEnter (to, from, next) {
    // 设置导航栏
    returnBtn(to, from, next)
  },
  data () {
    return {
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
          goback_add: 'direct'
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
      scrollWatch: true
    }
  },
  mounted () {
    $(window).scrollTop(0)
  },
  methods: {
    share: function () {
      isweixin()
    }
  },
  computed: {
    ...mapGetters(['getUserInfo'])
  }
}
function isweixin () {
  const ua = window.navigator.userAgent.toLowerCase()
  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    shareOk()
  } else {
    checkAgent()
  }
}
function checkAgent () {
  let u = navigator.userAgent
  let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1
  let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
  if (isAndroid || isiOS) {
    let title = $('.titleCul').text()
    let shareContent = $('.shareContent').text()
    let shareImg = 'https://sivt.hulian120.com/bl.jpg'
    let option = window.location.href + ',' + title + ',' + shareContent + ',' + shareImg
    jsbGoShare(option)
  } else {
    console.log(2)
  }
}
function shareOk () {
  $.ajax({
    noToken: true,
    type: 'get',
    url: 'https://b.hulian120.com/wechat/portal/wxJsApiSignature',
    data: {
      url: location.href.split('#')[0]
    },
    success: function (data) {
      // 微信打开网页时点击分享配置信息
      console.log(data)
      wx.config({
        debug: true,
        appId: data.respResult.appId,
        timestamp: data.respResult.timestamp,
        nonceStr: data.respResult.nonceStr,
        signature: data.respResult.signature,
        jsApiList: [
          'onMenuShareAppMessage', // 获取“分享给朋友”按钮点击状态及自定义分享内容接口
          'onMenuShareTimeline' // 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
        ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      })
      wx.ready(function () {
        // 判断当前版本是否支持指定 JS 接口，支持批量判断
        // 监听“分享给朋友”，按钮点击、自定义分享内容及分享结果接口
        wx.onMenuShareAppMessage({
          title: '111111111111',
          desc: '22222222222',
          link: 'https://sivt.hulian120.com',
          imgUrl: 'https://sivt.hulian120.com/bl.jpg'
        })
        // 监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口
        wx.onMenuShareTimeline({
          title: '111111111111',
          desc: '22222222222',
          link: 'https://sivt.hulian120.com',
          imgUrl: 'https://sivt.hulian120.com/bl.jpg'
        })
      })
    },
    error: function (error) {
      alert('4' + error)
    }
  })
}
</script>
<style scoped lang="less">
  .content{
    padding: 40px;
  }
  .culHeader{
    border-bottom: 1px solid #e5e5e5;
    padding: 0 0 20px 0;
    span{
      font-size: 40px;
      font-weight: bold;
    }
    img{
      width: 36px;
      height: 36px;
      float: right;
    }
  }
  .culText{
    margin: 20px 0 90px 0;
    font-size: 32px;
    .pTime{
      font-size: 28px;
      color: #999999;
    }
    .pText{
      margin-top: 50px;
    }
    img{
      width: 100%;
      margin: 10px 0 10px 0;
    }
    p{
      margin-top: 30px;
      text-indent: 65px;
    }
    .depict{
      font-size: 32px;
    }
  }
  .lookOut{
    font-size: 28px;
    color: #12224f;
  }
</style>
