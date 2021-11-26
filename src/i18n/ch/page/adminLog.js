/*
 * @Author: legends-killer
 * @Date: 2021-11-23 16:03:21
 * @LastEditors: legends-killer
 * @LastEditTime: 2021-11-26 21:50:17
 * @Description:
 */
export const adminLog = {
  title: '系统日志',
  tip: `支持用逻辑标识构建语句，必须以「AND」「OR」「NOT」开头，参数和标识之间用空格隔开，参数可以带有空格。eg：「AND socket is closed NOT ClusterClient:Watcher」`,
  table: {
    level: '级别',
    message: '消息',
    date: '日期',
    hostname: '主机名',
    paddingMessage: '填充消息',
    pid: '进程号',
  },
  filter: {
    filter: '筛选',
    date: '日志日期',
    timeFrom: '开始时间',
    timeTo: '结束时间',
    level: {
      title: '级别',
      debug: '调试',
      info: '信息',
      warn: '警告',
      error: '错误',
    },
    type: {
      title: '日志类型',
      commonErr: '通用错误',
      agent: 'Agent进程日志',
      schedule: '定时任务日志',
      web: '内部网络连接日志',
      app: '应用日志',
      proxy: '网关代理日志',
    },
  },
}
