import request from "@/utils/request";

export default {
  /*
  * 根据id查找配置项
  * */
  apiInfo: (object_name, id) => {
    return request({
      url: "/configs/" + object_name,
      method: "get",
      params: { id }
    });
  },
  /*
  * 新增配置项
  * */
  apiInsert: (params, object_name) => {
    return request({
        url: "/configs/" + object_name,
        method: "post",
        params
    });
  },
  /*
  * 根据条件查找配置项
  * */
  apiList: (object_name, query) => {
    return request({
      url: "/configs/" + object_name,
      method: "get",
      params: query
    });
  },
  /*
  * 配置类型筛选
  * */
  apiTypeTreeList: (object_name) => {
    return request({
      url: "/configs/" + object_name,
      method: "get"
    });
  },
  /*
  * 修改配置项数据
  * */
  apiUpdateInfo: (params, object_name) => {
    return request({
      url: "/configs/" + object_name,
      method: "put",
      params
    });
  },
  /*
  * 修改配置项状态
  * */
  apiUpdateStatus: (params, object_name) => {
    return request({
        url: "/configs/" + object_name,
        method: "put",
        params
    });
  },
};
