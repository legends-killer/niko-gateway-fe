/*
 * @Author: legends-killer
 * @Date: 2021-11-30 22:29:33
 * @LastEditors: legends-killer
 * @LastEditTime: 2021-12-01 02:22:59
 * @Description:
 */
export const adminSystem = {
  title: 'System Config',
  errorEmail: {
    title: 'Email Config For Error Report',
    user: 'SMTP user',
    password: 'SMTP pass',
    host: 'SMTP host',
    sender: 'Sender',
    sendTo: 'SendTo',
  },
  accessKey: {
    title: 'Inner API AccessKey',
    enable: 'Enabled',
    key: 'Key',
  },
  scheduleInterval: {
    title: 'Schedule Works Interval',
    enable: 'Enabled',
    interval: 'Interval',
    abTest: 'AB Test',
    apiCache: 'API Cache',
    bizCache: 'Micro Service Cache',
    errorDetector: 'Error Detector',
    systemInfo: 'System Info Sync',
    systemInfoCache: 'System Info Cache',
    userCache: 'User Info Cache',
  },
  errorReportBase: {
    enable: 'Enabled',
    errorThreshold: 'Error Threshold',
    warnThreshold: 'Warn Threshold',
    timeThreshold: 'Time Threshold',
    muteUntil: 'Mute Email Until',
  },
  systemErrorReport: { title: 'System Error Email Report' },
  proxyErrorReport: { title: 'Proxy Error Email Report' },
  abTestErrorReport: { title: 'AB Test Error Email Report' },
  createdAt: 'Created At',
  udpatedAt: 'Updated At',
  id: 'ID',
}
