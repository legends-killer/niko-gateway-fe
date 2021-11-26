/*
 * @Author: legends-killer
 * @Date: 2021-11-16 21:51:27
 * @LastEditors: legends-killer
 * @LastEditTime: 2021-11-23 14:57:05
 * @Description:
 */
import apiRequestAsync from '@/tool/apiRequestAsync'
import { IData, IFilter, IAdminGroupCreate } from './types'

export const getGroupList = async (params: IFilter) => {
  return await apiRequestAsync.get<IData>('/group', params)
}

export const createGroup = async (params: IAdminGroupCreate) => {
  return await apiRequestAsync.post<IData>('/group', params)
}

export const updateGroup = async (
  id: number | string,
  params: IAdminGroupCreate
) => {
  return await apiRequestAsync.put<IData>(`/group/${id}`, params)
}

export const deleteGroup = async (id: number | string) => {
  return await apiRequestAsync.delete<IData>(`/group/${id}`, {})
}
