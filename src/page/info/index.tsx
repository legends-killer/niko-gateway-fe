/*
 * @Author: legends-killer
 * @Date: 2021-11-09 23:46:15
 * @LastEditors: legends-killer
 * @LastEditTime: 2021-11-26 21:42:28
 * @Description: Auth Info Page
 */
import { getGroup, getUserInfo } from './api'
import { useState, useCallback, useEffect, useContext } from 'react'
import { isAdminContext } from '@/globalContext'
import { Card, Descriptions, Spin } from '@arco-design/web-react'
import LangSwitch from './component/langSwitch'
import moment from 'moment'
import { useTranslation } from 'react-i18next'

interface IDesc {
  label: string
  value: string
}
export default function Info() {
  const [info, setInfo] = useState<IDesc[]>([] as IDesc[])
  const [loading, setLoading] = useState(false)
  const { dispatch } = useContext(isAdminContext)
  const { t, i18n } = useTranslation()

  const fetchInfo = useCallback(async () => {
    setLoading(true)
    moment.locale(i18n.language)
    const { data } = await getUserInfo()
    const group = (await getGroup()).data?.groupMap || []
    if (data) {
      setInfo([
        {
          label: t('page.info.staffName'),
          value: data.staffName,
        },
        {
          label: t('page.info.staffId'),
          value: data.staffId,
        },
        {
          label: t('page.info.tokenExp'),
          value: moment(data.accessTokenExp).fromNow(),
        },
        {
          label: t('page.info.userGroup'),
          value: group.map((item) => item.name).join(' | '),
        },
      ])
      // check if admin
      const admin = group.find((item) => item.id === 1)
      if (admin) {
        dispatch(true)
        sessionStorage.setItem('admin', '1')
      }
    }
    setLoading(false)
  }, [dispatch, i18n.language, t])
  useEffect(() => {
    fetchInfo()
  }, [fetchInfo])
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Card
        title={t('page.info.title')}
        bordered={false}
        extra={<LangSwitch />}
      >
        <Spin loading={loading} style={{ display: 'block' }}>
          <Descriptions
            colon=" :"
            data={info}
            layout="inline-horizontal"
            size="large"
          />
        </Spin>
      </Card>
    </div>
  )
}
