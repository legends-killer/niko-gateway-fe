/*
 * @Author: legends-killer
 * @Date: 2021-11-23 14:05:38
 * @LastEditors: legends-killer
 * @LastEditTime: 2021-11-23 17:41:28
 * @Description:
 */
import { getLogs } from './api'
import LogFilter from './component/filter'
import LogTable from './component/log'
import { useTranslation } from 'react-i18next'
import { useCallback, useEffect, useState } from 'react'
import { ICommonLog, IFilter, ELogType } from './types'
import { Card, Popover } from '@arco-design/web-react'
import { IconQuestionCircle } from '@arco-design/web-react/icon'

export default function AdminLog() {
  const { t } = useTranslation()
  const [logs, setLogs] = useState<ICommonLog[]>([])
  const [filter, setFilter] = useState<IFilter>({ type: ELogType.web })
  const [loading, setLoading] = useState(false)

  const fetchLogs = useCallback(async () => {
    setLoading(true)
    const res = await getLogs(filter)
    res.data && setLogs(res.data.log)
    setLoading(false)
  }, [filter])

  //init
  useEffect(() => {
    fetchLogs()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Card
        title={t('page.adminLog.title')}
        bordered={false}
        extra={
          <div style={{ fontSize: '1.25rem', cursor: 'pointer' }}>
            <Popover
              style={{
                borderRadius: '5px',
              }}
              content={t('page.adminLog.tip')}
              position="left"
              trigger="click"
            >
              <IconQuestionCircle />
            </Popover>
          </div>
        }
      >
        <LogFilter
          filter={filter}
          setFilter={setFilter}
          handleSearch={fetchLogs}
        />
        <LogTable logs={logs} loading={loading} />
      </Card>
    </div>
  )
}
