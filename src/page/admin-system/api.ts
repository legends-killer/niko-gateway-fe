/*
 * @Author: legends-killer
 * @Date: 2021-11-30 21:27:06
 * @LastEditors: legends-killer
 * @LastEditTime: 2021-11-30 21:27:06
 * @Description:
 */

import apiRequestAsync from '@/tool/apiRequestAsync'
import { ISystemConfigData, ISystemSetting, SystemSettingKey } from './types'

export const getSystemConfig = async () => {
  return await apiRequestAsync.get<ISystemConfigData>('/system/config', {})
}

export const updateSystemConfig = async (
  key: SystemSettingKey,
  value: Partial<ISystemSetting>
) => {
  return await apiRequestAsync.put<ISystemConfigData>('/system/config', {
    key,
    value,
  })
}
