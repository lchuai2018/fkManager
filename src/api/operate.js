import request from '@/utils/request'

export default {
  /*
  * 根据条件，查询日志列表
  * */
  apiList: (object_name,query) => {
    return request({
      url: '/log/' + object_name,
      method: 'get',
      params: query
    })
  },
  /*
  * 查询操作名称列表
  * */
  apiOperateNameList: (object_name) => {
    return request({
      url: '/log/' + object_name,
      method: 'get'
    })
  },
  /*
  * 查询操作类型列表
  * */
  apiOperateTypeList: (object_name) => {
    return request({
    url: '/log/' + object_name,
    method: 'get'
    })
  }
}
