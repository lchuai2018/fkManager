import request from "@/utils/request";

export default {
  /*
  * 风控模型添加
  * */
  apiAddRiskModel: (params, object_name) => {
    return request({
      url: "/risk_model/" + object_name,
      method: "post",
      params
    });
  },
  /*
  * 模型导出excel
  * */
  apiExportModelExcel: (object_name, query) => {
    return request({
      url: "/risk_model/" + object_name,
      method: "get",
      params: query
    });
  },
  /*
  * 根据条件查询风控模型
  * */
  apiSelectRiskModelByParams: (object_name, query) => {
    return request({
      url: "/risk_model/" + object_name,
      method: "get",
      params: query
    });
  },
  /*
  * 查看风控模型详情
  * */
  apiSelectOneRiskModel: (object_name, id) => {
    return request({
      url: "/risk_model/" + object_name,
      method: "get",
      params: {id}
    });
  },
  /*
  * 风控模型修改
  * */
  apiUpdateRiskModel: (params, object_name) => {
    return request({
      url: "/risk_model/" + object_name,
      method: "post",
      params
    });
  },
  /*
  * 风控模型修改状态
  * */
  apiUpdateStatus: (params, object_name) => {
    return request({
      url: "/risk_model/" + object_name,
      method: "post",
      params
    });
  }
};
