/*
 * @Author: legends-killer
 * @Date: 2021-11-21 14:30:18
 * @LastEditors: legends-killer
 * @LastEditTime: 2021-11-23 14:57:50
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
  abTest: ICacheABTestInfo
}

export interface ICacheBaseInfo {
  total: number
  missed: number
  syncAt: Date
  hitRate: number
}
export interface ICacheABTestInfo {
  current: number
  warn: number
  error: number
  fallback: number
  success: number
}
