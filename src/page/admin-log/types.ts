/*
 * @Author: legends-killer
 * @Date: 2021-11-23 14:05:52
 * @LastEditors: legends-killer
 * @LastEditTime: 2021-11-23 17:23:26
 * @Description:
 */
export enum ELogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
}

export enum ELogType {
  commonErr = 'commonErr',
  agent = 'agent',
  schedule = 'schedule',
  web = 'web',
  app = 'app',
  proxy = 'proxy',
}

export interface ICommonLog {
  level: ELogLevel
  date: string
  hostname: string
  message: string
  pid?: number
  paddingMessage?: string
}

export interface IData {
  log: ICommonLog[]
}

export interface IFilter {
  type: ELogType
  level?: ELogLevel
  filter?: string
  date?: string
  timeFrom?: string
  timeTo?: string
}
