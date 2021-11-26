/*
 * @Author: legends-killer
 * @Date: 2021-11-10 15:29:41
 * @LastEditors: legends-killer
 * @LastEditTime: 2021-11-26 21:42:37
 * @Description:
 */
export interface IData {
  id: number
  accessTokenExp: string
  staffId: string
  staffName: string
  group: number[]
}

export interface IGroupData {
  groupMap: { id: number; name: string; comment: string }[]
}
