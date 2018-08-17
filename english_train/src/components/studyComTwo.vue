<template>
  <div class="dayVoca">
    <ul class="lineKs">
      <li class="lineKsLi" v-for="(item, index) in pastWords" :key="index">
        <div class="meDiv" data-keys="1" @click="unflod($event)">
          <img class="engImg" src="../views/activity/englishStudy/images/icos_1.png" alt="">
          <div class="rightEcl">
            <div class="meDical">
              <img src="../views/activity/englishStudy/images/start_1.png" alt="">
              <span>Medical English</span>
            </div>
            <div class="meDicalTwo">{{item.month}}</div>
            <div class="meDicalThree">Constant dropping wears away a stone.</div>
          </div>
          <span :class="['redd',{isredd: false}]" v-if="item.hasStudy == 0" data-studyTwo="1" >部分未学</span>
          <span :class="['redd',{isredd: true}]" v-else data-studyTwo="2" >部分未学</span>
        </div>
        <ul class="meUl" v-if="item.month.substring(6, 7) == 8" style="display: block;">
          <li v-for="(items, index) in item.recordList" :key="index" @click="gotoDetail($event, items.studyId)">
            <div class="meUlLeft">
              <div>{{items.title}}</div>
              <p>{{items.beginTime}}</p>
            </div>
            <div class="meUlRight meUlRightRed" data-study="1" v-if="items.hasStudy == 0">未学习</div>
            <div class="meUlRight meUlRightColor" data-study="2"  v-else>已学习</div>
            <!--<img :class="['redd1',{isredd1: items.hasStudy == 0}]" src="../../src/views/activity/englishStudy/images/redd.png" alt="">-->
          </li>
        </ul>
        <ul class="meUl" v-else>
          <li v-for="(items, index) in item.recordList" :key="index" @click="gotoDetail($event, items.studyId)">
            <div class="meUlLeft">
              <div>{{items.title}}</div>
              <p>{{items.beginTime}}</p>
            </div>
            <div class="meUlRight meUlRightRed" data-study="1" v-if="items.hasStudy == 0">未学习</div>
            <div class="meUlRight meUlRightColor" data-study="2" v-else>已学习</div>
            <!--<img :class="['redd1',{isredd1: items.hasStudy == 0}]" src="../../src/views/activity/englishStudy/images/redd.png" alt="">-->
          </li>
        </ul>
      </li>
    </ul>
    <van-popup class="overlay-class" v-model="show" :close-on-click-overlay="false">{{message}}</van-popup>
    <van-popup class="overlay-class1" v-model="show1" :close-on-click-overlay="false">
      <div class="close" @click="close($event)">
        <img class="icon_return" src="../../src/views/activity/englishStudy/images/iocn_return.png" alt="">
        <span>返回列表</span>
      </div>
      <!--<div class="setAudio">-->
        <!--<audio id="myAudio" :src="audioUrl" ref="audio" type="audio" loop="loop" controls="controls">-->
        <!--</audio>-->
        <!--<img id="isAudioImg" @click="isAudioImg()" style="display: block;" src="../../src/views/activity/englishStudy/images/audio.png" alt="">-->
      <!--</div>-->
      <div class="titleDs">
        <span class="pgTitle">{{titles}}</span>
        <span class="pageCode">
        <span class="code1">{{pageCodes}}</span> / <span class="code2">{{pageMax}}</span>
        <button class="listModel" @click="listModel()">列表模式</button>
      </span>
      </div>
      <div class="pageOne" v-show="isShow1">
        <div class="singleName">{{wordList[pageCodes-1].word}}</div>
        <div class="singleNameYb">{{wordList[pageCodes-1].phonetic}}</div>
        <div class="singleBt">
          <div class="borderRea"></div>
          <van-button @click="taggle()" class="singleButton" type="default">显示解析</van-button>
        </div>
      </div>
      <div class="contentStudy" v-show="isShow2">
        <div class="fristTile">
          <div class="fristTile1">
            <span>{{wordList[pageCodes-1].word}}</span>
            <img class="audioSet" @click="playAudio()"  src="../../src/views/activity/englishStudy/images/horn.png" alt="">
            <audio id="myAudio" :src="wordList[pageCodes-1].audioUrl" ref="audio" type="audio" controls="controls">
            </audio>
          </div>
          <div class="fristTile2">{{wordList[pageCodes-1].phonetic}}  <span style="font-size: 22px;">{{wordList[pageCodes-1].property}}</span></div>
          <div class="messing">{{wordList[pageCodes-1].description}}  </div>
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
          <p>{{titles}}</p>
          <button class="codeModel" @click="codeModel()">单词模式</button>
        </div>
        <ul>
          <li :class="[{bg_color: index%2==0}]" v-for="(itemss, index) in wordList" :key="index" @click="goPageOne(index+1)">
            <p>{{itemss.word}} <span>{{itemss.phonetic}}</span></p>
            <div>{{itemss.description}}</div>
          </li>
        </ul>
      </div>
    </van-popup>
    <van-popup class="overlay-class" v-model="showF" :close-on-click-overlay="false">恭喜您完成本日词汇学习！
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
import $ from 'jquery'
import { Popup, Icon, Pagination, Button } from 'vant'
import { ACTIVITY_ENGLISH_STUDY } from '@/config/viewsBaseName'
import {formatDate} from '@/config/common'
import { mapGetters } from 'vuex'
import { jsbGoLogin } from '@/config/jsb/hybird'
Vue.use(Popup, Icon, Pagination, Button)
export default {
  name: 'studyComTwo',
  data () {
    return {
      pastWords: [],
      pastWord: [],
      recordList: [],
      baseName: ACTIVITY_ENGLISH_STUDY,
      isShow: true,
      show: false,
      show1: false,
      message: '',
      messahe1: '您未开通特训营权限，无法查看往期课程详情咨询客服微信：hulianwangmi7',
      audioUrl: '',
      titles: '',
      hearTextX: false,
      showF: false,
      showIsLogin: false, /* 登录失败提示，默认不显示 */
      isCodeList: false,
      isShow1: true,
      isShow2: false,
      pageCodes: 1,
      defColorUp: false,
      defColorNext: true,
      pageMax: 1,
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
      nextMsg: 'Next'
    }
  },
  created () {
    let _this = this
    $.ajax({
      type: 'get',
      url: _this.httpHl + '/camp/pastWords',
      data: {
        accessToken: localStorage.getItem('accessToken')
      },
      success: function (data) {
        // console.log(data)
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
          _this.pastWords = datas
          _this.recordList = datas.recordList
        } else if (res.code === -2) {
          // -2 代表没有购买此课程
          _this.show = true
          _this.message = res.message
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
  computed: {
    ...mapGetters(['getUserInfo']),
    // 在线课程跳转的链接
    goNurse () {
      const a = this.online ? 'study' : 'teststudy'
      return `nurse://el_detail-https://${a}.hulian120.com/course/level_18360.html`
    }
  },
  methods: {
    unflod: function (event) {
      let el = event.currentTarget
      let keys = $(el).attr('data-keys')
      let dqDom = $('.lineKsLi').index()
      let scrollTop = $('.lineKs').scrollTop()
      let scrollTop2 = $(el).offset().top
      let height2 = (scrollTop + scrollTop2) - 50
      for (let i = 0; i < $('.lineKsLi').length; i++) {
        if ($('.meDiv').eq(i).attr('data-keys') === '0') {
          if (dqDom > i) {
            if (scrollTop >= 0) {
              $('.lineKs').scrollTop(scrollTop2 + scrollTop - 340)
            }
          } else {
            if (scrollTop >= 0) {
              $('.lineKs').scrollTop(height2)
            }
          }
        }
      }
      if (keys === '1') {
        $('.meDiv').attr('data-keys', '1')
        $('.meDiv').next('.meUl').attr('style', 'display: none;')
        $(el).attr('data-keys', '0')
        $(el).next('.meUl').show()
      } else {
        $(el).attr('data-keys', '1')
        $(el).next('.meUl').hide()
      }
    },
    // 往期列表下每日列表跳转到当天词汇
    gotoDetail: function (event, id) {
      let $this = event.currentTarget
      let $wxk = $this.getElementsByClassName('meUlRight')[0]
      /* 未学习变成已学习 */
      $wxk.setAttribute('data-study', '2')
      $wxk.style.color = '#999999'
      $wxk.innerHTML = '已学习'
      this.show1 = true
      let monthNode = $this.parentNode.parentNode.firstElementChild.lastChild
      let childLen = $this.parentNode.childNodes.length
      let parensEl = $this.parentNode.parentNode.parentNode
      /* monthFlag  月份是否有未学习 */
      let monthFlag = true
      /* 判断往期是否有未学习 */
      let flag = true
      /* 处理天数循环 */
      for (let i = 0; i < childLen; i++) {
        let childNode = $this.parentNode.childNodes[i].lastChild
        if (childNode.getAttribute('data-study') === '1') {
          monthFlag = false
          break
        }
      }
      if (monthFlag) {
        monthNode.setAttribute('style', 'display:none;')
        monthNode.setAttribute('data-studytwo', '2')
      }
      for (let i = 0; i < parensEl.childNodes.length; i++) {
        let paretNode = parensEl.childNodes[i].firstElementChild.lastChild
        if (paretNode.getAttribute('data-studytwo') === '1') {
          flag = false
          break
        }
      }
      console.log(flag)
      if (flag) {
        this.$emit('childByValue', 'noShow')
      }
      let _this = this
      $.ajax({
        type: 'get',
        url: _this.httpHl + '/camp/pastWord',
        data: {
          id: id,
          accessToken: localStorage.getItem('accessToken')
        },
        success: function (data) {
          let res = data
          if (res.code === 200 || res.respCode === 200 || res.code === '200') {
            _this.titles = res.data.campStudy.title
            _this.pageMax = res.data.wordList.length
            _this.wordList = res.data.wordList
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
    close: function () {
      this.show1 = false
    },
    taggle: function () {
      this.isShow1 = !this.isShow1
      this.isShow2 = !this.isShow2
    },
    pageUp: function () {
      if (this.pageCodes > 1) {
        this.isShow1 = !this.isShow1
        this.isShow2 = !this.isShow2
        this.pageCodes = this.pageCodes - 1
        this.nextMsg = 'Next'
      }
    },
    pageNext: function () {
      if (this.pageCodes < this.pageMax) {
        this.isShow1 = !this.isShow1
        this.isShow2 = !this.isShow2
        this.pageCodes = this.pageCodes + 1
      } else {
        this.defColorUp = true
        this.defColorUp = false
        this.nextMsg = 'Finish'
        this.showF = true
      }
    },
    noShow: function () {
      this.showF = false
    },
    /* 播放音频 */
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
  }
}
</script>
<style scoped lang="less">
  .dayVoca{
    width: 100%;
    height: 100%;
    background-color: #12224f;
    padding: 20px;
    position: fixed;
    top: 90px;
  }
  .lineKs{
    height: 100%;
    overflow-y: scroll;
    padding-bottom: 100px;
    li{
      overflow: hidden;
      list-style: none;
      border-radius: 5px;
      margin-bottom: 20px;
      background-color: #ffffff;
      .meDiv{
        width: 710px;
        height: 170px;
        border-radius: 5px;
        border-bottom: 2px solid #e5e5e5;
        background-color: #ffffff;
        position: relative;
        .engImg{
          width: 80px;
          height: 80px;
          float: left;
          margin: 40px;
        }
        .redd{
          height: 15px;
          position: absolute;
          top: 60px;
          right: 20px;
          color: red;
          display: block;
        }
        .isredd{
          display: none;
        }
        .rightEcl{
          width: 450px;
          float: left;
          margin-top: 15px;
          .meDical{
            img{
              width: 25px;
              height: 25px;
              vertical-align: -1px;
            }
            span{
              font-size: 24px;
              color: #4a4a4a;
              margin-left: 13px;
            }
          }
          .meDicalTwo{
            font-size: 36px;
            color: #000000;
            margin: 10px 0;
          }
          .meDicalThree{
            font-size: 22px;
            color: #666666;
            margin-left: 5px;
          }
        }
      }
      .meUl{
        width: 100%;
        padding: 0 20px;
        display: none;
        li{
          width: 100%;
          padding: 27px 0;
          height: 120px;
          border-bottom: 2px solid #eeeeee;
          position: relative;
          .meUlLeft{
            float: left;
            div{
              font-size: 30px;
              color: #333333;
            }
            p{
              font-size: 24px;
              color: #666666;
              margin-top: 10px;
            }
          }
          .meUlRight{
            float: right;
            font-size: 24px;
            color: #999999;
            line-height: 100px;
          }
          .meUlRightColor{
            color: #999999;
          }
          .meUlRightRed{
            color: red;
          }
          .redd1{
            width: 15px;
            height: 15px;
            position: absolute;
            top: 20px;
            right: 0px;
            display: none;
          }
          .isredd1{
            display: block;
          }
        }
      }
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
  .overlay-class1{
    width: 100%;
    height: 100%;
    margin-top: 90px;
    .dayVocaCode{
      font-size: 28px;
      padding: 0 20px 0px 30px;
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
    .close{
      height: 40px;
      margin: 20px 10px 20px 0;
      .icon_return{
        width: 42px;
        height: 42px;
        float: left;
        margin-left: 20px;
      }
      span{
        font-size: 32px;
        display: inline-block;
        margin-top: 3px;
      }
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
        bottom: 85px;
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
          #myAudio{
            display: none;
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
            width: 50px;
            height: 50px;
          }
          #myAudioWord{
            display: none;
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
      bottom: 60px;
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
  }
  /* 词汇列表 */
  .codeList{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 80px;
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
      padding-bottom: 280px;
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
