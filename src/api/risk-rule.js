import request from "@/utils/request";

export default {
  /*
  * 添加风控策略
  * */
  apiAddRiskRule: (params, object_name) => {
    return request({
      url: "/risk_rule/" + object_name,
      method: "post",
      params
    });
  },
  /*
  * 策略导出excel
  * */
  apiExportModelExcel: (object_name, query) => {
    return request({
      url: "/rule/" + object_name,
      method: "get",
      params: query
    });
  },
  /*
  * 根据策略类型查询策略列表
  * */
  apiRuleType: (object_name, type) => {
    return request({
      url: "/risk_rule/" + object_name,
      method: "get",
      params: {type}
    });
  },
  /*
  * 根据条件查看风控策略
  * */
  apiSelectRiskRuleByParams: (object_name, query) => {
    return request({
      url: "/risk_rule/" + object_name,
      method: "get",
      params: query
    });
  },
  /*
  * 查看风控策略详情
  * */
  apiSelectRiskRuleOne: (object_name, id) => {
    return request({
      url: "/risk_rule/" + object_name,
      method: "get",
      params: {id}
    });
  },
  /*
  * 修改风控策略
  * */
  apiUpdateRiskRule: (params, object_name) => {
    return request({
      url: "/risk_rule/" + object_name,
      method: "post",
      params
    });
  },
  /*
  * 修改风控策略状态
  * */
  apiUpdateStatus: (params, object_name) => {
    return request({
      url: "/risk_rule/" + object_name,
      method: "post",
      params
    });
  }
};
