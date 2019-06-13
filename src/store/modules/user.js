import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { code } from '@/utils/index'
import Apimenu from '@/api/menu'
import router from '@/router'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    menu:[],
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      let password = code(userInfo.password)
      return new Promise((resolve, reject) => {
        login(username, password).then(response => {
          // const data = response.data
          // setToken(data)
          // commit('SET_TOKEN', data)
          sessionStorage.setItem("currentUser",response.data)
          Apimenu.apiLoginMenu('login_menu/list').then(response => {
              var menu = response.data.menuList;
              router.push({ path: menu[0].list[0].powerUrl })
          }).then()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          // const data = response.data
          // if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
          //   commit('SET_ROLES', data.roles)
          // } else {
          //   reject('getInfo: roles must be a non-null array !')
          // }
            commit('SET_NAME', response.data.accountNumber)
          // commit('SET_AVATAR', data.avatar)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout().then(() => {
          sessionStorage.removeItem('currentUser')
          // commit('SET_TOKEN', '')
          // commit('SET_ROLES', [])
          // removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
