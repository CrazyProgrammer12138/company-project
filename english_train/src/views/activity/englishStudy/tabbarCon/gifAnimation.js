import img from '../images/defulat.gif'
export default {
  beforeRouteEnter (to, from, next) {
    next((vm) => {
      vm.state = `${img}?${new Date().getTime()}`
    })
  },
  beforeRouteLeave (to, from, next) {
    this.state = ''
    next()
  }
}
