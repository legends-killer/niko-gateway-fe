/*
 * @Author: legends-killer
 * @Date: 2021-11-13 15:03:51
 * @LastEditors: legends-killer
 * @LastEditTime: 2021-12-01 01:15:41
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
export const en = {
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
    confirm: 'Confirm',
    cancel: 'Cancel',
    search: 'Search',
    on: 'On',
    off: 'Off',
    yes: 'Yes',
    no: 'No',
    save: 'Save',
    update: 'Update',
    delete: 'Delete',
    success: 'Success',
    error: 'Operation Faild',
    new: 'New',
    paramsError: 'Params Error, Please check and try again',
    hr: 'Hour(s)',
    min: 'Minute(s)',
    sec: 'Second(s)',
  },
}
