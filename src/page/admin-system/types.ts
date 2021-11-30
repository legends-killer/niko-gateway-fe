/*
 * @Author: legends-killer
 * @Date: 2021-11-30 21:26:53
 * @LastEditors: legends-killer
 * @LastEditTime: 2021-11-30 23:45:01
 * @Description:
 */

export enum ScheduleName {
  apiCache = 'apiCache',
  bizCache = 'bizCache',
  userCache = 'userCache',
  abTest = 'abTest',
  systemInfo = 'systemInfo',
  systemInfoCache = 'systemInfoCache',
  errorDetector = 'errorDetector',
}

export enum SystemSettingKey {
  errorEmail = 'errorEmail',
  accessKey = 'accessKey',
  scheduleInterval = 'scheduleInterval',
  systemErrorReport = 'systemErrorReport',
  proxyErrorReport = 'proxyErrorReport',
  abTestErrorReport = 'abTestErrorReport',
}

export interface ISystemSettingEmail {
  user: string
  password: string
  host: string
  sender: string
  sendTo: string[]
}

export interface ISystemSettingErrorReport {
  enable: boolean
  muteUntil?: Date
  timeThreshold: number
  warnThreshold: number
  errorThreshold: number
}

export type ISystemSettingSchedule = {
  [index in ScheduleName]: { interval: string; enable: boolean }
}

export interface ISystemSettingAccessKey {
  enable: boolean
  key: string
}
export interface ISystemSetting
  extends ISystemSettingEmail,
    ISystemSettingErrorReport,
    ISystemSettingSchedule,
    ISystemSettingAccessKey {}

export interface ISystemConfig {
  id: number
  key: SystemSettingKey
  value: Partial<ISystemSetting>
  comment: string
  createdAt: Date
  updatedAt: Date
}

export interface ISystemConfigData {
  config: ISystemConfig[]
}
