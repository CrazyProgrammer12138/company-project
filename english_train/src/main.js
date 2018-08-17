// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import store from './store'
import './static/css/reset.css'
// import baseAxios from './config/axios.config'
import 'lib-flexible/flexible.js'
import './config/jsb/JSBridge'
import jsbConfig from './config/jsb/hybird'
import Vant from 'vant'
import 'vant/lib/vant-css/index.css'
// 禁止ios双指缩放和双击缩放的
import './compatible'
// 安卓低版本兼容性测试(目前没起作用)
import 'babel-polyfill'
import Es6Promise from 'es6-promise'
require('es6-promise').polyfill()
Es6Promise.polyfill()

Vue.use(Vuex)
Vue.use(Vant)

Vue.config.productionTip = false
Vue.prototype.httpHl = process.env.API_ROOT
Vue.prototype.jsb = jsbConfig
Vue.prototype.$autoPlayQues = (src, cd) => {
  App.methods.autoPlayQues(src, cd)
}
router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
