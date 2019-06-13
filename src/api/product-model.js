import request from "@/utils/request";

export default {
  /*
  * 产品模型添加
  * */
  apiAddProductModel: (params, object_name) => {
    return request({
      url: "/product_model/" + object_name,
      method: "post",
      params
    });
  },
  /*
  * 模型导出excel
  * */
  apiExportModelExcel: (object_name, query) => {
    return request({
      url: "/product_model/" + object_name,
      method: "get",
      params: query
    });
  },
  /*
  * 根据id，查找产品模型信息
  * */
  apiInfo: (object_name, id) => {
    return request({
      url: "/product_model/" + object_name,
      method: "get",
      params: {id}
    });
  },
  /*
  * 查看产品模型
  * */
  apiQueryProductModel: (object_name, query) => {
    return request({
      url: "/product_model/" + object_name,
      method: "get",
      params: query
    });
  },
  /*
  * 产品模型修改
  * */
  apiUpdateProductModel: (params, object_name) => {
    return request({
      url: "/product_model/" + object_name,
      method: "post",
      params
    });
  },
  /*
  * 调整产品模型状态
  * */
  apiUpdateStatus: (params, object_name) => {
    return request({
      url: "/product_model/" + object_name,
      method: "post",
      params
    });
  },
  /*
  * 风控模型编号列表
  * */
  apiModelNoTreeList: (object_name) => {
    return request({
      url: "/risk_model/" + object_name,
      method: "get"
    });
  },
  /*
  * 风控变量编号列表
  * */
  apiPropertyNoTreeList: (object_name,modelNo) => {
    return request({
      url: "/risk_model/" + object_name,
      method: "get",
      params:{modelNo}
    });
  },
  /*
  * 查看风控模型详情
  * */
  apiSelectOneRiskModel: (object_name,id) => {
    return request({
      url: "/risk_model/" + object_name,
      method: "get",
      params:{id}
    });
  },
};
