<template>
  <div :class="['textCont', {textContX: textContX}]">
    <div class="studyHeader">
      <img src="../images/shouye4_mrxx.jpg" alt="">
      <div class="studyHT">
        <img class="studyImg" src="../images/writrText.png" alt="">
        <div class="everyDay">{{startDay}}</div>
        <div class="project" @click="goStudy()">点击查看学习计划</div>
      </div>
    </div>
    <div class="rankList" @click="rank()">
      <img src="../images/rankImg_01.png" alt="">
    </div>
    <div class="studyWrap">
      <ul class="studyUl">
        <li v-for="(item, index) in studyMsg" :key="index" @click="goEveryDaily(item, index)">
          <div class="leftLi">
            <p>{{item.title}}</p>
            <div>{{item.eName}}</div>
          </div>
          <img :src="item.img" alt="">
        </li>
      </ul>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
import gif from './gifAnimation'
import { mapGetters } from 'vuex'
import { ACTIVITY_ENGLISH_STUDY } from '@/config/viewsBaseName'
export default {
  name: 'studyPage',
  mixins: [gif],
  beforeRouteEnter (to, from, next) {
    // 设置导航栏
    next(vm => {
      // 兼容ios和安卓的导航栏关闭按钮
      if (vm.getUserInfo.terminal === 'A') {
        vm.jsb(vm.jsbData)
      } else if (vm.getUserInfo.terminal === 'I') {
        vm.jsbData.return.position = '1'
        vm.jsbData.btn.splice(0, 1)
        vm.jsb(vm.jsbData)
      } else {
        vm.jsb(vm.jsbData)
      }
    })
  },
  data () {
    return {
      studyMsg: [
        {
          title: '词汇(每日一篇)',
          eName: 'DAILY VOCABULARY',
          img: `${require('../images/icos_1.png')}`,
          toName: 'everyDaily'
        },
        {
          title: '听力(每日一篇)',
          eName: 'LISTENING EXERCISE',
          img: `${require('../images/icos_3.png')}`,
          toName: 'everyHear'
        },
        {
          title: '阅读(每周两篇)',
          eName: 'WEEKLY READING',
          img: `${require('../images/icos_5.png')}`,
          toName: 'everyRead'
        },
        {
          title: '口语(每周两篇)',
          eName: 'ORAL PRACTICE',
          img: `${require('../images/icos_2.png')}`,
          toName: 'everyTougue'
        },
        {
          title: '写作作业(每周一篇)',
          eName: 'WRITING PRACTICE',
          img: `${require('../images/icos_4.png')}`,
          toName: 'everyWrit'
        }
      ],
      state: true,
      baseName: ACTIVITY_ENGLISH_STUDY,
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
      studyIndex: 0,
      startDay: 1,
      textContX: false
    }
  },
  methods: {
    goEveryDaily: function (item) {
      if (item.toName) {
        this.$router.push({ name: `${this.baseName}${item.toName}` })
      }
    },
    goStudy: function () {
      this.$router.push({ name: `${this.baseName}onCampThree` })
    },
    rank: function () {
      this.$router.push({ name: `${this.baseName}rankList` })
    }
  },
  computed: {
    ...mapGetters(['getUserInfo'])
  },
  mounted () {
    let startTime = (new Date('2018/08/01 00:00:00')).getTime()
    let currentTime = (new Date()).getTime()
    let sd = currentTime - startTime
    this.startDay = parseInt((sd / 1000 / 60 / 60 / 24) + 1)
    let isIphoneX = function () {
      return /iphone/gi.test(navigator.userAgent) && (screen.height === 812 && screen.width === 375)
    }
    if (isIphoneX()) {
      this.textContX = true
    }
  }
}
</script>
<style scoped lang="less">
  .textCont{
    height: auto;
    background-color: #071637;
    background-image: url("../images/bg_1.png");
    background-size: 100% 912px;
  }
  .textContX{
    height: 100%;
  }
  .studyWrap{
    padding: 0 20px 20px 20px;
  }
  .studyHeader{
    position: relative;
    img{
      width: 100%;
      height: 246px;
    }
    .studyHT{
      height: 117px;
      color: #ffffff;
      position: absolute;
      top: 60px;
      left: 27px;
      font-size: 30px;
      .studyImg{
        width: 450px;
        height: 53px;
      }
      .everyDay{
        width: 90px;
        text-align: center;
        position: absolute;
        top: -20px;
        left: 255px;
        font-size: 50px;
        color: #fffa9c;
      }
      div{
        margin-top: 20px;
      }
      .project{
        text-align: center;
        font-size: 28px;
        color: #fffa9c;
        border: 2px solid #fffa9c;
        border-top-left-radius: 40px;
        border-bottom-left-radius: 40px;
        border-top-right-radius: 40px;
        border-bottom-right-radius: 40px;
        padding: 10px 0;
      }
    }
  }
  .rankList{
    img{
      width: 100%;
      margin-bottom: 20px;
    }
  }
  .studyUl{
    overflow: hidden;
    li{
      width: 100%;
      height: 170px;
      background-color: #ffffff;
      border-radius: 5px;
      list-style: none;
      padding: 40px 50px 38px 30px;
      margin-bottom: 20px;
      overflow: hidden;
      .leftLi{
        float: left;
        p{
          font-size: 36px;
          color: #333333;
          font-weight: bold;
        }
        div{
          font-size: 28px;
          color: #666666;
          margin-top: 15px;
        }
      }
      img{
        width: 80px;
        height: 80px;
        float: right;
      }
    }
  }
</style>
