/*
 * @Author: legends-killer
 * @Date: 2021-11-21 14:54:28
 * @LastEditors: legends-killer
 * @LastEditTime: 2021-11-29 16:56:07
 * @Description:
 */

export const adminOther = {
  title: 'Other Config',
  day: 'day(s) before',
  min: 'min(s) before',
  tab: {
    cache: {
      title: 'Cache Config',
    },
    cluster: {
      title: 'Cluster Config',
    },
    info: {
      title: 'System Info',
    },
  },
  content: {
    cache: {
      biz: {
        title: 'Micro Service Cache',
        total: 'Biz Total Req',
        missed: 'Biz Cache Missed',
        syncAt: 'Sync Time',
        hitRate: 'Hit Rate',
      },
      api: {
        title: 'API Cache',
        total: 'API Total Req',
        missed: 'API Cache Missed',
        syncAt: 'Sync Time',
        hitRate: 'Hit Rate',
      },
      user: {
        title: 'User Info Cache',
        syncAt: 'Sync Time',
      },
      refresh: 'Refresh',
    },
    abTest: {
      current: 'AB Test Total',
      warn: 'AB Test Biz Err',
      error: 'AB Test Server Err',
    },
    proxy: {
      current: 'Proxy Total',
      warn: 'Proxy Biz Err',
      error: 'Proxy Server Err',
    },
    sys: {
      time: 'System Started',
      warn: 'System Warning',
      error: 'System Error',
    },
    cluster: {
      btn: 'Reload Worker',
      title: 'Are You Sure To Reload Worker?',
    },
  },
}
