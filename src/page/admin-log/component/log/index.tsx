/*
 * @Author: legends-killer
 * @Date: 2021-11-23 14:43:01
 * @LastEditors: legends-killer
 * @LastEditTime: 2021-11-23 17:50:38
 * @Description:
 */
import { PaginationProps, Table } from '@arco-design/web-react'
import { useMemo, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ICommonLog } from '../../types'
import moment from 'moment'
interface IProps {
  logs: ICommonLog[]
  loading: boolean
}
export default function LogTable(props: IProps) {
  const { logs, loading } = props
  const [pageSize, setPageSize] = useState(100)
  const { t } = useTranslation()
  const columns = useMemo(() => {
    return [
      {
        title: t('page.adminLog.table.level'),
        dataIndex: 'level',
        width: 80,
      },
      {
        title: t('page.adminLog.table.date'),
        width: 180,
        render: (_: number, record: ICommonLog) => {
          return moment(record.date).format('YYYY-MM-DD HH:mm:ss')
        },
      },
      {
        title: t('page.adminLog.table.message'),
        dataIndex: 'message',
        width: 800,
      },
      {
        title: t('page.adminLog.table.hostname'),
        dataIndex: 'hostname',
      },
      {
        title: t('page.adminLog.table.paddingMessage'),
        dataIndex: 'paddingMessage',
      },
      {
        title: t('page.adminLog.table.pid'),
        dataIndex: 'pid',
      },
    ]
  }, [t])

  // pagination
  const onChange = useCallback((pagination: PaginationProps) => {
    setPageSize(pagination.pageSize!)
  }, [])
  return (
    <div>
      <Table
        scroll={{ x: 1500, y: '50vh' }}
        onChange={onChange}
        pagination={{
          sizeCanChange: true,
          showTotal: true,
          pageSize: pageSize,
          sizeOptions: [50, 100, 200, 500, 1000],
        }}
        columns={columns}
        data={logs}
        loading={loading}
        renderPagination={(paginationNode) => (
          <div
            style={{
              display: 'flex',
              justifyContent: 'end',
              marginTop: 10,
            }}
          >
            {paginationNode}
          </div>
        )}
      />
    </div>
  )
}
