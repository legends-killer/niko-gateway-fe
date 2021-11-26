/*
 * @Author: legends-killer
 * @Date: 2021-11-12 14:38:12
 * @LastEditors: legends-killer
 * @LastEditTime: 2021-11-15 14:53:07
 * @Description:
 */
import { Table, Card, Tooltip } from '@arco-design/web-react'
import { IconQuestionCircle } from '@arco-design/web-react/icon'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { IAuthLog } from './types'
import { getAuthLog } from './api'
import moment from 'moment'
import { useTranslation } from 'react-i18next'

export default function UserLog() {
  const [log, setLog] = useState<IAuthLog[] | undefined>([] as any)
  const [loading, setLoading] = useState(false)
  const { t, i18n } = useTranslation()

  const columns = useMemo(() => {
    return [
      {
        title: t('page.userLog.table.id'),
        dataIndex: 'userId',
      },
      {
        title: t('page.userLog.table.service'),
        dataIndex: 'service',
      },
      {
        title: t('page.userLog.table.device'),
        dataIndex: 'device',
      },
      {
        title: t('page.userLog.table.time'),
        dataIndex: 'createdAt',
        render: (col: number, item: any, index: number) => {
          moment.locale(i18n.language)
          return <span>{moment(item.createdAt).calendar()}</span>
        },
      },
    ]
  }, [t, i18n])

  const fetchLog = useCallback(async () => {
    setLoading(true)
    const res = await getAuthLog()
    res.data?.log && setLog(res.data!.log)
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchLog()
  }, [fetchLog])
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Card
        title={t('page.userLog.title')}
        bordered={false}
        bodyStyle={{ padding: 0, paddingTop: 10 }}
        extra={
          <div style={{ fontSize: '1.25rem', cursor: 'pointer' }}>
            <Tooltip
              mini
              content={t('page.userLog.tip')}
              position="left"
              trigger="click"
            >
              <IconQuestionCircle />
            </Tooltip>
          </div>
        }
      >
        <Table columns={columns} border={false} loading={loading} data={log} />
      </Card>
    </div>
  )
}
