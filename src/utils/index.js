/**
 * Created by jiachenpan on 16/11/18.
 */

let Base64 = require('js-base64').Base64

export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

export function formatTime(time, option) {
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}


// Base 编码处理

export function code(password){
  // console.log(Base64.encode('123456'))
  var sn = 'risk_back_b4rrdbde8';
  var basePass = Base64.encode(password);
  var snLen = sn.length;
  var snNum = [];
  for(let i = 0;i<basePass.length;i++){
    snNum[i] = basePass.charCodeAt(i) ^ sn.charCodeAt(i % snLen);
  }
  var temp;
  var result='';
  for(let k = 0;k<basePass.length;k++){
    temp = String(snNum[k]);
    while((5-temp.length)>0){
      temp = '0'+temp
    }
    result+=temp;
  }
  return Base64.encode(result)
}

// 导出下载
export function genUrl(uri, data, keys) {
  // const HOST = `${process.env.BASE_API}`
  const HOST = 'http://172.17.6.228:3031/'
  let url = new URL(HOST + 'api/' + uri)
  if (keys && keys.length) {
    for (let key of keys) {
      if (data[key] !== undefined && data[key] !== null) url.searchParams.append(key, data[key])
    }
  } else {
    for (let key in data) {
      if (data[key] !== undefined && data[key] !== null) url.searchParams.append(key, data[key])
    }
  }
  console.log(url.toString())
  return url.toString()
}

export function openUrl(uri, data, keys){
  window.open(genUrl(uri, data, keys))
}