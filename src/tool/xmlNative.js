/*
 * @Author: legends-killer
 * @Date: 2021-11-09 22:39:25
 * @LastEditors: legends-killer
 * @LastEditTime: 2021-12-01 14:16:34
 * @Description:
 */
const xmlNative = (opt) => {
  opt = opt || {}
  opt.method = opt.method.toUpperCase() || 'POST'
  opt.url = opt.url || ''
  opt.async = opt.async || true
  opt.data = opt.data || null
  opt.success = opt.success || function () {}
  let xmlHttp = new XMLHttpRequest()
  return new Promise((resolve, reject) => {
    if (
      opt.method.toUpperCase() === 'POST' ||
      opt.method.toUpperCase() === 'PUT'
    ) {
      xmlHttp.open(opt.method, opt.url, opt.async)
      xmlHttp.setRequestHeader(
        'Content-Type',
        'application/json; charset=utf-8'
      )
      xmlHttp.setRequestHeader(
        'Authorization',
        sessionStorage.getItem('token') || localStorage.getItem('token')
      )
      xmlHttp.send(JSON.stringify(opt.data))
      xmlHttp.onreadystatechange = () => {
        if (xmlHttp.readyState === 4) {
          resolve(xmlHttp.responseText)
        } else {
          return
        }
      }
    } else if (
      opt.method.toUpperCase() === 'GET' ||
      opt.method.toUpperCase() === 'DELETE'
    ) {
      let params = []
      for (let key in opt.data) {
        params.push(key + '=' + opt.data[key])
      }
      let postData = params.join('&')
      xmlHttp.open(opt.method, opt.url + '?' + postData, opt.async)
      xmlHttp.setRequestHeader(
        'Content-Type',
        'application/json; charset=utf-8'
      )
      xmlHttp.setRequestHeader(
        'Authorization',
        sessionStorage.getItem('token') || localStorage.getItem('token')
      )
      xmlHttp.send(null)
      xmlHttp.onreadystatechange = () => {
        if (xmlHttp.readyState === 4) {
          resolve(xmlHttp.responseText)
        } else {
          return
        }
      }
    }
  })
}
export default xmlNative
