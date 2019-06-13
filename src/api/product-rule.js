import request from "@/utils/request";

export default {
  /*
  * 产品策略添加
  * */
  apiAddProductRule: (params, object_name) => {
    return request({
      url: "/product_rule/" + object_name,
      method: "post",
      params
    });
  },
  /*
  * 策略导出excel
  * */
  apiExportModelExcel: (object_name, query) => {
    return request({
      url: "/product_rule/" + object_name,
      method: "get",
      params: query
    });
  },
  /*
  * 查看风控策略详情
  * */
  apiInfo: (object_name, query) => {
    return request({
      url: "/product_rule/" + object_name,
      method: "get",
      params: query
    });
  },
  /*
  * 产品策略根据条件查询
  * */
 apiQueryRuleByParams: (object_name, query) => {
    return request({
      url: "/product_rule/" + object_name,
      method: "get",
      params: query
    });
  },
  /*
  * 策略修改
  * */
  apiUpdate: (params, object_name) => {
    return request({
      url: "/product_rule/" + object_name,
      method: "post",
      params
    });
  },
  /*
  * 根据策略码，查找策略数据
  * */
  apiRuleInfo: (object_name, query) => {
    return request({
      url: "/product_rule/" + object_name,
      method: "get",
      params: query
    });
  },
  /*
  * 调整策略状态
  * */
  apiUpdateStatus: (params, object_name) => {
    return request({
      url: "/product_rule/" + object_name,
      method: "post",
      params
    });
  },
  /*
  * 配置类型筛选
  * */
  apiRuleCategoryList: (object_name) => {
    return request({
      url: "/product_rule/category/" + object_name,
      method: "get"
    });
  },
};
