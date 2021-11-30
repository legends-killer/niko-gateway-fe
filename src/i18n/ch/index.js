/*
 * @Author: legends-killer
 * @Date: 2021-11-13 15:11:10
 * @LastEditors: legends-killer
 * @LastEditTime: 2021-12-01 01:15:30
 * @Description:
 */
import { info } from './page/info'
import { login } from './page/login'
import { nav } from './nav'
import { auth } from './page/auth'
import { userLog } from './page/userLog'
import { service } from './page/service'
import { notFound } from './page/notFound'
import { adminUser } from './page/adminUser'
import { adminApi } from './page/adminApi'
import { adminGroup } from './page/adminGroup'
import { adminBiz } from './page/adminBiz'
import { adminABTest } from './page/adminABTest'
import { adminOther } from './page/adminOther'
import { adminLog } from './page/adminLog'
import { adminSystem } from './page/adminSystem'
export const ch = {
  nav,
  page: {
    info,
    login,
    auth,
    userLog,
    service,
    notFound,
    adminUser,
    adminApi,
    adminGroup,
    adminBiz,
    adminABTest,
    adminOther,
    adminLog,
    adminSystem,
  },
  common: {
    confirm: '确认',
    cancel: '取消',
    search: '搜索',
    on: '开启',
    off: '关闭',
    yes: '是',
    no: '否',
    save: '保存',
    update: '更新',
    delete: '删除',
    success: '操作成功',
    error: '操作失败',
    new: '新增',
    paramsError: '请检查参数再试',
    hr: '小时',
    min: '分钟',
    sec: '秒',
  },
}
