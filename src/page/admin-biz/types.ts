/*
 * @Author: legends-killer
 * @Date: 2021-11-16 21:53:08
 * @LastEditors: legends-killer
 * @LastEditTime: 2021-11-23 14:55:39
 * @Description:
 */
export interface IAdminBiz {
  id: number
  name: string
  comment: string
  url: string
  api: string
  allowGroup: number[]
  isOpen: boolean
  createdAt: Date
  updatedAt: Date
  isPublic: boolean
}

export interface IData {
  biz: IAdminBiz[]
  count: number
}

export interface IFilter {
  id?: number | string
  name?: string
  comment?: string
}

export interface IAdminBizCreate {
  name: string
  url: string
  comment?: string
  allowGroup: number[]
  isOpen?: boolean
  isPublic?: boolean
}

export interface IGroup {
  id: number
  name: string
  comment: string
  defalut: boolean
}

export interface IGroupData {
  group: IGroup[]
  count: number
}

export enum EDrawerUseType {
  CREATE = 'create',
  MODIFY = 'modify',
}
