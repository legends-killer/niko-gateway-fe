/*
 * @Author: legends-killer
 * @Date: 2021-11-21 14:30:18
 * @LastEditors: legends-killer
 * @LastEditTime: 2021-11-29 16:49:00
 * @Description:
 */
export interface ICacheRefreshData {}

export enum ECacheName {
  API = 'api',
  USER = 'user',
  BIZ = 'biz',
}

export interface ISystemInfoData {
  info: ISystemInfo
}

export interface ISystemInfo {
  startedAt: Date
  warn: number
  error: number
  cache: {
    api: ICacheBaseInfo
    biz: ICacheBaseInfo
    user: ICacheBaseInfo
  }
  proxyInfo: IProxyInfo
}

export interface ICacheBaseInfo {
  total: number
  missed: number
  syncAt: Date
  hitRate: number
}
export interface IProxyInfo {
  proxy: number
  proxyWarn: number
  proxyError: number
  test: number
  testWarn: number
  testError: number
}
