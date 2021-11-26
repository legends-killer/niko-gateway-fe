/*
 * @Author: legends-killer
 * @Date: 2021-11-14 20:38:04
 * @LastEditors: legends-killer
 * @LastEditTime: 2021-11-23 19:00:16
 * @Description:
 */
import apiRequestAsync from '@/tool/apiRequestAsync'
import { IData, IFilter, IAdminApiCreate, IGroupData, IBizData } from './types'

interface IParams extends IFilter {
  page: number
  ipp: number
}

export const getAdminApi = async (params: IParams) => {
  return await apiRequestAsync.get<IData>('/request', params)
}

export const createAdminApi = async (params: IAdminApiCreate) => {
  return await apiRequestAsync.post<IData>('/request', params)
}

export const updateAdminApi = async (
  id: number | string,
  params: IAdminApiCreate
) => {
  return await apiRequestAsync.put<IData>(`/request/${id}`, params)
}

export const deleteAdminApi = async (id: number | string) => {
  return await apiRequestAsync.delete<IData>(`/request/${id}`, {})
}

export const getAllGroup = async () => {
  return await apiRequestAsync.get<IGroupData>('/group', {})
}

export const getAllBiz = async () => {
  return await apiRequestAsync.get<IBizData>('/biz', {})
}
