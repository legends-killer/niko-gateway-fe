/*
 * @Author: legends-killer
 * @Date: 2021-11-19 15:36:43
 * @LastEditors: legends-killer
 * @LastEditTime: 2021-11-19 16:10:50
 * @Description:
 */
export const adminABTest = {
  title: 'AB Test Config',
  table: {
    id: 'ID',
    method: 'Request Method',
    origin: 'Gateway Router',
    suspend: 'Suspend',
    increase: 'Increase Ratio',
    current: 'Current Ratio',
    timeGap: 'Increase Time Gap',
    createdAt: 'Created At',
    updatedAt: 'Updated At',
    comment: 'Comment',
    server: 'Server',
    dest: 'Server Router',
  },
  filter: {
    id: 'ID',
    origin: 'Reques Router',
    method: 'Request Method',
    comment: 'Comment',
  },
  drawer: {
    modify: 'Modify Config',
    create: 'Create Config',
    comment: 'Comment',
    origin: 'Gateway Router',
    server: 'Server',
    dest: 'Server Router',
    method: 'Request Method',
    suspend: 'Suspend',
    increase: 'Increase Ratio',
    current: 'Current Ratio',
    timeGap: 'Increase Time Gap',
  },
}
