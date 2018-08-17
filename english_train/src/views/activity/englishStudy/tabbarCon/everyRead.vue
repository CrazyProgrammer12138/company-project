<template>
  <div class="textCont">
    <div class="bottomClr">
      <div class="headTab">
        <div :class="['headTabLeft', {tabShow: tabShow1}]" @click="tabShowO()">本周阅读</div>
        <div :class="['headTabRight', {tabShow: tabShow2}]" @click="tabShowT()">
          <img :class="['redd', {isredd: isredd}]" src="../images/redd.png" alt="">
          往期阅读
        </div>
      </div>
      <div class="bottomJb"></div>
    </div>
    <StudyComOne :is="currentView" @childByValue="childByValue"></StudyComOne>
  </div>
</template>
<script>
import gif from './gifAnimation'
import $ from 'jquery'
import ReadOne from '@/components/ReadOne'
import ReadTwo from '@/components/ReadTwo'
export default {
  name: 'everyRead',
  mixins: [gif],
  data () {
    return {
      msg: '每日学习',
      state: true,
      tabShow1: true,
      tabShow2: false,
      currentView: 'ReadOne',
      isredd: false,
      childValue: 'yesShow'
    }
  },
  mounted () {
    let _this = this
    setTimeout(function () {
      $.ajax({
        type: 'get',
        url: _this.httpHl + '/camp/hasNotStudy',
        data: {
          accessToken: localStorage.getItem('accessToken'),
          studyType: 2
        },
        success: function (data) {
          console.log(data)
          let res = data
          if (res.code === 200 || res.respCode === 200 || res.code === '200') {
            if (res.data === 0 && _this.childValue === 'yesShow') {
              _this.isredd = true
            } else {
              _this.isredd = false
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
    }, 200)
  },
  methods: {
    tabShowO: function () {
      this.tabShow1 = true
      this.tabShow2 = false
      this.currentView = 'ReadOne'
    },
    tabShowT: function () {
      this.tabShow1 = false
      this.tabShow2 = true
      this.currentView = 'ReadTwo'
    },
    childByValue: function (childValue) {
      this.childValue = childValue
      if (this.childValue === 'yesShow') {
        this.isredd = true
      } else {
        this.isredd = false
      }
    }
  },
  components: {
    ReadOne,
    ReadTwo
  }
}
</script>
<style scoped lang="less">
  @ebFont:28px;
  .textCont{
    background-color: #ffffff;
  }
  .bottomClr{
    width: 100%;
    padding: 10px 0 0 0;
    position: fixed;
    top: 0;
    left: 0;
    background-color: #ffffff;
    z-index: 9;
  }
  .headTab{
    width: 500px;
    height: 70px;
    margin: 0 auto;
    border-radius: 5px;
    border: 2px solid #12224f;
    .headTabLeft{
      width: 50%;
      height: 68px;
      line-height: 68px;
      float: left;
      text-align: center;
      font-size: @ebFont;
    }
    .headTabRight{
      width: 50%;
      height: 68px;
      line-height: 68px;
      float: right;
      text-align: center;
      font-size: @ebFont;
      position: relative;
      .redd{
        width: 15px;
        height: 15px;
        position: absolute;
        top: 20px;
        right: 56px;
        display: none;
      }
      .isredd{
        display: block;
      }
    }
  }
  .tabShow{
    background-color: #12224f;
    color: #ffffff;
  }
  .bottomJb{
    height: 6px;
    margin-top: 10px;
    background: -webkit-linear-gradient(#e7e7e7, #ffffff);
    background: -o-linear-gradient(#e7e7e7, #ffffff);
    background: -moz-linear-gradient(#e7e7e7, #ffffff);
    background: linear-gradient(#e7e7e7, #ffffff);
  }
</style>
