import request from '@/utils/request';

export default {
  /*
  * 根据订单id，查询订单信息
  * */
  apiOrderNo: (object_name, orderNo) => {
    return request({
      url: '/order/' + object_name,
      method: 'get',
      params: { orderNo }
    })
  },
  /*
  * 根据条件，查询订单列表
  * */
  apiList: (object_name, query) => {
    return request({
      url: '/order/' + object_name,
      method: 'get',
      params: query
    })
  },
  /*
  * 订单列表查询导出excel
  * */
  apiOrderExcel: (object_name, query) => {
    return request({
      url: '/order/' + object_name,
      method: 'get',
      params: query
    })
  },
  /*
  * 查询订单审核状态
  * */
  apiTree: (object_name) => {
    return request({
      url: '/order/' + object_name,
      method: 'get'
    })
  },
  /*
  * 根据风控订单编号，分页查询策略运行结果
  * */
  apiResult: (object_name, query) => {
    return request({
      url: '/order/' + object_name,
      method: 'get',
      params: query
    })
  },
  /*
  * 根据风控订单编号，分页查询策略运行结果
  * */
  apiModel: (object_name, query) => {
    return request({
      url: '/order/' + object_name,
      method: 'get',
      params: query
    })
  },
  /*
  * 根据风控订单编号，分页查询模型分运行结果
  * */
  apiModelScore: (object_name, query) => {
    return request({
      url: '/order/' + object_name,
      method: 'get',
      params: query
    })
  },
  /*
  * 根据条件，查询订单模型分页列表
  * */
  apiOrderModelScore: (object_name, query) => {
    return request({
      url: '/order/' + object_name,
      method: 'get',
      params: query
    })
  },
  /*
  * 根据条件，查询订单模型分变更列表
  * */
  apiOrderModelScoreChange: (object_name, query) => {
    return request({
      url: '/order/' + object_name,
      method: 'get',
      params: query
    })
  },
  /*
  * 根据条件，分页查询贷后订单列表
  * */
  apiLoanList: (object_name, query) => {
    return request({
      url: '/loans/' + object_name,
      method: 'get',
      params: query
    })
  },
  /*
  * 根据风控订单编号,查询用户app
  * */
  apiOrderApps: (object_name, orderNo) => {
    return request({
      url: '/order/' + object_name,
      method: 'get',
      params: {orderNo}
    })
  },
  /*
  * 根据风控订单编号,查询用户通讯录信息
  * */
 apiOrderContacts: (object_name, orderNo) => {
    return request({
      url: '/order/' + object_name,
      method: 'get',
      params: {orderNo}
    })
  },
  /*
  * 根据风控订单编号,查询用户sim
  * */
  apiOrderSims: (object_name, orderNo) => {
    return request({
      url: '/order/' + object_name,
      method: 'get',
      params: {orderNo}
    })
  },
  /*
  * 根据风控订单编号,查询用户短信
  * */
  apiOrderSms: (object_name, orderNo) => {
    return request({
      url: '/order/' + object_name,
      method: 'get',
      params: {orderNo}
    })
  },
  /*
  * 根据风控订单编号,查询淘宝用户相关信息
  * */
  apiOrderTaoBaoUserInfo: (object_name, orderNo) => {
    return request({
      url: '/order/' + object_name,
      method: 'get',
      params: {orderNo}
    })
  },
  /*
  * 根据风控订单编号,查询通话记录
  * */
  apiOrderCall: (object_name, query) => {
    return request({
      url: '/order/' + object_name,
      method: 'get',
      params: query
    })
  },
  /*
  * 贷后状态筛选
  * */
  apiLoanStatusList: (object_name) => {
    return request({
      url: '/loans/loan_status/' + object_name,
      method: 'get',
    })
  },
  /*
  * 规则类别下拉列表
  * */
  apiRuleResultCategory: (object_name) => {
    return request({
      url: '/order/' + object_name,
      method: 'get',
    })
  }
}
