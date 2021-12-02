/*
 * @Author: legends-killer
 * @Date: 2021-11-15 22:09:19
 * @LastEditors: legends-killer
 * @LastEditTime: 2021-12-02 16:53:40
 * @Description:
 */
export const adminApi = {
  title: 'API Config',
  table: {
    id: 'ID',
    comment: 'Comment',
    origin: 'Gateway Router',
    server: 'Server',
    dest: 'Server Router',
    allowGroup: 'Accessable Groups',
    createdAt: 'Created At',
    updatedAt: 'Updated At',
    method: 'Request Method',
    switch: 'Status',
    abTest: 'AB Test',
    isPublic: 'Public API',
  },
  filter: {
    id: 'ID',
    comment: 'Comment',
    origin: 'Gateway Router',
    server: 'Server',
    dest: 'Server Router',
    method: 'Request Method',
  },
  drawer: {
    modify: 'Modify Config',
    create: 'Create Config',
    comment: 'Comment',
    router: 'Gateway Router',
    server: 'Server',
    dest: 'Server Router',
    method: 'Request Method',
    allowGroup: 'Accessable Groups',
    abTest: 'AB Test',
    switch: 'Status',
    isPublic: 'Public API',
    customHeader: 'Custom Header',
    customHeaderBtn: 'Config Header',
  },
  drawer2: {
    title:
      'Config Header（⚠️Headers can be overwrite, empty value means the header will be IGNORED⚠️）',
    key: 'Key',
    value: 'Value',
  },
}
