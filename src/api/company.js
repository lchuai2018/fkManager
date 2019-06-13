import request from '@/utils/request'

export default{
  /*
  * 商户信息添加
  * */
  apiAddCompany: (params, object_name) => {
    return request({
      url: '/company/' + object_name,
      method: 'post',
      params
    })
  },
  /*
  * 商户信息删除
  * */
  apiCheckCompanyNo: (object_name, companyNo) => {
    return request({
      url: '/company/' + object_name,
      method: 'get',
      params: { companyNo }
    })
  },
  /*
  * 商户信息删除
  * */
  apiDeleteCompany: (object_name, companyId) => {
    return request({
      url: '/company/' + object_name,
      method: 'get',
      params: { companyId }
    })
  },
  /*
  * 查询所有商户信息
  * */
  apiQueryPageCompany: (object_name, query) => {
    return request({
      url: '/company/' + object_name,
      method: 'get',
      params: query
    })
  },
  /*
  * 查看商户详情
  * */
  apiQueryOneCompany: (object_name, companyId) => {
    return request({
      url: '/company/' + object_name,
      method: 'get',
      params: { companyId }
    })
  },
  /*
  * 修改商户信息
  * */
  apiUpdateCompany: (params, object_name) => {
    return request({
      url: '/company/' + object_name,
      method: 'put',
      params
    })
  },
  /*
  * 查看所有商户
  * */
  apiTreeList: object_name => {
    return request({
      url: '/company/' + object_name,
      method: 'get'
    })
  }
}
