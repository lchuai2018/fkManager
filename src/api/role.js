import request from '@/utils/request'

export default {
  /*
  * 赋予角色权限
  * */
  apiAddRoleToMenus: (object_name, params) => {
    return request({
      url: '/roles/' + object_name,
      method: 'post',
      params
    })
  },
  /*
  * 新增角色
  * */
  apiInsert: (object_name, params) => {
    return request({
      url: '/roles/' + object_name,
      method: 'post',
      params
    })
  },
  /*
  * 查看所有角色
  * */
  apiSelectAllRole: object_name => {
    return request({
      url: '/roles/' + object_name,
      method: 'get'
    })
  },
  /*
  * 账号管理查看所有角色
  * */
  apiTreeList: object_name => {
    return request({
      url: '/roles/' + object_name,
      method: 'get'
    })
  },
  /*
  * 修改角色权限
  * */
  apiUpdateManager: (object_name, params) => {
    return request({
      url: '/roles/' + object_name,
      method: 'post',
      params
    })
  },
  /*
  * 根据角色ID查看角色信息
  * */
  apiRoleId: (params) => {
    return request({
      url: '/roles/' + params,
      method: 'get'
    })
  }
}
