import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  // {
  //   path: '/personal',
  //   component: Layout,
  //   redirect: '/personal/index',
  //   hidden: true,
  //   name: '个人中心',
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'personal',
  //       component: () => import('@/views/personal/index'),
  //       meta: {
  //         title: '个人中心'
  //       },
  //       hidden: true
  //     }]
  // },
  { path: '/', component: () => import('@/views/login/index'), hidden: true },
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  // { path: '/index', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  {
    path: '/adminMember',
    component: Layout,
    redirect: '/adminMember/account',
    meta: { title: '人员配置', icon: 'example' },
    name: '人员配置',
    children: [
      {
        path: 'account',
        name: 'account',
        component: () => import('@/views/admin/member/account'),
        meta: { title: '账号管理' }
      },
      {
        path: 'role',
        name: 'role',
        component: () => import('@/views/admin/member/role'),
        meta: { title: '角色管理' }
      },
      {
        path: 'menu',
        name: 'menu',
        component: () => import('@/views/admin/member/menu'),
        meta: { title: '菜单管理' }
      }
    ]
  },

  {
    path: '/adminProduct',
    component: Layout,
    redirect: '/adminProduct/index',
    meta: { title: '产品配置', icon: 'example' },
    name: '产品配置',
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('@/views/admin/product/index'),
        meta: { title: '产品管理' }
      },
      {
        path: 'merchant',
        name: 'merchant',
        component: () => import('@/views/admin/product/merchant'),
        meta: { title: '商户管理' }
      },
      {
        path: 'channel',
        name: 'channel',
        component: () => import('@/views/admin/product/channel'),
        meta: { title: '产品渠道管理' }
      }
    ]
  },
  {
    path: '/adminStrategy',
    component: Layout,
    redirect: '/adminStrategy/index',
    meta: { title: '策略配置', icon: 'example' },
    name:"风控策略配置",
    children: [
      {
        path: 'index',
        name: '风控策略管理',
        component: () => import('@/views/admin/strategy/index'),
        meta: { title: '策略管理' }
      }
    ]
  },
  {
    path: '/adminModel',
    component: Layout,
    redirect: '/adminModel/index',
    meta: { title: '模型配置', icon: 'example' },
    name: '模型配置',
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('@/views/admin/model/index'),
        meta: { title: '模型管理' }
      }
    ]
  },

  {
    path: '/userOrder',
    component: Layout,
    redirect: '/userOrder/index',
    meta: { title: '订单管理', icon: 'example' },
    name: '订单管理',
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('@/views/user/order/index'),
        meta: { title: '订单列表' }
      },
      {
        path: 'modelScore',
        name: 'modelScore',
        component: () => import('@/views/user/order/modelScore'),
        meta: { title: '订单模型分管理' }
      },
      {
        path: 'loan',
        name: 'loan',
        component: () => import('@/views/user/order/loan'),
        meta: { title: '订单贷后管理' }
      }
    ]
  },

  {
    path: '/userStrategy',
    component: Layout,
    redirect: '/userStrategy/index',
    meta: { title: '策略配置', icon: 'example' },
    name:"产品策略配置",
    children: [
      {
        path: 'index',
        name: '产品策略管理',
        component: () => import('@/views/user/strategy/index'),
        meta: { title: '策略管理' }
      },
      {
        path: 'model',
        name: 'model',
        component: () => import('@/views/user/strategy/model'),
        meta: { title: '模型管理'}
      }
    ]
  },
  {
    path: '/system',
    component: Layout,
    redirect: '/system/item',
    meta: { title: '系统管理', icon: 'safe' },
    name:"系统安全管理",
    children: [
      {
        path: 'item',
        name: '配置项管理',
        component: () => import('@/views/system/item'),
        meta: { title: '配置项管理' }
      },
      {
        path: 'log',
        name: 'log',
        component: () => import('@/views/system/log'),
        meta: { title: '操作日志管理'}
      },
      {
        path: 'blacklist',
        name: 'blacklist',
        component: () => import('@/views/system/blacklist'),
        meta: { title: '黑名单管理'}
      },
      { 
        path: 'whitelist',
        name: 'whitelist',
        component: () => import('@/views/system/whitelist'),
        meta: { title: 'Ip白名单管理'}
      },
      {
        path: 'switch',
        name: 'switch',
        component: () => import('@/views/system/switch'),
        meta: { title: '进单开关'}
      },
      {
        path: 'auth',
        name: 'auth',
        component: () => import('@/views/system/auth'),
        meta: { title: '产品AUTH管理'}
      },
      {
        path: 'productOverdue',
        name: 'productOverdue',
        component: () => import('@/views/system/productOverdue'),
        meta: { title: '产品逾期管理'}
      }
    ]
  },
  {
    path: '/systemData',
    component: Layout,
    redirect: '/systemData/app',
    meta: { title: '数据配置', icon: 'safe' },
    name:"数据配置",
    children: [
      {
        path: 'app',
        name: '系统APP管理',
        component: () => import('@/views/system/app'),
        meta: { title: '系统APP管理' }
      },
      {
        path: 'phoneLocation',
        name: '号码归属地管理',
        component: () => import('@/views/system/phoneLocation'),
        meta: { title: '号码归属地管理'}
      },
      {
        path: 'highArea',
        name: '高危地区管理',
        component: () => import('@/views/system/highArea'),
        meta: { title: '高危地区管理'}
      }
    ]
  },
  {
    path: '/userinfo',
    component: Layout,
    redirect: '/userinfo/limit',
    meta: { title: '用户信息管理', icon: 'safe' },
    name:"用户信息管理",
    children: [
      {
        path: 'limit',
        name: '用户额度管理',
        component: () => import('@/views/userinfo/limit'),
        meta: { title: '用户额度管理' }
      },
      {
        path: 'userWhite',
        name: '用户白名单管理',
        component: () => import('@/views/userinfo/userWhite'),
        meta: { title: '用户白名单管理'}
      },
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
