/*
 * @Author: legends-killer
 * @Date: 2021-11-21 14:27:30
 * @LastEditors: legends-killer
 * @LastEditTime: 2021-11-22 20:27:51
 * @Description:
 */
import { useState, useCallback, useMemo, useEffect } from 'react'
import { Card, Tabs } from '@arco-design/web-react'
import { useTranslation } from 'react-i18next'
import { getSystemInfo } from './api'
import { ISystemInfo } from './types'
import Cache from './component/cache'
import Cluster from './component/cluster'
import Info from './component/info'

const TabPane = Tabs.TabPane

export default function AdminOther() {
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false)
  const [sysInfo, setSysInfo] = useState<ISystemInfo>()

  const componentMap = useMemo(() => {
    return [
      {
        id: 'info',
        name: t('page.adminOther.tab.info.title'),
      },
      {
        id: 'cache',
        name: t('page.adminOther.tab.cache.title'),
      },
      {
        id: 'cluster',
        name: t('page.adminOther.tab.cluster.title'),
      },
    ]
  }, [t])

  const fetchSystemInfo = useCallback(async () => {
    setLoading(true)
    const res = await getSystemInfo()
    res.data && setSysInfo(res.data.info)
    setLoading(false)
  }, [])

  // init
  useEffect(() => {
    fetchSystemInfo()
  }, [fetchSystemInfo])

  // interval
  useEffect(() => {
    const interval = setInterval(() => {
      fetchSystemInfo()
    }, 60 * 1000)
    return () => clearInterval(interval)
  }, [fetchSystemInfo])

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Card
        title={t('page.adminOther.title')}
        bordered={false}
        style={{ width: '100%' }}
      >
        <Tabs style={{ margin: -15 }}>
          {componentMap.map((item) => {
            return (
              <TabPane destroyOnHide key={item.id} title={`${item.name}`}>
                <div style={{ margin: '0px 16px 16px 16px' }}>
                  {item.id === 'info' && (
                    <Info sysInfo={sysInfo} loading={loading} />
                  )}
                  {item.id === 'cache' && (
                    <Cache sysInfo={sysInfo} loading={loading} />
                  )}
                  {item.id === 'cluster' && <Cluster />}
                </div>
              </TabPane>
            )
          })}
        </Tabs>
      </Card>
    </div>
  )
}
