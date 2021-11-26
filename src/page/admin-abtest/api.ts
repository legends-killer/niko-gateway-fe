/*
 * @Author: legends-killer
 * @Date: 2021-11-16 21:51:27
 * @LastEditors: legends-killer
 * @LastEditTime: 2021-11-23 14:55:12
 * @Description:
 */
import apiRequestAsync from '@/tool/apiRequestAsync'
import { IData, IFilter, IAdminABTestCreate } from './types'

export const getABTest = async (params: IFilter) => {
  return await apiRequestAsync.get<IData>('/abTest', params)
}

export const createABTest = async (params: IAdminABTestCreate) => {
  return await apiRequestAsync.post<IData>('/abTest', params)
}

export const updateABTest = async (
  id: number | string,
  params: IAdminABTestCreate
) => {
  return await apiRequestAsync.put<IData>(`/abTest/${id}`, params)
}

export const deleteABTest = async (id: number | string) => {
  return await apiRequestAsync.delete<IData>(`/abTest/${id}`, {})
}
