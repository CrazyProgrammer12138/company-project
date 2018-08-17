<template>
  <div class="textCont">
    <div class="content">
      <div class="culHeader">
        <span>国际文化课之高尔夫</span>
        <img style="display: none;" @click="wxRegCallback()" src="../images/share1_03.png" alt="">
      </div>
      <div class="culText">
        <p class="pTime">2018-07-23</p>
        <div class="pText">
          <p>高尔夫运动，是一项植根于大自然又最亲近与爱护大自然的运动，这就让参与运动的人在大自然中得到心境最大的释放。</p>
          <p>没有一项运动能像高尔夫这样有如此丰富的内涵，有人形容高尔夫的18洞就好像人生，峰回路转，令人时而欣喜时而忧。独立面对各种困难，正确的判断、缜密的思考，从而得出解决方案，并承担一切后果。</p>
        </div>
        <img src="../images/cul_grf_1.png" alt="">
        <p>这是一场绅士与高压的体验，让我们将所学与优雅、开放、友谊和休闲的运动完美结合</p>
      </div>
      <div class="lookOut">注：具体安排以最终通知为准</div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { returnBtn } from './returnBtn'
export default {
  name: 'detailaGRF',
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
  computed: {
    ...mapGetters(['getUserInfo'])
  }
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
