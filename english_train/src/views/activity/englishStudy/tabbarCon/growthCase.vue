<template>
  <div :class="['textCont', { heights:heights }, { heightsX:heightsX }]">
    <div class="coverageOne">
      <div class="home" @click="goDtails()">
        <img class="homeImg" src="../images/grow.jpg" alt="">
        <p class="homeActivityTitle">第一期医学英语特训营-护士成长案例</p>
        <div class="contents">
          <!--<span class="intro1">内容简介</span>-->
          <span class="intro2">Tina她在部队医院已工作10年，因为对英语的热爱来到医学英语特训营，她希望自己能够熟练掌握医学英语，能够流利对话、将英语用于工作和生活之中。</span>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
import gif from './gifAnimation'
import { ACTIVITY_ENGLISH_STUDY } from '@/config/viewsBaseName'
export default {
  name: 'growthGase',
  mixins: [gif],
  data () {
    return {
      baseName: ACTIVITY_ENGLISH_STUDY,
      msg: '7月23日开放 敬请期待',
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
  methods: {
    goDtails: function () {
      this.$router.push({ name: `${this.baseName}detailaCz` })
    }
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
