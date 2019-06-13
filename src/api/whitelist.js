import request from '@/utils/request'

export default {
  /*
  * 录入IP白名单
  * */
  apiInsert: (object_name,params) => {
    return request({
      url: '/white/' + object_name,
      method: 'post',
      params
    })
  },
  /*
  * 查询IP白名单列表
  * */
  apiList: (object_name,query) => {
    return request({
      url: '/white/' + object_name,
      method: 'get',
      params:query
    })
  },
  /*
  * 修改IP白名单
  * */
  apiUpdate: (object_name,params) => {
    return request({
      url: '/white/' + object_name,
      method: 'post',
      params
    })
  },
}
