/*
 * @Author: legends-killer
 * @Date: 2021-11-16 21:53:08
 * @LastEditors: legends-killer
 * @LastEditTime: 2021-11-23 14:56:57
 * @Description:
 */
export interface IAdminGroup {
  id: number
  name: string
  comment: string
  default: boolean
  createdAt: Date
  updatedAt: Date
}

export interface IData {
  group: IAdminGroup[]
  count: number
}

export interface IFilter {
  id?: number | string
  name?: string
  comment?: string
}

export interface IAdminGroupCreate {
  name: string
  comment: string
  default?: boolean
}

export enum EDrawerUseType {
  CREATE = 'create',
  MODIFY = 'modify',
}
