<template>
  <div class="textCont">
    <!--<img class="bgmin1" src="../images/bgmin1.png" alt="">-->
    <!--<img class="bgmin2" src="../images/bgmin2.png" alt="">-->
    <div class="coverageOne" >
      <div class="home" @click="goTx()">
        <img class="homeImg" src="../images/shouye_5.jpg" alt="">
        <p class="homeActivityTitle">医学英语特训营</p>
        <div class="contents">
          <span class="intro2">护联网医学英语特训营，180天通过线上基础学习、线下集中训练、国际文化交流、大使馆及外资医院访学，帮助护士实现流利对话、查阅英文文献、撰写英语病例报告，让英语变得像母语一样简单。</span>.
        </div>
      </div>
      <div class="home" @click="goAc(indexMsg.contentUrl)">
        <img class="homeImg" :src="indexMsg.imgUrl" alt="">
        <p class="homeActivityTitle">{{indexMsg.name}}</p>
        <div class="contents">
          <span class="intro2">{{indexMsg.introduction}}</span>
        </div>
      </div>
      <div class="home" @click="goDtailsHj()">
        <img class="homeImg" src="../images/shouye2_hj.png" alt="">
        <p class="homeActivityTitle">国际文化课之红酒品鉴</p>
        <div class="contents">
          <!--<span class="intro1">内容简介</span>-->
          <span class="intro2">与品酒师一起享受品酒乐趣。了解葡萄酒口感及相关知识，学习专业的红酒品酒礼仪，品味红酒魅力。</span>
        </div>
      </div>
      <div class="home" @click="goDtailsCul()">
        <img class="homeImg" src="../images/shouye3_ms.png" alt="">
        <p class="homeActivityTitle">国际文化课之马术体验</p>
        <div class="contents">
          <!--<span class="intro1">内容简介</span>-->
          <span class="intro2">马在欧洲有贵族的象征，骑马对欧洲人而言是一种艺术最高极致。一直以来，马术都以贵族运动的姿态示人。</span>.
        </div>
      </div>
      <div class="home" @click="goDtailsGRF()">
        <img class="homeImg" src="../images/shouye1_grf.png" alt="">
        <p class="homeActivityTitle">国际文化课之高尔夫 </p>
        <div class="contents" style="-webkit-box-orient: vertical;">
          <span>{{baseUrl}}</span>
          <span class="intro2">高尔夫运动，是一项植根于大自然又最亲近与爱护大自然的运动，这就让参与运动的人在大自然中得到心境最大的释放。</span>.
        </div>
      </div>
      <!--<div class="home" @click="goDtailsCz()">-->
        <!--<img class="homeImg" src="../images/grow_1_1.jpg" alt="">-->
        <!--<p class="homeActivityTitle">第一期医学英语特训营-护士成长案例 </p>-->
        <!--<div class="contents" style="-webkit-box-orient: vertical;">-->
          <!--<span>{{baseUrl}}</span>-->
          <!--<span class="intro2">Tina她在部队医院已工作10年，因为对英语的热爱来到医学英语特训营，-->
            <!--她希望自己能够熟练掌握医学英语，能够流利对话、将英语用于工作和生活之中。</span>.-->
        <!--</div>-->
      <!--</div>-->
    </div>
  </div>
</template>
<script>
import { ACTIVITY_ENGLISH_STUDY } from '@/config/viewsBaseName'
import gif from './gifAnimation'
import { mapGetters } from 'vuex'
import $ from 'jquery'
export default {
  name: 'indexPage',
  mixins: [gif],
  data () {
    return {
      baseName: ACTIVITY_ENGLISH_STUDY,
      indexMsg: '',
      state: true,
      baseUrl: this.baseUrl
    }
  },
  created: function () {
    let _this = this
    $.ajax({
      type: 'get',
      url: this.httpHl + '/camp/activity',
      data: {
        accessToken: localStorage.getItem('accessToken')
      },
      success: function (data) {
        console.log(data)
        let res = data
        if (res.code === 200 || res.respCode === 200 || res.code === '200') {
          _this.indexMsg = res.data
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
  computed: {
    ...mapGetters(['getUserInfo'])
  },
  methods: {
    goTx: function () {
      this.$router.push({ name: `${this.baseName}onCampTwo` })
    },
    goDtailsCul: function () {
      this.$router.push({ name: `${this.baseName}detaila` })
    },
    goDtailsHj: function () {
      this.$router.push({ name: `${this.baseName}detailaHJ` })
    },
    goDtailsGRF: function () {
      this.$router.push({ name: `${this.baseName}detailaGRF` })
    },
    goDtailsCz: function () {
      this.$router.push({ name: `${this.baseName}detailaCz` })
    },
    goAc: function (urlAct) {
      window.location.href = 'nurse://third_path-' + urlAct
    }
  }
}
</script>
<style scoped lang="less">
  .textCont{
    height: 100%;
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
</style>
