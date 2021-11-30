/*
 * @Author: legends-killer
 * @Date: 2021-11-30 22:29:33
 * @LastEditors: legends-killer
 * @LastEditTime: 2021-12-01 03:00:33
 * @Description:
 */
export const adminSystem = {
  title: '系统设置',
  errorEmail: {
    title: '邮箱设置',
    user: 'SMTP 用户名',
    password: 'SMTP 密码',
    host: 'SMTP 服务器',
    sender: '发送者',
    sendTo: '通知接收邮箱',
  },
  accessKey: {
    title: '内部API AccessKey',
    enable: '启用',
    key: '密钥',
  },
  scheduleInterval: {
    title: '定时任务配置',
    enable: '启用',
    interval: '执行间隔',
    abTest: '灰度配置缓存刷新',
    apiCache: 'API 缓存刷新',
    bizCache: '微服务缓存刷新',
    errorDetector: '错误监测',
    systemInfo: '系统信息同步',
    systemInfoCache: '系统信息缓存刷新',
    userCache: '用户信息缓存刷新',
  },
  errorReportBase: {
    enable: '启用',
    errorThreshold: '错误信息阈值',
    warnThreshold: '警告信息阈值',
    timeThreshold: '阈值时间周期',
    muteUntil: '禁用邮件通知',
  },
  systemErrorReport: { title: '系统错误报告' },
  proxyErrorReport: { title: '微服代理务错误报告' },
  abTestErrorReport: { title: '灰度错误报告' },
  createdAt: '创建时间',
  udpatedAt: '修改时间',
  id: 'ID',
}
