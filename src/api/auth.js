import request from '@/utils/request';

export default {
  /*
  * 菜单列表
  * */
  apiList: (object_name, query) => {
    return request({
      url: '/auth/' + object_name,
      method: 'get',
      params: query
    })
  },
  //录入Auth账号
  apiInsert: (params, object_name) => {
    return request({
      url: '/auth/' + object_name,
      method: 'post',
      params
    })
  },
  //分页查询产品逾期列表
  apiOverList: (object_name, query) => {
    return request({
      url: '/product_overdue/' + object_name,
      method: 'get',
      params: query
    })
  },
}
