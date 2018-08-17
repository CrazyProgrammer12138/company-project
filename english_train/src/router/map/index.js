import activity from './activity'
import err404 from '@/views/err-page/error404'
import err500 from '@/views/err-page/error500'

const errorPage = [
  {
    path: '/*',
    name: '404',
    component: err404,
    meta: {
      title: '404-页面不存在'
    }
  },
  {
    path: '/500',
    name: '500',
    component: err500,
    meta: {
      title: '500-服务端错误'
    }
  }
]

export default [].concat(activity, errorPage)
