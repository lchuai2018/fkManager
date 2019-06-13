import request from '@/utils/request'

export default {
  /*
  * 根据角色查看角色的权限菜单
  * */
  apiLoginMenu: (object_name) => {
    return request({
      url: '/menus/' + object_name,
      method: 'get'
    })
  },
  /*
  * 根据ID查找菜单信息详情
  * */
  apiId: (object_name,id) => {
    return request({
      url: '/menus/' + object_name,
      method: 'get',
      params: {id}
    })
  },
  /*
  * 添加菜单
  * */
  apiInsert: (params, object_name) => {
    return request({
      url: '/menus/' + object_name,
      method: 'post',
      params
    })
  },
  /*
  * 菜单列表
  * */
  apiList: (object_name, query) => {
    return request({
      url: '/menus/' + object_name,
      method: 'get',
      params: query
    })
  },
  /*
  * 父菜单列表
  * */
  apiParentMenuTree: (object_name) => {
    return request({
      url: '/menus/' + object_name,
      method: 'get'
    })
  },
  /*
  * 编辑菜单
  * */
  apiUpdateMenu: (params, object_name) => {
    return request({
      url: '/menus/' + object_name,
      method: 'put',
      params
    })
  },
  /*
  * 修改菜单状态
  * */
  apiUpdateMenuStatus: (params, object_name) => {
    return request({
      url: '/menus/' + object_name,
      method: 'put',
      params
    })
  },
  /*
  * 所有菜单树结构
  * */
  apiTree: (object_name) => {
    return request({
      url: '/menus/' + object_name,
      method: 'get'
    })
  }
}
