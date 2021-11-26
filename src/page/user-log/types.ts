/*
 * @Author: legends-killer
 * @Date: 2021-11-12 15:00:50
 * @LastEditors: legends-killer
 * @LastEditTime: 2021-11-23 15:04:05
 * @Description:
 */
export interface IAuthLog {
  id: number
  userId: string | number
  createdAt: string
  device: string
  servie: string
}
export interface IData {
  log: IAuthLog[]
}
