/*
 * @Author: legends-killer
 * @Date: 2021-11-09 22:39:25
 * @LastEditors: legends-killer
 * @LastEditTime: 2021-11-10 11:41:38
 * @Description:
 */
import xmlNative from './xmlNative'

const ajax = (url, method, data, successCB, errorCB) => {
  let dataJson = {
    version: '1.0.0',
    data: data,
  }
  return xmlNative({
    method: method,
    url: url,
    data: dataJson,
    success: (data, status) => {
      if (data.code === 0) {
        successCB && successCB(data, status)
      } else {
        errorCB ? errorCB(data, status) : console.log(data, status)
      }
    },
    error: (data, status) => console.log(status, status),
  })
}
const apiRequest = {
  get: (apiName, data, successCB, errorCB) =>
    ajax(
      apiName,
      'get',
      data,
      (data) => successCB && successCB(data.data, data.systemDate),
      errorCB
    ),
  post: (apiName, data, successCB, errorCB) =>
    ajax(
      apiName,
      'post',
      data,
      (data) => successCB && successCB(data.data, data.systemDate),
      errorCB
    ),
}
export default apiRequest
