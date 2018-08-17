<template>
  <div :class="['textCont', { heights:heights }, { heightsX:heightsX }]">
    <div class="coverageOne">
      <div class="home" @click="goDtailsHj()">
        <img class="homeImg" src="../images/shouye2_hj.png" alt="">
        <p class="homeActivityTitle">国际文化课之红酒品鉴</p>
        <div class="mc"></div>
      </div>
      <div class="home" @click="goDtails()">
        <img class="homeImg" src="../images/shouye3_ms.png" alt="">
        <p class="homeActivityTitle">国际文化课之马术体验</p>
        <div class="mc"></div>
      </div>
      <div class="home" @click="goDtailsGRF()">
        <img class="homeImg" src="../images/shouye1_grf.png" alt="">
        <p class="homeActivityTitle">国际文化课之高尔夫</p>
        <div class="mc"></div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
import { ACTIVITY_ENGLISH_STUDY } from '@/config/viewsBaseName'
export default {
  name: 'cultureLu',
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
      this.$router.push({ name: `${this.baseName}detaila` })
    },
    goDtailsHj: function () {
      this.$router.push({ name: `${this.baseName}detailaHJ` })
    },
    goDtailsGRF: function () {
      this.$router.push({ name: `${this.baseName}detailaGRF` })
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
    height: 300px;
    border-radius: 5px;
    background-color: #ffffff;
    margin-top: 20px;
    position: relative;
    overflow: hidden;
    .homeImg{
      width: 101%;
      height: 300px;
      border-radius: 4px;
    }
    .homeActivityTitle{
      font-weight: bold;
      font-size: 32px;
      position: absolute;
      bottom: 10px;
      left: 20px;
      color: #ffffff;
      z-index: 99;
    }
    .mc{
      width: 100%;
      height: 70px;
      position: absolute;
      bottom: 0px;
      background: linear-gradient(rgba(0,0,0,.2), rgba(0,0,0,0.7)); /* 标准的语法 */
    }
  }
  .heights{
    height: 1028px;
  }
  .heightsX{
    height: 1228px;
  }
</style>
