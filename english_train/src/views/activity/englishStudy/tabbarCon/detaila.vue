<template>
  <div class="textCont">
    <div class="content">
      <div class="culHeader">
        <span>国际文化课之马术体验</span>
        <img style="display: none;" @click="wxRegCallback()" src="../images/share1_03.png" alt="">
      </div>
      <div class="culText">
        <p class="pTime">2018-07-23</p>
        <div class="pText">
          <p>马在欧洲有贵族的象征，骑马对欧洲人而言是一种艺术最高极致。</p>
          <p>一直以来，马术都以贵族运动的姿态示人，马匹、装备以及教练指导等一系列高昂费用常常令人唏嘘不已甚至望而却步。
            与马交流的那种感觉很奇妙，它既是朋友合作者，又是需要你去征服的对手。
            因此马术一方面在锻炼你协调性与共通能力，
            另一方面也在锻炼你强硬的掌控力与开阔的格局。</p>
        </div>
        <img src="../images/cul_1.png" alt="">
        <p>我们一起体验马术，唤起我们内心深处潜藏的自信，增强对复杂环境的应变能力。</p>
      </div>
      <div class="lookOut">注：具体安排以最终通知为准</div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { returnBtn } from './returnBtn'
export default {
  name: 'detaila',
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
