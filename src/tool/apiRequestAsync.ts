/*
 * @Author: legends-killer
 * @Date: 2021-11-24 00:56:35
 * @LastEditors: legends-killer
 * @LastEditTime: 2021-11-30 00:17:39
 * @Description:
 */
import xmlNative from './xmlNative'
import { Message } from '@arco-design/web-react'
import { server } from '@/prod.config.js'
import * as lodash from 'lodash'

interface IBaseRes<T> {
  data?: T
  code: number
  msg: string
  error: number | string
}

const showErr = lodash.throttle(
  (err?: any) => {
    if (!err) Message.error('网络错误')
    else Message.error(err)
  },
  1000,
  { leading: true, trailing: false }
)

const ajax = async (url: any, method: any, data: any) => {
  if (process.env.NODE_ENV !== 'production') url = 'http://127.0.0.1:7001' + url
  else url = server + url
  const res = await xmlNative({
    method,
    url,
    data,
  })
  // 服务器无响应
  if (!res) {
    showErr()
    return {}
  }
  // 有返回值
  const obj = JSON.parse(res || '{}')

  if (obj.error !== 0) {
    if (obj.code === 42200) showErr('参数错误')
    else showErr('' || obj.error || '未知错误')
  }
  return obj
}
const apiRequestAsync = {
  get: async <T>(apiName: string, data: any): Promise<IBaseRes<T>> => {
    return await ajax(apiName, 'get', data)
  },
  post: async <T>(apiName: string, data: any): Promise<IBaseRes<T>> => {
    return await ajax(apiName, 'post', data)
  },
  put: async <T>(apiName: string, data: any): Promise<IBaseRes<T>> => {
    return await ajax(apiName, 'put', data)
  },
  delete: async <T>(apiName: string, data: any): Promise<IBaseRes<T>> => {
    return await ajax(apiName, 'delete', data)
  },
}
export default apiRequestAsync
