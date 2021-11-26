/*
 * @Author: legends-killer
 * @Date: 2021-11-10 15:22:48
 * @LastEditors: legends-killer
 * @LastEditTime: 2021-11-15 12:42:59
 * @Description: Global React Context API
 */

import { createContext } from 'react'

export const isAdminContext = createContext<{
  state: boolean
  dispatch: (newVal: boolean) => void
}>({ state: false, dispatch: () => {} })

export const isAdminReducer = (state: boolean, newVal: boolean) => {
  return newVal
}

export const userPerferenceLanguageContext = createContext<{
  language: string
  dispatchLanguage: (newVal: string) => void
}>({ language: 'zh-CN', dispatchLanguage: () => {} })

export const userPerferenceLanguageReducer = (
  language: string,
  newVal: string
) => {
  localStorage.setItem('language', newVal)
  return newVal
}
