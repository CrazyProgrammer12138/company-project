window.JSBridge.init(function (message, responseCallback) {
  let data = { 'js Responds': 'success' }
  window.JSBridge.callEventCallback(responseCallback, data, message)
})
