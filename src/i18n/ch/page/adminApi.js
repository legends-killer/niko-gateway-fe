/*
 * @Author: legends-killer
 * @Date: 2021-11-15 22:04:51
 * @LastEditors: legends-killer
 * @LastEditTime: 2021-11-25 02:31:52
 * @Description:
 */
export const adminApi = {
  title: '路由配置',
  table: {
    id: 'ID',
    comment: '描述',
    origin: '网关路由',
    server: '目标服务器',
    dest: '服务器路由',
    allowGroup: '允许组',
    createdAt: '创建时间',
    updatedAt: '更新时间',
    method: '请求方法',
    switch: '状态',
    abTest: '灰度测试',
    isPublic: '开放式API',
  },
  filter: {
    id: 'ID',
    comment: '描述',
    origin: '网关路由',
    server: '目标服务器',
    dest: '服务器路由',
    method: '请求方法',
  },
  drawer: {
    modify: '配置修改',
    create: '新增配置',
    comment: '描述',
    router: '网关路由',
    server: '目标服务器',
    dest: '服务器路由',
    method: '请求方法',
    allowGroup: '允许组',
    abTest: '灰度测试',
    switch: '状态',
    isPublic: '开放式API',
    customHeader: '自定义请求头',
    customHeaderBtn: '修改配置',
  },
  drawer2: {
    title:
      '请求头自定义（⚠️仅在转发时生效，配置可以被覆盖，value为空则转发时不带该头⚠️）',
    key: 'Key',
    value: 'Value',
  },
}
