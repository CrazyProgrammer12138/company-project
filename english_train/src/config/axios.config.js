import axios from 'axios'
// import store from '@/store'
// import env from '@/../build/env'
// const baseUrl = (env === 'development') ? 'https://testtxapi.hulian120.com' : 'https://texun.hulian120.com/activity/englishStudy'
const baseUrl = process.env.API_ROOT
export default (obj) => {
  if (!localStorage.getItem('accessToken')) {
    return notLogin()
  }
  // 请求之前判断token值
  // console.log(obj)
  //   // if (!obj.noToken) {
  //   //   var token = store.state.user.userInfo.accessToken
  //   //   if (token) {
  //   //     return Object.assign({ accessToken: token }, obj.data)
  //   //   } else {
  //   //     return notLogin()
  //   //   }
  //   // }
  // 初始化一个axios请求
  const instance = axios.create({
    baseURL: baseUrl,
    url: obj.url,
    timeout: 3000,
    method: obj.method || 'get',
    headers: obj.headers || {}
  })
  // 判断请求类型
  if (!obj.method || obj.method === 'get') {
    instance.defaults.params = obj.data
  } else {
    instance.defaults.data = obj.data
  }
  /*
  * 此处可以加很多判断 用于阻止请求执行
  * */
  return new Promise((resolve, reject) => {
    instance().then((resp) => {
      const res = resp.data
      if (res.code === 200 || res.respCode === 200 || res.code === '200') {
        resolve(res)
      } else if (res.code === -2) {
        // -2 代表没有购买此课程
        resolve(res)
      } else {
        // 服务器有正常返回 但不是 code 不是200
        reject(new Error(res.msg))
      }
    }).catch((err, a, b) => {
      // 服务器没有正常返回
      console.log(err)
    })
  })
}

// 登录过期的函数  需要继续封装
function notLogin () {
  console.log('登录过期。重新登录')
  return Promise.reject(new Error('token invalid'))
}
