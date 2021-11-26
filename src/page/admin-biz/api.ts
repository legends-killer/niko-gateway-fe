/*
 * @Author: legends-killer
 * @Date: 2021-11-16 21:51:27
 * @LastEditors: legends-killer
 * @LastEditTime: 2021-11-23 14:56:31
 * @Description:
 */
import apiRequestAsync from '@/tool/apiRequestAsync'
import { IData, IFilter, IAdminBizCreate, IGroupData } from './types'

export const getBizList = async (params: IFilter) => {
  return await apiRequestAsync.get<IData>('/biz', params)
}

export const createBiz = async (params: IAdminBizCreate) => {
  return await apiRequestAsync.post<IData>('/biz', params)
}

export const updateBiz = async (
  id: number | string,
  params: IAdminBizCreate
) => {
  return await apiRequestAsync.put<IData>(`/biz/${id}`, params)
}

export const deleteBiz = async (id: number | string) => {
  return await apiRequestAsync.delete<IData>(`/biz/${id}`, {})
}

export const getAllGroup = async () => {
  return await apiRequestAsync.get<IGroupData>('/group', {})
}
