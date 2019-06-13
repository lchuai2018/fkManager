import request from "@/utils/request";

export default {
  /*
  * 产品渠道添加
  * */
  apiInsert: (params, object_name) => {
    return request({
      url: "/product/channel/" + object_name,
      method: "post",
      params
    });
  },
  /*
  * 导入产品渠道
  * */
  apiImportExcel: (params, object_name) => {
    return request({
      url: "/product/channel/" + object_name,
      method: "post",
      params
    });
  },
  /*
  * 渠道等级筛选条件
  * */
  apiLevelTree: (object_name) => {
    return request({
      url: "/product/channel/" + object_name,
      method: "get"
    });
  },
  /*
  * 根据条件，查询产品渠道列表
  * */
  apiList: (object_name, query) => {
    return request({
      url: "/product/channel/" + object_name,
      method: "get",
      params: query
    });
  },
  /*
  * 产品渠道编辑
  * */
  apiUpdate: (params, object_name) => {
    return request({
      url: "/product/channel/" + object_name,
      method: "put",
      params
    });
  },
  /*
  * 根据id，查询产品渠道信息
  * */
  apiId: (object_name) => {
    return request({
      url: "/product/channel/" + object_name,
      method: "get"
    });
  }
};
