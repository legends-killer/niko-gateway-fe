/*
 * @Author: legends-killer
 * @Date: 2021-11-23 14:05:48
 * @LastEditors: legends-killer
 * @LastEditTime: 2021-11-24 22:53:18
 * @Description:
 */
import { IFilter, IData } from './types'
import apiRequestAsync from '@/tool/apiRequestAsync'

export const getLogs = async (filter?: IFilter) => {
  return await apiRequestAsync.post<IData>('/system/log', { ...filter })
}
