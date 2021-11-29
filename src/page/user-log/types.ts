/*
 * @Author: legends-killer
 * @Date: 2021-11-12 15:00:50
 * @LastEditors: legends-killer
 * @LastEditTime: 2021-11-29 17:10:34
 * @Description:
 */
export interface IAuthLog {
  id: number
  userId: string | number
  createdAt: string
  device: string
  service: string
}
export interface IData {
  log: IAuthLog[]
}
