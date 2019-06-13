import qs from 'qs'
import router from '../router'
import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'
import { Loading } from 'element-ui'
let loadingInstance
function startLoading() {
  loadingInstance = Loading.service({
    target: document.querySelector('.main-container'),
    lock: true,
    text: '拼命加载中',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.8)'
  })
}
function endLoading() {
  loadingInstance.close()
}
// 声明一个对象用于存储请求个数
let needLoadingRequestCount = 0
function showFullScreenLoading() {
  if (needLoadingRequestCount === 0) {
    startLoading()
  }
  needLoadingRequestCount++
}
function tryHideFullScreenLoading() {
  if (needLoadingRequestCount <= 0) return
  needLoadingRequestCount--
  if (needLoadingRequestCount === 0) {
    endLoading()
  }
}


// 创建axios实例
const service = axios.create({
  // baseURL: process.env.BASE_API, // api 的 base_url
  baseURL: '/api/manager', // api 的 base_url
  timeout: 60000 // 请求超时时间
})

// 判断obj的类型
const toType = (obj) => {
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}
// 参数过滤函数
const filterNull = (params) => {
  for (var key in params) {
    if (toType(params[key]) === 'string') {
      params[key] = params[key].trim()
    } else if (toType(params[key]) === 'object') {
      params[key] = filterNull(params[key])
    }
    //  else if (toType(params[key]) === 'array'){
    //   params[key] = filterNull(params[key])
    // }
  }
  return params
}
// request拦截器
service.interceptors.request.use(
  config => {
    // showFullScreenLoading()
    // loadingInstanceUrl = config.url
    // console.log(config.url)
    if(config.url != '/login'){
      let accessKey = sessionStorage.getItem("currentUser")
      if(!sessionStorage.getItem("currentUser")){
        router.push({ path: '/' })
      }
    }
    config.params && filterNull(config.params)
    // if (store.getters.token) {
      config.headers['Authorization'] = '123456abcde!@#$%^' // 让每个请求携带自定义token 请根据实际情况自行修改
    // }
    if (config.method === 'post' || config.method === 'put') {
      // config.data = qs.parse(qs.stringify(config.params)) || null
      config.data = config.params || null
      config.params = null
    }
    return config
  },
  error => {
    // Do something with request error
    // tryHideFullScreenLoading()
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非20000是抛错 可结合自己业务进行修改
     */
    // tryHideFullScreenLoading()
    const res = response.data
    if (res.code == undefined) {
      router.push({ path: '/' })
      return
    }
    if (res.code !== 200) {
      Message({
        message: res.message,
        type: 'error',
        duration: 5 * 1000
      })
      // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        MessageBox.confirm(
          '你已被登出，可以取消继续留在该页面，或者重新登录',
          '确定登出',
          {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload() // 为了重新实例化vue-router对象 避免bug
          })
        })
      }
      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    // tryHideFullScreenLoading()
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
