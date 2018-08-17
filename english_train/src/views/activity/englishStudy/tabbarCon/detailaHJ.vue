<template>
  <div class="textCont">
    <div class="content">
      <div class="culHeader">
        <span class="titleCul">国际文化课之红酒品鉴</span>
        <img style="display: none;" @click="share()" src="../images/share1_03.png" alt="">
      </div>
      <div class="culText">
        <p class="pTime">2018-07-23</p>
        <div class="pText">
          <p>与品酒师一起享受品酒乐趣。了解葡萄酒口感及相关知识，学习专业的红酒品酒礼仪，品味红酒魅力。</p>
          <p>从流转于晶莹玻璃杯的酒液中，感受各类水果、花朵和香料的芬芳，解读出年份的风雨变化，探索隐含在酒中的风土，甚至是酿酒师的巧妙工艺，还能感受时间带给葡萄酒的魔力。</p>
          <p>了解别样国际文化，开拓别样朋友圈子，以此将自己带入更高的平台之中，才是真正的倔强生长、华丽蜕变！</p>
        </div>
        <img src="../images/cul_hj_1.png" alt="">
        <p class="shareContent">经典红酒品鉴文化课，让你拥有的不仅仅是高贵，还有那蕴藏了深厚历史内涵的优雅。</p>
      </div>
      <div class="lookOut">注：具体安排以最终通知为准</div>
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
  name: 'detailaHJ',
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
      }
    }
  },
  mounted () {

  },
  methods: {
    share: function () {
      isweixin()
      // this.$axios({
      //   noToken: true,
      //   url: 'https://study.hulian120.com/jkhh/signature.jkhh',
      //   data: {
      //     url: location.href.split('#')[0]
      //   }
      // }).then((res) => {
      //   let ress = res.signature
      //   wx.config({
      //     debug: true,
      //     appId: ress.appId,
      //     timestamp: ress.timestamp,
      //     nonceStr: ress.nonceStr,
      //     signature: ress.signature,
      //     jsApiList: [
      //       'onMenuShareAppMessage', // 获取“分享给朋友”按钮点击状态及自定义分享内容接口
      //       'onMenuShareTimeline' // 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
      //     ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      //   })
      // }).catch((error) => {
      //   alert('3' + error)
      // })
      // wx.ready(() => {
      //   wx.onMenuShareAppMessage({
      //     title: 'fasdfasfasfdasfasdfasd',
      //     link: '111111111',
      //     imgUrl: 'https://static.hulian120.com/web/plat/campactivity/8db33c023899426295e9514737781dd1.png',
      //     success: function () {
      //       console.log('分享成功')
      //     },
      //     error: function () {
      //       console.log('分享失败')
      //     }
      //   })
      // })
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
          title: '国际文化课之红酒品鉴',
          desc: '国际文化课之红酒品鉴',
          link: 'https://sivt.hulian120.com',
          imgUrl: 'https://sivt.hulian120.com/bl.jpg'
        })
        // 监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口
        wx.onMenuShareTimeline({
          title: '国际文化课之红酒品鉴',
          desc: '国际文化课之红酒品鉴',
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
      height: 300px;
      margin: 29px 0 29px 0;
    }
    p{
      text-indent: 65px;
    }
  }
  .lookOut{
    font-size: 28px;
    color: #12224f;
  }
</style>
