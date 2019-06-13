import request from "@/utils/request";

export default {
  /*
  * 录入内部用户白名单
  * */
  apiInsert: (params, object_name) => {
    return request({
      url: "/userWhite/" + object_name,
      method: "post",
      params
    });
  },
  /*
  * 根据ID查找用户白名单信息详情
  * */
  apiQueryId: (object_name,id) => {
    return request({
      url: "/userWhite/" + object_name,
      method: "get",
      params:{ id }
    });
  },
  /*
  * 分页查询用户白名单列表
  * */
 apiList: (object_name, query) => {
    return request({
      url: "/userWhite/" + object_name,
      method: "get",
      params: query
    });
  },
  /*
  * 用户白名单编辑
  * */
  apiUpdate: (params, object_name) => {
    return request({
      url: "/userWhite/" + object_name,
      method: "put",
      params
    });
  }
};
