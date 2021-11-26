/*
 * @Author: legends-killer
 * @Date: 2021-11-19 15:36:43
 * @LastEditors: legends-killer
 * @LastEditTime: 2021-11-19 16:10:38
 * @Description:
 */
export const adminABTest = {
  title: '灰度测试配置',
  table: {
    id: 'ID',
    method: '请求方法',
    origin: '网关路由',
    suspend: '挂起',
    increase: '切流比率增加数',
    current: '当前切流比',
    timeGap: '切流增加时间差',
    createdAt: '创建时间',
    updatedAt: '更新时间',
    comment: '描述',
    server: '目标服务器',
    dest: '服务器路由',
  },
  filter: {
    id: 'ID',
    origin: '网关路由',
    method: '请求方法',
    comment: '描述',
  },
  drawer: {
    modify: '配置修改',
    create: '新增配置',
    comment: '描述',
    origin: '网关路由',
    server: '目标服务器',
    dest: '服务器路由',
    method: '请求方法',
    increase: '切流比率增加数',
    current: '当前切流比',
    timeGap: '切流增加时间差',
    suspend: '是否挂起',
  },
}
