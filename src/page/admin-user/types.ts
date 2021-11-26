/*
 * @Author: legends-killer
 * @Date: 2021-11-14 20:38:13
 * @LastEditors: legends-killer
 * @LastEditTime: 2021-11-26 21:43:04
 * @Description:
 */
export interface IAdminUser {
  id: number
  staffName: string
  staffId: string
}

export interface IData {
  user: IAdminUser[]
  count: number
}

export interface IFilter {
  id?: string | number
  staffId?: string
  staffName?: string
}

export interface IPage {
  page: number
  ipp: number
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

export interface IUGMapCreateItem {
  groupId: number
  userId: number
}

export interface IUGMapData {
  group: {
    group: IGroup[]
    count: number
  }
  map: {
    idMap: {
      id: number
      userId: string
      groupId: string
    }[]
    count: number
  }
}
