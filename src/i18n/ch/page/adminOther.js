/*
 * @Author: legends-killer
 * @Date: 2021-11-21 14:54:28
 * @LastEditors: legends-killer
 * @LastEditTime: 2021-11-22 20:38:57
 * @Description:
 */

export const adminOther = {
  title: '其他配置',
  day: '天前',
  min: '分钟前',
  tab: {
    cache: {
      title: '缓存配置',
    },
    cluster: {
      title: '集群配置',
    },
    info: {
      title: '系统信息',
    },
  },
  content: {
    cache: {
      biz: {
        title: '微服务缓存',
        total: '微服务请求总数',
        missed: '微服务未命中缓存',
        syncAt: '同步时间',
        hitRate: '命中率',
      },
      api: {
        title: 'API缓存',
        total: 'API请求总数',
        missed: 'API未命中缓存',
        syncAt: '同步时间',
        hitRate: '命中率',
      },
      user: {
        title: '用户信息缓存',
        syncAt: '同步时间',
      },
      refresh: '刷新缓存',
    },
    abTest: {
      current: '灰度测试总数',
      allError: '灰度测试失败',
      warn: '灰度业务错误',
      error: '灰度服务器错误',
      success: '请求成功',
      fallback: '回滚数量',
    },
    sys: {
      time: '系统启动时间',
      warn: '系统警告',
      error: '系统错误',
    },
    cluster: {
      btn: '重启Worker',
      title: '确定没手滑？',
    },
  },
}
