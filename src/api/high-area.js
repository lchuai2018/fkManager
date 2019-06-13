import request from "@/utils/request";

export default {
  /*
  * 录入高危地区信息
  * */
  apiInsert: (params, object_name) => {
    return request({
      url: "/highs/" + object_name,
      method: "post",
      params
    });
  },
  /*
  * 高危地区类型树
  * */
  apiTree: (object_name) => {
    return request({
      url: "/highs/" + object_name,
      method: "get",
    });
  },
  /*
  * 根据ID查找高危地区信息详情
  * */
  apiQueryId: (object_name,id) => {
    return request({
      url: "/highs/" + object_name,
      method: "get",
      params:{ id }
    });
  },
  /*
  * 分页查询高危地区列表
  * */
 apiList: (object_name, query) => {
    return request({
      url: "/highs/" + object_name,
      method: "get",
      params: query
    });
  },
  /*
  * 高危地区信息编辑
  * */
  apiUpdate: (params, object_name) => {
    return request({
      url: "/highs/" + object_name,
      method: "put",
      params
    });
  },
  /*
  * 调整高危配置项状态
  * */
  apiUpdateStatus: (params, object_name) => {
    return request({
      url: "/highs/" + object_name,
      method: "put",
      params
    });
  }
};
