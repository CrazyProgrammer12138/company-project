<template>
    <div class="wrap">
      <div class="activeSwiper" v-if="false">
        <div class="activeSwiperContent">
          <div class="icon"></div>
          <van-swipe class="list" :autoplay="3000" :vertical="true" :show-indicators="false">
            <van-swipe-item>活动通知内容(点击跳转到详情页面)1</van-swipe-item>
          </van-swipe>
        </div>
      </div>
      <div class="tabbarPlaceholder" v-if="tabbarStyle"></div>
      <ul :class="['topTabbar', 'clearfix', { tabbarFix: tabbarStyle }, { tabbarBgs: tabbarBg }, { tabbarNo: tabbarNo}]" ref="topTabbar">
        <li
          :class="[
            'item',
            'fl',
            { haveLogin: item.loginName },
            { active: selectTopTabbar === index }
          ]"
          v-for="(item, index) in topTabbar"
          :key="index"
          :style="item.style"
          @click="itemClick(item, index)"
        >
          <div class="tabMb"></div>
          <p>{{ item.name }}</p>
          <p v-if="item.loginName" class="loginName">{{ item.loginName }}</p>
        </li>
      </ul>
      <router-view></router-view>
    </div>
</template>

<script>
import { ACTIVITY_ENGLISH_STUDY } from '@/config/viewsBaseName'
import { mapGetters } from 'vuex'
import { offsetlt } from '../../../static/js/paulicFunction'
import { gotoNative } from '@/config/jsb/hybird'
import env from '@/../build/env'

export default {
  name: `${this.baseName}Index`,
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
      // 导航栏的jsb设置
      jsbData: {
        title: {
          titName: this.$route.meta.title,
          titleImgUrl: 'https://static.hulian120.com/web/eglishtrain/english_train_w.png',
          titleImgColor: '161616',
          titleImgAlpha: '1',
          titleCntColor: ''
        },
        return: {
          ui_elm: 'close_btn',
          visible: 'true',
          position: '1',
          goback_add: 'direct'
        },
        btn: [
          {
            ui_elm: 'close_btn',
            visible: 'true',
            position: '1'
          },
          {
            ui_elm: 'return_btn',
            visible: 'false',
            position: '2'
          }
        ]
      },
      baseName: ACTIVITY_ENGLISH_STUDY,
      // loginName 是显示未开放的文字字段，toName 是去项目内的一个命名路由的名称
      // toPath 是去本项目外的一个路径，由computed计算得出，这个字段就是computed的名称
      topTabbar: [
        {
          name: '首页',
          toName: 'IndexPage',
          style: {
            backgroundImage: `url("${require('./images/tab/icon_tab_1.png')}")`
          }
        },
        {
          name: '关于特训营',
          toName: 'OnCamp',
          style: {
            backgroundImage: `url("${require('./images/tab/icon_tab_2.png')}")`
          }
        },
        {
          name: '每日学习',
          toName: 'studyPage',
          style: {
            backgroundImage: `url("${require('./images/tab/icon_tab_3.png')}")`
          }
        },
        {
          name: '线下课表',
          toName: 'Curriculum',
          style: {
            backgroundImage: `url("${require('./images/tab/icon_tab_4.png')}")`
          }
        },
        {
          name: '活动展示',
          toName: 'Activity',
          style: {
            backgroundImage: `url("${require('./images/tab/icon_tab_5.png')}")`
          }
        },
        {
          name: '成长案例',
          toName: 'GrowthCase',
          style: {
            backgroundImage: `url("${require('./images/tab/icon_tab_6.png')}")`
          }
        },
        {
          name: '文化之旅',
          toName: 'CultureLu',
          style: {
            backgroundImage: `url("${require('./images/tab/icon_tab_7.png')}")`
          }
        },
        {
          name: '在线课程',
          toPath: `goNurse`,
          style: {
            backgroundImage: `url("${require('./images/tab/icon_tab_8.png')}")`
          }
        }
      ],
      // env 环境变量，判断是线上还是线下
      online: env === 'production',
      // tabbar滑动置顶设置
      tabbarToWindows: 0,
      tabbarStyle: false,
      selectTopTabbar: 1,
      tabbarBg: true,
      tabbarNo: false,
      userName: 0
    }
  },
  computed: {
    ...mapGetters(['getUserInfo']),
    // 在线课程跳转的链接
    goNurse () {
      const a = this.online ? 'study' : 'teststudy'
      return `nurse://el_list-https://${a}.hulian120.com/course/list_class_19.html`
    }
  },
  watch: {
    '$route': {
      handler (val, oldVal) {
        this.selectTopTabbar = val.meta.tableIndex
      },
      immediate: true
    }
  },
  mounted () {
    // 获取tabbar到顶部的距离
    this.tabbarToWindows = offsetlt(this.$refs.topTabbar).top
    window.addEventListener('scroll', this.handleScroll)
    this.userName = this.getUserInfo.user_name
  },
  methods: {
    // 监听滚动条事件执行函数
    handleScroll () {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      this.tabbarStyle = scrollTop >= this.tabbarToWindows
    },
    // 点击每一个tabbar执行的函数
    itemClick (item, index) {
      if (!item.toPath) {
        this.selectTopTabbar = index
      }
      if (item.toName) {
        this.$router.push({ name: `${this.baseName}${item.toName}` })
      } else {
        gotoNative(this[item.toPath])
      }
      if (this.selectTopTabbar === 0 || this.selectTopTabbar === 2 || this.selectTopTabbar === 4 || this.selectTopTabbar === 5 || this.selectTopTabbar === 6) {
        this.tabbarBg = true
      } else {
        this.tabbarBg = false
      }
    }
  }
}
</script>

<style scoped lang="less">
  @import "./base";
  .activeSwiper, .topTabbar{
    padding: 20px @normalPaddingLR 0;
  }
  .activeSwiper{
    &Content{
      padding: @normalPaddingLR;
      font-size: 24px;
      color: @color3;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      border-radius: @borderRadius;
      box-shadow: 0 0 6px rgba(182,182,182,0.5);
      .icon{
        width: 24px;
        height: 24px;
        background: url("./images/icon_active.png") center center no-repeat;
        background-size: 100% 100%;
        margin-right: 20px;
      }
      .list{
        height: 24px;
        flex: 1;
      }
    }
  }
  .topTabbar{
    background: @colorf;
    position: relative;
    z-index: 100;
    .item{
      background-position: center center;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      width: 162px;
      height: 60px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      margin-right: 20px;
      margin-bottom: 20px;
      color: @colorf;
      font-size: 24px;
      border-radius: @borderRadius;
      padding: 9px 0 3px;
      position: relative;
      overflow: hidden;
      .tabMb{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background: #0F4C7B;
        opacity: .5;
      }
      >p{
        position: relative;
        z-index: 2;
      }
      .loginName{
        font-size: 16px;
      }
      &.active{
        color: @textColor_1b;
        font-weight: bold;
        box-shadow: 0 0 10px rgba(14,30,72, .7);
        .tabMb{
          background: none;
        }
      }
      &.haveLogin{
        font-size: 20px;
        .tabMb{
          background: #000;
          opacity: .8;
        }
        &.active{
          color: @colorf;
        }
      }
      &:nth-child(4n){
        margin-right: 0;
      }
    }
  }
  .tabbarFix{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    margin-bottom: 0;
    box-shadow: 0 3px 3px rgba(0, 0, 0, .2);
  }
  .tabbarBgs{
    background-color: #071637;
  }
  .tabbarNo{
    display: none;
  }
  .tabbarPlaceholder{
    width: 100%;
    height: 180px;
    /*margin-bottom: 60px;*/
  }
</style>
