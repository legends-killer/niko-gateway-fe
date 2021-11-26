/*
 * @Author: legends-killer
 * @Date: 2021-11-21 14:27:38
 * @LastEditors: legends-killer
 * @LastEditTime: 2021-11-23 14:58:39
 * @Description:
 */
import apiRequestAsync from '@/tool/apiRequestAsync'
import { ICacheRefreshData, ECacheName, ISystemInfoData } from './types'

export const refreshCache = async (cache: ECacheName) => {
  return await apiRequestAsync.post<ICacheRefreshData>(
    '/system/cache/' + cache,
    {}
  )
}

export const getSystemInfo = async () => {
  return await apiRequestAsync.get<ISystemInfoData>('/system/info', {})
}

export const reloadWorker = async () => {
  return await apiRequestAsync.post<ICacheRefreshData>('/system/reload', {})
}
