/*
 * @Author: legends-killer
 * @Date: 2021-11-10 15:29:37
 * @LastEditors: legends-killer
 * @LastEditTime: 2021-11-24 02:26:55
 * @Description:
 */
import { IData, IGroupData } from './types'
import apiRequestAsync from '@/tool/apiRequestAsync'

export const getUserInfo = async () => {
  return await apiRequestAsync.get<IData>('/info', {})
}

export const getGroup = async () => {
  return await apiRequestAsync.get<IGroupData>('/info/group', {})
}
