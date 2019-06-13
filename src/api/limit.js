import request from "@/utils/request";

export default {
  /*
  * 录入内部用户额度信息
  * */
  apiInsert: (params, object_name) => {
    return request({
      url: "/limit/" + object_name,
      method: "post",
      params
    });
  },
  /*
  * 根据ID查找用户额度信息详情
  * */
  apiQueryId: (object_name,id) => {
    return request({
      url: "/limit/" + object_name,
      method: "get",
      params:{ id }
    });
  },
  /*
  * 分页查询用户额度列表
  * */
 apiList: (object_name, query) => {
    return request({
      url: "/limit/" + object_name,
      method: "get",
      params: query
    });
  },
  /*
  * 用户额度信息编辑
  * */
  apiUpdate: (params, object_name) => {
    return request({
      url: "/limit/" + object_name,
      method: "put",
      params
    });
  },
  /*
  * 分页查询用户额度变更列表
  * */
  apiLimitChangeList: (object_name, query) => {
    return request({
      url: "/limit/" + object_name,
      method: "get",
      params: query
    });
  }
};
