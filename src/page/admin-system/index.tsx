/*
 * @Author: legends-killer
 * @Date: 2021-11-30 20:20:05
 * @LastEditors: legends-killer
 * @LastEditTime: 2021-12-01 01:43:01
 * @Description:
 */
import { useState, useCallback, useEffect } from 'react'
import { getSystemConfig } from './api'
import { ISystemConfig, SystemSettingKey } from './types'
import { Card, Spin, Tabs } from '@arco-design/web-react'
import { useTranslation } from 'react-i18next'
import Email from './component/email'
import AccessKey from './component/accessKey'
import ErrorReport from './component/errorReport'
import Schedule from './component/schedule'

const TabPane = Tabs.TabPane

export default function AdminSystem() {
  const { t } = useTranslation()
  const [initializing, setInitializing] = useState(true)
  const [systemConfig, setSystemConfig] = useState<ISystemConfig[]>([])

  const onUpdate = () => {
    fetchSystemConfig()
  }

  const fetchSystemConfig = useCallback(async () => {
    const res = await getSystemConfig()
    res.data && setSystemConfig(res.data.config)
    setInitializing(false)
  }, [])

  // init
  useEffect(() => {
    fetchSystemConfig()
  }, [fetchSystemConfig])
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Card
        title={t('page.adminSystem.title')}
        bordered={false}
        style={{ width: '100%' }}
      >
        <Spin loading={initializing} style={{ display: 'block', top: '30px' }}>
          <Tabs
            style={{ margin: -15 }}
            defaultActiveTab={SystemSettingKey.errorEmail}
          >
            {systemConfig &&
              systemConfig.map((item) => {
                let child = {} as any
                switch (item.key) {
                  case SystemSettingKey.errorEmail: {
                    child = (
                      <Email
                        configKey={item.key}
                        config={item.value as any}
                        onChange={onUpdate}
                      />
                    )
                    break
                  }
                  case SystemSettingKey.accessKey: {
                    child = (
                      <AccessKey
                        configKey={item.key}
                        config={item.value as any}
                        onChange={onUpdate}
                      />
                    )
                    break
                  }
                  case SystemSettingKey.proxyErrorReport:
                  case SystemSettingKey.abTestErrorReport:
                  case SystemSettingKey.systemErrorReport: {
                    child = (
                      <ErrorReport
                        configKey={item.key}
                        config={item.value as any}
                        onChange={onUpdate}
                      />
                    )
                    break
                  }
                  case SystemSettingKey.scheduleInterval: {
                    child = (
                      <Schedule
                        configKey={item.key}
                        config={item.value as any}
                        onChange={onUpdate}
                      />
                    )
                    break
                  }
                  default: {
                    child = () => <div>111</div>
                    break
                  }
                }
                return (
                  <TabPane
                    key={item.key}
                    title={t(`page.adminSystem.${item.key}.title`)}
                  >
                    {child}
                  </TabPane>
                )
              })}
          </Tabs>
        </Spin>
      </Card>
    </div>
  )
}
