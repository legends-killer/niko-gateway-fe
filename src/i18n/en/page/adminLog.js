/*
 * @Author: legends-killer
 * @Date: 2021-11-23 16:03:21
 * @LastEditors: legends-killer
 * @LastEditTime: 2021-11-23 17:50:30
 * @Description:
 */
export const adminLog = {
  title: 'System Log',
  tip: `支持用逻辑标识构建语句，必须以「AND」「OR」「NOT」开头，参数和标识之间用空格隔开，参数可以带有空格。eg：「AND socket is closed NOT ClusterClient:Watcher」`,
  table: {
    level: 'Level',
    message: 'Message',
    date: 'Date',
    hostname: 'Hostname',
    paddingMessage: 'paddingMessage',
    pid: 'PID',
  },
  filter: {
    filter: 'Filter',
    date: 'Log Date',
    timeFrom: 'Time From',
    timeTo: 'Time To',
    level: {
      title: 'Level',
      debug: 'Debug',
      info: 'Info',
      warn: 'Warn',
      error: 'Error',
    },
    type: {
      title: 'Type',
      commonErr: 'Common Error',
      agent: 'Agent Process Log',
      schedule: 'Schedule Execution Log',
      web: 'Inner Web Log',
      app: 'App Log',
      proxy: 'Gateway Log',
    },
  },
}
