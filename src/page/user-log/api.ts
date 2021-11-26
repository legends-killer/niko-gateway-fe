/*
 * @Author: legends-killer
 * @Date: 2021-11-12 15:00:53
 * @LastEditors: legends-killer
 * @LastEditTime: 2021-11-23 15:04:23
 * @Description:
 */
import apiRequestAsync from '@/tool/apiRequestAsync'
import { IData } from './types'

export const getAuthLog = async () => {
  return await apiRequestAsync.get<IData>('/info/log', {})
}
