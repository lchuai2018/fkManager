import request from "@/utils/request";

export default {
  /*
  * 号码归属地添加
  * */
  apiAddPhoneLocation: (params, object_name) => {
    return request({
      url: "/locations/" + object_name,
      method: "post",
      params
    });
  },
  /*
  * 查看号码归属地详情
  * */
  apiQueryOnePhone: (object_name,id) => {
    return request({
      url: "/locations/" + object_name,
      method: "get",
      params:{ id }
    });
  },
  /*
  * 分页查询号码归属地信息
  * */
 apiQueryPagePhoneLocation: (object_name, query) => {
    return request({
      url: "/locations/" + object_name,
      method: "get",
      params: query
    });
  },
  /*
  * 修改号码归属地信息
  * */
  apiUpdatePhoneLocation: (params, object_name) => {
    return request({
      url: "/locations/" + object_name,
      method: "put",
      params
    });
  }
};
