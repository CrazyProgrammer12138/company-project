export default (obj) => {
  // obj 中 title 就是导航栏显示的文字内容（title_img 为显示的图片位置，theme_color 为背景颜色，theme_alpha透明度，theme_cnt_color 文字颜色）
  // obj 中 return 是返回按钮的设置
  // btn 是右侧功能按钮的设置（callbackFunction为点击回调的执行函数）
  // direct 代表直接返回  gradual.逐级返回 ,2 返回指定URl、
  // 左上角的后退按钮
  let UI_BTN = [
    {
      ui_elm: obj.return.ui_elm || 'return_btn',
      visible: obj.return.visible || 'true',
      position: obj.return.position || '1',
      goback_add: (obj.return && obj.return.url) || 'gradual'
    }
  ]
  // title内容
  let data = {
    UI_TITLE: {
      ui_elm: 'title',
      visible: 'true',
      position: '0',
      ui_elm_name: obj.title.titName,
      title_img: obj.title.titleImgUrl || '',
      theme_color: obj.title.titleImgColor || '',
      theme_alpha: obj.title.titleImgAlpha || '',
      theme_cnt_color: obj.title.titleCntColor || ''
    }
  }
  // 循环右侧按钮绑定事件
  // 右侧按钮事件回调函数 callbackFunction 是一个 function
  // 例子
  // {
  //   ui_elm: 'new_btn',
  //   visible: 'true',
  //   position: '4',
  //   ui_elm_name: '测试123',
  //   callbackFunction: this.callback
  // }
  if (obj.btn && obj.btn.length > 0) {
    obj.btn.map((item, index, arr) => {
      if (item) {
        if (item.callbackFunction) {
          const callbackName = `eventCallback${index}`
          // 注册事件
          window.JSBridge.registerEvent(callbackName, function (message, responseCallback) {
            const responseData = { [callbackName]: '成功' }
            item.callbackFunction()
            window.JSBridge.callEventCallback(responseCallback, responseData, message)
          })
          item.visible = item.visible ? item.visible : 'true'
          item.ui_elm = item.ui_elm ? item.ui_elm : 'new_btn'
          item.callback = callbackName
        }
        UI_BTN.push(item)
      }
    })
  }
  data.UI_BTN = UI_BTN
  // 输出设置
  window.JSBridge.send(null, data, function (responseData) {
    console.log(responseData)
  })
}

// 跳转到app原生页面
function gotoNative (data) {
  const go = {
    page_url: data
  }
  window.JSBridge.callAPI('NFHybridAPIService.gotoNative', go, testLogCallBack)
}
// 章节详情
function jsbgoCpDetail (courseId, ccId) {
  const data = {
    'course_id': courseId,
    'chapter_id': ccId
  }
  window.JSBridge.callAPI('NFHybridAPIService.goCpDetail', data, testLogCallBack)
}
// 跳转登录页面（登录失效）
function jsbGoLogin () {
  window.JSBridge.callAPI('NFHybridAPIService.loginInvalid', null, testLogCallBack)
}

// 通知原生进行分享
function jsbGoShare (shareInfo) {
  let data = {
    share_info: [
      {plat: 'SINA', 'share_data': shareInfo},
      {plat: 'WEIXIN', 'share_data': shareInfo},
      {plat: 'WEIXIN_CIRCLE', 'share_data': shareInfo},
      {plat: 'WEIXIN_FAVARITE', 'share_data': shareInfo},
      {plat: 'QQ', 'share_data': shareInfo}
    ]
  }
  window.JSBridge.callAPI('NFHybridAPIService.goShare', data, testLogCallBack)
}

function testLogCallBack (data) {
  console.log(data)
}

export { gotoNative, jsbGoLogin, jsbGoShare, jsbgoCpDetail }
