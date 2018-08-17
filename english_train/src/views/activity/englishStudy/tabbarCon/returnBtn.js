function returnBtn (to, from, next) {
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
}

export { returnBtn }
