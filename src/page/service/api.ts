/*
 * @Author: legends-killer
 * @Date: 2021-11-13 13:07:17
 * @LastEditors: legends-killer
 * @LastEditTime: 2021-11-23 15:03:21
 * @Description:
 */
import { IData } from './types'
import apiRequestAsync from '@/tool/apiRequestAsync'

export const getUserBizService = async () => {
  return await apiRequestAsync.get<IData>('/info/biz', {})
}
