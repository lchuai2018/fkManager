import request from "@/utils/request";

export default {
  /*
  * 根据ID查找内部黑名单信息详情
  * */
  apiId: (object_name, id) => {
    return request({
      url: "/risk/black/" + object_name,
      method: "get",
      params:{id}
    });
  },
  /*
  * 录入内部黑名单
  * */
  apiInset: (params, object_name) => {
    return request({
      url: "/risk/black/" + object_name,
      method: "post",
      params
    });
  },
  /*
  * 按照excel规定格式，导入内部黑名单
  * */
  apiInsetImportExcel: (params, object_name) => {
    return request({
      url: "/risk/black/" + object_name,
      method: "post",
      params
    });
  },
  /*
  * 根据条件，查询内部黑名单列表
  * */
  apiList: (object_name, query) => {
    return request({
      url: "/risk/black/" + object_name,
      method: "get",
      params:query
    });
  },
  /*
  * 内部黑名单列表来源查询
  * */
  apiTreeList: (object_name) => {
    return request({
      url: "/risk/black/" + object_name,
      method: "get"
    });
  },
  /*
  * 内部黑名单编辑
  * */
  apiUpdate: (params, object_name) => {
    return request({
      url: "/risk/black/" + object_name,
      method: "put",
      params
    });
  }
};
