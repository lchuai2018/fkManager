import request from '@/utils/request'

export default {
  /*
  * 查询进单开关信息
  * */
  apiQuery: (object_name,query) => {
    return request({
      url: '/switch/appl/' + object_name,
      method: 'get',
      params: query
    })
  },
  /*
  * 新增进单开关信息
  * */
  apiAdd: (object_name,params) => {
    return request({
      url: '/switch/appl/' + object_name,
      method: 'post',
      params
    })
  },
  /*
  * 进单系统延迟开关修改
  * */
  apiChange: (object_name,params) => {
    return request({
        url: '/switch/appl/' + object_name,
        method: 'put',
        params
    })
  }
}
