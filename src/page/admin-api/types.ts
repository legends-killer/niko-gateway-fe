/*
 * @Author: legends-killer
 * @Date: 2021-11-14 20:38:13
 * @LastEditors: legends-killer
 * @LastEditTime: 2021-11-25 02:17:23
 * @Description:
 */
enum RequestMethod {
  POST = 'post',
  GET = 'get',
  PUT = 'put',
  DELETE = 'delete',
}

export interface IAdminApi {
  id: number
  comment: string
  allowGroup: number[]
  method: RequestMethod
  origin: string
  server: string
  dest: string
  switch: boolean
  abTest: boolean
  createdAt: Date
  updatedAt: Date
  isPublic: boolean
  customHeader: { [index: string]: string }
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

export interface IBizData {
  biz: IAdminBiz[]
  count: number
}

export interface IData {
  api: IAdminApi[]
  count: number
}

export interface IFilter {
  id?: string | number
  comment?: string
  origin?: string
  server?: string
  dest?: string
  method?: RequestMethod
}

export interface IPage {
  page: number
  ipp: number
}

export interface IAdminApiCreate {
  id: number
  comment: string
  allowGroup: number[]
  method: RequestMethod
  origin: string
  server: string
  dest: string
  switch: boolean
  abTest: boolean
  isPublic: boolean
  customHeader: { [index: string]: string }
}

export enum EDrawerUseType {
  CREATE = 'create',
  MODIFY = 'modify',
}
