import request from "@/utils/request";

export default {
  /*
  * 用户角色添加及角色分配
  * */
  apiAddManager: (params, object_name) => {
    return request({
      url: "/users/" + object_name,
      method: "post",
      params
    });
  },
  /*
  * 校验新增用户账号唯一性
  * */
  apiCheckAccount: (object_name, accountNum) => {
    return request({
      url: "/users/" + object_name,
      method: "get",
      params: {accountNum}
    });
  },
  /*
  * 导出管理用户信息
  * */
  apiExportAllManagers: (object_name, query) => {
    return request({
      url: "/users/" + object_name,
      method: "get",
      params: query
    });
  },
  /*
  * 修改系统当前登录的用户登录密码
  * */
  apiPassword: (params, object_name) => {
    return request({
      url: "/users/" + object_name,
      method: "post",
      params,
    });
  },
  /*
  * 查看所有管理用户信息
  * */
  apiSelectAllManagers: (object_name, query) => {
    return request({
      url: "/users/" + object_name,
      method: "get",
      params: query
    });
  },
  /*
  * 查看用户详情
  * */
  apiSelectOneManager: (object_name, userId) => {
    return request({
      url: "/users/" + object_name,
      method: "get",
      params: { userId }
    });
  },
  /*
  * 修改用户信息
  * */
  apiUpdateManager: (params, object_name) => {
    return request({
      url: "/users/" + object_name,
      method: "put",
      params
    });
  },
  /*
  * 批量修改用户信息
  * */
  apiUpdateManagerList: (params, object_name) => {
    return request({
      url: "/users/" + object_name,
      method: "post",
      params
    });
  }
};
