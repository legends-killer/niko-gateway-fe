/*
 * @Author: legends-killer
 * @Date: 2021-11-14 01:51:10
 * @LastEditors: legends-killer
 * @LastEditTime: 2021-11-14 15:39:33
 * @Description:
 */
import { resources, defaultNS } from './index'

// react-i18next versions higher than 11.11.0
declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS
    resources: typeof resources['zh-CN']
  }
}
