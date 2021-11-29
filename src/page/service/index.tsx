/*
 * @Author: legends-killer
 * @Date: 2021-11-12 18:29:59
 * @LastEditors: legends-killer
 * @LastEditTime: 2021-11-29 17:14:28
 * @Description:
 */
import { useState, useEffect, useCallback } from 'react'
import { IUserBizService } from './types'
import { getUserBizService } from './api'
import { Card, Spin, Empty } from '@arco-design/web-react'
import BizCard from './component/biz-card'
import { useTranslation } from 'react-i18next'

export default function Service() {
  const [biz, setBiz] = useState<IUserBizService[]>([] as any)
  const [loading, setLoading] = useState(false)
  const { t } = useTranslation()
  const fetchBiz = useCallback(async () => {
    setLoading(true)
    const res = await getUserBizService()
    res.data && setBiz(res.data.biz)
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchBiz()
  }, [fetchBiz])
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Spin loading={loading} style={{ display: 'block' }}>
        <Card
          title={t('page.service.title')}
          bordered={false}
          bodyStyle={{
            padding: 0,
            paddingTop: 10,
            display: 'flex',
            flexWrap: 'wrap',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          {biz.length > 0 ? (
            biz.map((item) => <BizCard key={item.id} biz={item} />)
          ) : (
            <Empty />
          )}
        </Card>
      </Spin>
    </div>
  )
}
