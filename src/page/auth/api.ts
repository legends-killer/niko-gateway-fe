/*
 * @Author: legends-killer
 * @Date: 2021-11-10 12:11:41
 * @LastEditors: legends-killer
 * @LastEditTime: 2021-11-23 15:01:30
 * @Description:
 */
import apiRequestAsync from '@/tool/apiRequestAsync'
import { IData } from './types'
import device from 'current-device'

export const casAuthReq = async (ticket: string) => {
  return await apiRequestAsync.post<IData>(
    `/auth?ticket=${ticket}&device=${device.type + ' ' + device.os}&service=${
      localStorage.getItem('service') || ''
    }`,
    {}
  )
}
