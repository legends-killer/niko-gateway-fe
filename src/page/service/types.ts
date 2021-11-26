/*
 * @Author: legends-killer
 * @Date: 2021-11-13 13:07:20
 * @LastEditors: legends-killer
 * @LastEditTime: 2021-11-23 15:03:06
 * @Description:
 */
export interface IUserBizService {
  id: number
  name: string
  comment: string
  isOpen: boolean
  url: string
}

export interface IData {
  biz: IUserBizService[]
}
