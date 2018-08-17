<template>
  <div class="dayVoca">
    <div class="titleDs">
      <span class="pgTitle">{{campStudy.title}}</span>
      <span class="pageCode">
        <span class="code1">{{pageCodes}}</span> / <span class="code2">{{pageMax}}</span>
      </span>
      <button class="listModel" @click="listModel()">列表模式</button>
    </div>
    <div class="pageOne" v-show="isShow">
      <div class="singleName">{{wordList[pageCodes-1].word}}</div>
      <div class="singleNameYb">{{wordList[pageCodes-1].phonetic}}</div>
      <div class="singleBt">
        <div class="borderRea"></div>
        <van-button @click="taggle()" class="singleButton" type="default">显示解析</van-button>
      </div>
    </div>
    <div class="contentStudy" v-show="isShow1">
      <div class="fristTile">
        <div class="fristTile1">
          <span>{{wordList[pageCodes-1].word}}</span>
          <img class="audioSet" @click="playAudio()"  src="../../src/views/activity/englishStudy/images/horn.png" alt="">
          <audio id="myAudio" :src="wordList[pageCodes-1].audioUrl" ref="audio" type="audio" controls="controls">
          </audio>
        </div>
        <div class="fristTile2">{{wordList[pageCodes-1].phonetic}}  <span style="font-size: 22px;">{{wordList[pageCodes-1].property}}</span></div>
        <div class="messing">{{wordList[pageCodes-1].description}} </div>
      </div>
      <div class="words" v-if="wordList[pageCodes-1].rememberMethod != ''">
        <p>构词记忆法: </p>
        <div>
          <span class="wordsDivSpan">{{wordList[pageCodes-1].rememberMethod}}</span>
        </div>
      </div>
      <div class="words"  v-if="wordList[pageCodes-1].example != ''">
        <p>例句: </p>
        <div class="wordsDiv">
          {{wordList[pageCodes-1].example}}
          <img class="audioSetWord" v-if="wordList[pageCodes-1].sentenceAudioUrl != ''" @click="playAudioWord()"  src="../../src/views/activity/englishStudy/images/horn.png" alt="">
          <audio id="myAudioWord" :src="wordList[pageCodes-1].sentenceAudioUrl" ref="audio" type="audio" controls="controls">
          </audio>
        </div>
        <div class="wordsLz">{{wordList[pageCodes-1].exampleExplain}}</div>
      </div>
      <div class="associaWord" v-if="wordList[pageCodes-1].linkWord1 != '' || wordList[pageCodes-1].linkWord2 != '' || wordList[pageCodes-1].linkWord3 != ''">
        <div class="assoTitle">联想词</div>
        <ul class="associa">
          <li v-if="wordList[pageCodes-1].linkWord1 != ''">
            {{wordList[pageCodes-1].linkWord1}}
          </li>
          <li v-if="wordList[pageCodes-1].linkWord2 != ''">
            {{wordList[pageCodes-1].linkWord2}}
          </li>
          <li v-if="wordList[pageCodes-1].linkWord3 != ''">
            {{wordList[pageCodes-1].linkWord3}}
          </li>
        </ul>
      </div>
      <div class="buttonLs">
        <div class="borderRea"></div>
        <van-button :class="['pageUp', { defColor: defColorUp }]" type="default" @click="pageUp()">Previous</van-button>
        <van-button :class="['pageNext', { defColor: defColorNext }, 'removeTran']" type="default" @click="pageNext()">{{nextMsg}}</van-button>
      </div>
    </div>
    <div class="codeList" v-show="isCodeList">
      <div class="codeListHeader">
        <p>{{campStudy.title}}</p>
        <button class="codeModel" @click="codeModel()">单词模式</button>
      </div>
      <ul>
        <li :class="[{bg_color: index%2==0}]" v-for="(itemss, index) in wordList" :key="index" @click="goPageOne(index+1)">
          <p>{{itemss.word}} <span>{{itemss.phonetic}}</span></p>
          <div>{{itemss.description}}</div>
        </li>
      </ul>
    </div>
    <van-popup class="overlay-class" v-model="showF" :close-on-click-overlay="false">
      恭喜您完成本日词汇学习！
      <van-button class="noShow" @click="noShow()" type="default">确认</van-button>
    </van-popup>
    <van-popup class="overlay-class IsLogin" v-model="showIsLogin" :close-on-click-overlay="false" type="default">
      <p>提示</p>
      您的登录状态已过期，请重新登录！
    </van-popup>
  </div>
</template>
<script>
import Vue from 'vue'
import {formatDate} from '@/config/common'
import $ from 'jquery'
import {gotoNative, jsbgoCpDetail, jsbGoLogin} from '@/config/jsb/hybird'
import env from '@/../build/env'
import { mapGetters } from 'vuex'
import VueAplayer from 'vue-aplayer'
import { Popup, Button } from 'vant'
Vue.use(Popup, Button)
export default {
  name: 'studyComOne',
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
      wordList: [{word: ''},
        {description: ''},
        {example: ''},
        {exampleExplain: ''},
        {id: ''},
        {linkWord1: ''},
        {linkWord2: ''},
        {linkWord3: ''},
        {orderNum: ''},
        {phonetic: ''},
        {property: ''},
        {rememberMethod: ''},
        {studyId: ''}],
      bgColor: false,
      campStudy: '',
      // env 环境变量，判断是线上还是线下
      online: env === 'production',
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
      flag: false,
      hearTextX: false,
      isShow: true,
      isShow1: false,
      showF: false,
      showIsLogin: false, /* 登录失败提示，默认不显示 */
      isCodeList: false,
      pageCodes: 1,
      defColorUp: false,
      defColorNext: true,
      pageMax: 1,
      nextMsg: 'Next'
    }
  },
  created () {
    let _this = this
    $.ajax({
      type: 'get',
      url: _this.httpHl + '/camp/currentWord',
      data: {
        accessToken: localStorage.getItem('accessToken')
      },
      success: function (data) {
        console.log(data)
        let res = data
        if (res.code === 50000) {
          /* 跳转登录页面（登录失效）您的登录状态已过期，请重新登录！ */
          _this.showIsLogin = true
          setTimeout(function () {
            _this.showIsLogin = false
            jsbGoLogin()
          }, 1000)
        } else if (res.code === 200 || res.respCode === 200 || res.code === '200') {
          let datas = res.data
          _this.campStudy = datas.campStudy
          _this.pageMax = datas.wordList.length
          _this.wordList = datas.wordList
          _this.courseUrl = datas.campStudy.courseUrl
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
      return formatDate(date, 'yyyy-MM-dd hh:mm')
    }
  },
  mounted () {
    let isIphoneX = function () {
      return /iphone/gi.test(navigator.userAgent) && (screen.height === 812 && screen.width === 375)
    }
    if (isIphoneX()) {
      this.hearTextX = true
    } else {
      this.hearTextX = false
    }
  },
  computed: {
    ...mapGetters(['getUserInfo'])
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
    },
    taggle: function () {
      this.isShow = !this.isShow
      this.isShow1 = !this.isShow1
    },
    pageUp: function () {
      if (this.pageCodes > 1) {
        this.isShow = !this.isShow
        this.isShow1 = !this.isShow1
        this.pageCodes = this.pageCodes - 1
        this.nextMsg = 'Next'
      }
    },
    pageNext: function () {
      if (this.pageCodes < this.pageMax) {
        this.isShow = !this.isShow
        this.isShow1 = !this.isShow1
        this.pageCodes = this.pageCodes + 1
      } else {
        this.defColorUp = true
        this.defColorNext = false
        this.nextMsg = 'Finish'
        this.showF = true
      }
    },
    noShow: function () {
      this.showF = false
    },
    playAudio: function () {
      let myAudio = document.getElementById('myAudio')
      myAudio.play()
    },
    playAudioWord: function () {
      let myAudioWord = document.getElementById('myAudioWord')
      myAudioWord.play()
    },
    listModel: function () {
      this.isShow = false
      this.isCodeList = true
    },
    codeModel: function () {
      this.isShow = true
      this.isCodeList = false
    },
    goPageOne: function (key) {
      this.isShow = true
      this.isCodeList = false
      this.pageCodes = key
    }
  },
  components: {
    'aplayer': VueAplayer
  }
}
</script>
<style scoped lang="less">
  .dayVoca{
    width: 100%;
    position: fixed;
    top: 92px;
    z-index: 99;
    background-color: #f4f5f7;
  }
  .titleDs{
    width: 100%;
    height: 60px;
    padding: 13px 30px;
    font-size: 28px;
    .pgTitle{
      font-weight: bold;
    }
    .pageCode{
      margin-left: 20px;
    }
    .listModel{
      width: 150px;
      height: 50px;
      height: 50px;
      line-height: 50px;
      float: right;
      border: none;
      border-radius: 10px;
      background-color: #1B2B5E;
      color: #ffffff;
      margin-top: -10px;
      margin-right: -10px;
    }
  }
  #myAudio, #myAudioWord{
    display: none;
  }
  .pageOne{
    background-color: #ffffff;
    .singleName{
      font-size: 48px;
      font-weight: bold;
      padding: 300px 0 0 0;
      text-align: center;
    }
    .singleNameYb{
      text-align: center;
      font-size: 32px;
      margin-top: 8px;
    }
    .singleBt{
      width: 100%;
      height: 130px;
      position: fixed;
      bottom: 0px;
      text-align: center;
      .borderRea{
        height: 6px;
        background: -webkit-linear-gradient(#ffffff, #ececec);
        background: -o-linear-gradient(#ffffff, #ececec);
        background: -moz-linear-gradient(#ffffff, #ececec);
        background: linear-gradient(#ffffff, #ececec);
      }
      .singleButton{
        width: 90%;
        height: 90px;
        margin-top: 15px;
        background-color: #11224e;
        color: #ffffff;
        font-size: 32px;
        border-radius: 6px;
      }
    }
  }
  .contentStudy{
    width: 100%;
    height: 925px;
    overflow-y: scroll;
    .fristTile{
      padding: 30px 20px 30px 30px;
      color: #333333;
      background-color: #ffffff;
      .fristTile1{
        font-size: 48px;
        font-weight: bold;
        color: #333333;
        .audioSet{
          width: 50px;
          height: 50px;
        }
      }
      .fristTile2{
        font-size: 32px;
        margin: 15px 0;
        color: #666666;
      }
      .messing{
        font-size: 34px;
        color: #333333;
        font-weight: bold;
      }
    }
    .words{
      margin-top: 10px;
      padding: 0 30px;
      background-color: #ffffff;
      p{
        height: 70px;
        line-height: 70px;
        font-size: 28px;
        font-weight: bold;
        border-bottom: 1px solid #e5e5e5;
      }
      div{
        padding: 20px 0;
        font-size: 30px;
        line-height: 48px;
        .wordsDivSpan{
          font-size: 32px;
        }
      }
      .wordsDiv{
        font-size: 34px;
        word-break:break-all;
        .audioSetWord{
          width: 45px;
          height: 45px;
        }
      }
      .wordsLz{
        color: #666666;
        margin-top: -20px;
      }
    }
    .associaWord{
      font-size: 32px;
      margin-top: 10px;
      padding: 0 30px 30px 30px;
      background-color: #ffffff;
      .assoTitle{
        height: 70px;
        line-height: 70px;
        border-bottom: 1px solid #e5e5e5;
        font-size: 28px;
        font-weight: bold;
      }
      ul{
        overflow: hidden;
        margin-top: 10px;
        padding-top: 20px;
        li{
          list-style: none;
          font-size: 32px;
          span{
            font-size: 32px;
          }
          .grow{
            color: #666666;
            margin: 0 10px;
          }
          .growCz{
            font-size: 30px;
          }
        }
      }
    }
  }
  .buttonLs{
    width: 100%;
    height: 150px;
    text-align: center;
    position: fixed;
    bottom: -20px;
    .borderRea{
      height: 6px;
      margin-bottom: 13px;
      background: -webkit-linear-gradient(#ececec, #ffffff);
      background: -o-linear-gradient(#ececec, #ffffff);
      background: -moz-linear-gradient(#ececec, #ffffff);
      background: linear-gradient(#ececec, #ffffff);
    }
    .pageUp, .pageNext{
      width: 350px;
      height: 90px;
      background-color: #eeeeee;
      color: #333333;
      font-size: 32px;
      border-radius: 6px;
    }
    .pageNext{
      margin-left: 5px;
    }
    .defColor{
      background-color: #11224e;
      color: #ffffff;
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
    .noShow{
      width: 500px;
      height: 60px;
      text-align: center;
      background-color: #11224e;
      color: #ffffff;
      margin-top: 40px;
      font-size: 32px;
      border-top-left-radius: 40px;
      border-top-right-radius: 40px;
      border-bottom-left-radius: 40px;
      border-bottom-right-radius: 40px;
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
  .dcUlX{
    height: 1000px;
  }
  .goKc{
    width: 260px;
    border-bottom: 2px solid #333333;
    text-align: center;
    margin: 25px auto;
    font-size: 32px;
    color: #333333;
  }
  /* 词汇列表 */
  .codeList{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 92px;
    background-color: #ffffff;
    .codeListHeader{
      width: 100%;
      height: 60px;
      overflow: hidden;
      padding: 0 40px;
      p{
        font-size: 32px;
        line-height: 60px;
        float: left;
      }
      .codeModel{
        width: 150px;
        height: 50px;
        line-height: 50px;
        float: right;
        border: none;
        border-radius: 10px;
        background-color: #1B2B5E;
        color: #ffffff;
        margin-right: -20px;
        font-size: 30px;
        margin-top: 5px;
      }
    }
    ul{
      height: 100%;
      overflow-y: scroll;
      padding-bottom: 200px;
      li{
        list-style: none;
        padding: 20px 40px;
        overflow: hidden;
        p{
          width: 450px;
          font-size: 38px;
          float: left;
        }
        div{
          float: right;
          font-size: 32px;
        }
      }
      .bg_color{
        background-color: #e5e5e5;
      }
    }
  }
</style>
