export default {
  state: {
    token: '1111',
    userInfo: {}
  },
  getters: {
    getUserInfo (state) {
      return state.userInfo
    }
  },
  mutations: {
    SET_USER_INFO (state, data) {
      if (data.accessToken != undefined && data.accessToken != null) {
        localStorage.setItem('accessToken', data.accessToken)
      }
    }
  }
}
