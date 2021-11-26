/*
 * @Author: legends-killer
 * @Date: 2021-11-14 20:38:04
 * @LastEditors: legends-killer
 * @LastEditTime: 2021-11-26 21:40:53
 * @Description:
 */
import apiRequestAsync from '@/tool/apiRequestAsync'
import { IData, IGroupData, IUGMapCreateItem, IUGMapData } from './types'

export const getAdminUser = async (params: {
  page: number
  ipp: number
  id?: number | string
  staffId?: string
  staffName?: string
}) => {
  return await apiRequestAsync.get<IData>('/user', params)
}

export const getAllGroup = async () => {
  return await apiRequestAsync.get<IGroupData>('/group', {})
}

export const addUserGroupMap = async (params: { map: IUGMapCreateItem[] }) => {
  return await apiRequestAsync.post<IData>('/userGroupMap', params)
}

export const getUserGroupMap = async (params: { userId: number | string }) => {
  return await apiRequestAsync.get<IUGMapData>('/userGroupMap', params)
}

/**
 * @param params {id: string} use ',' to spilt ids
 * @returns
 */
export const deleteUserGroupMap = async (params: { id: string }) => {
  return await apiRequestAsync.delete<IData>('/userGroupMap/1', params)
}
