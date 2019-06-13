import request from '@/utils/request'

export function login(accountNum, password) {
  return request({
    url: '/login',
    method: 'post',
    params: {
      accountNum,
      password
    }
  })
}

export function getInfo() {
  return request({
    url: '/login/current_user',
    method: 'get',
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: 'get'
  })
}
