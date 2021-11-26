/*
 * @Author: legends-killer
 * @Date: 2021-11-16 21:53:08
 * @LastEditors: legends-killer
 * @LastEditTime: 2021-11-23 14:51:28
 * @Description:
 */
export interface IAdminABTest {
  id: number
  method: string
  origin: string
  suspend: boolean
  increase: number
  current: number
  timeGap: number
  createdAt: Date
  updatedAt: Date
  comment: string
  server: string
  dest: string
}

export interface IData {
  test: IAdminABTest[]
  count: number
}

export interface IFilter {
  id?: number | string
  origin?: string
  method?: string
  comment?: string
}

export interface IAdminABTestCreate {
  origin: string
  method: string
  suspend: boolean
  increase: number
  current: number
  timeGap: number
  server: string
  dest: string
}

export enum EDrawerUseType {
  CREATE = 'create',
  MODIFY = 'modify',
}
