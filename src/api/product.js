import request from '@/utils/request';

export default {
  /*
  * 调整产品状态
  * */
  apiproductDelete: query => {
    return request({
      url: '/product',
      method: 'delete',
      params: query
    })
  },
  /*
  * 查看产品详情
  * */
  apiproductGet: productId => {
    return request({
      url: '/product',
      method: 'get',
      params: { productId }
    })
  },
  /*
  * 新增产品
  * */
  apiproductPost: params => {
    return request({
      url: '/product',
      method: 'post',
      params
    })
  },
  /*
  * 产品信息修改
  * */
  apiproductPut: params => {
    return request({
      url: '/product',
      method: 'put',
      params
    })
  },
  /*
  * 查看所有产品
  * */
  apiSelectAllProduct: object_name => {
    return request({
      url: '/product/' + object_name,
      method: 'get'
    })
  },
  /*
  * 根据商户编号，查看所有产品
  * */
  apiSelectProductByCompanyNo: (object_name, query) => {
    return request({
      url: '/product/' + object_name,
      method: 'get',
      params: query
    })
  },
  /*
  * 查看所有可用产品
  * */
  apiTreeList: object_name => {
    return request({
      url: '/product/' + object_name,
      method: 'get'
    })
  }
}
