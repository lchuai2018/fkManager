import request from "@/utils/request";

export default {
  /*
  * 系统app信息添加
  * */
  apiAddSysApp: (params, object_name) => {
    return request({
      url: "/sysapps/" + object_name,
      method: "post",
      params
    });
  },
  /*
  * 查看系统app详情
  * */
  apiQueryOneSysApp: (object_name,id) => {
    return request({
      url: "/sysapps/" + object_name,
      method: "get",
      params:{ id }
    });
  },
  /*
  * 分页查询系统APP信息
  * */
 apiQueryPageSysApp: (object_name, query) => {
    return request({
      url: "/sysapps/" + object_name,
      method: "get",
      params: query
    });
  },
  /*
  * 修改系统app信息
  * */
  apiUpdateSysApp: (params, object_name) => {
    return request({
      url: "/sysapps/" + object_name,
      method: "put",
      params
    });
  }
};
