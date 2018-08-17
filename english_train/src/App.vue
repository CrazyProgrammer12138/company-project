<template>
  <div id="app">
    <!--<keep-alive>-->
      <router-view></router-view>
    <!--</keep-alive>-->
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'App',
  created () {
    this.SET_USER_INFO({
      terminal: this.GetQueryString('terminal'),
      accessToken: this.GetQueryString('accessToken'),
      uuid: this.GetQueryString('uuid'),
      timestamp: this.GetQueryString('timestamp'),
      user_name: this.GetQueryString('user_name'),
      jsb_version: this.GetQueryString('jsb_version')
    })
  },
  methods: {
    ...mapMutations(['SET_USER_INFO']),
    GetQueryString (name) {
      let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
      let r = window.location.search.substr(1).match(reg)
      if (r != null) return unescape(r[2])
      return null
    }
  }
}
</script>

<style>
  #app .van-popup{
    top: 35%;
    left: 10%;
    -webkit-transform: translate3d(0%,0%,0);
    transform: translate3d(0%,0%,0);
  }
  #app .overlay-class1{
    top: 0;
    left: 0;
  }
  #app .van-button::before{
    top: 0;
    left: 0;
    -webkit-transform: translate3d(0%,0%,0);
    transform: translate3d(0%,0%,0);
  }
</style>
