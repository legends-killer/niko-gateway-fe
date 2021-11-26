/*
 * @Author: legends-killer
 * @Date: 2021-11-21 14:27:57
 * @LastEditors: legends-killer
 * @LastEditTime: 2021-11-25 19:52:31
 * @Description:
 */
import { ISystemInfo, ECacheName } from '../../types'
import { Card, Statistic, Button, Message, Spin } from '@arco-design/web-react'
import { TFunction, useTranslation } from 'react-i18next'
import moment from 'moment'
import style from './style.module.less'
import { useCallback } from 'react'
import { refreshCache } from '../../api'

interface IProps {
  sysInfo?: ISystemInfo
  loading?: boolean
}
interface ICardProps {
  type: ECacheName
  t: TFunction<'translation', undefined>
  children?: any
  cache: ISystemInfo['cache']
}
const CacheCard = (props: ICardProps) => {
  const { type, t, cache, children } = props
  return (
    <div className={style['arco-card']}>
      <Card
        title={t(`page.adminOther.content.cache.${type}.title`)}
        style={{ borderRadius: 10, margin: '10px 0px' }}
      >
        <div className={style['cache-card']}>
          <Statistic
            title={t(`page.adminOther.content.cache.${type}.title`)}
            value={moment().diff(moment(cache[type].syncAt), 'm')}
            suffix={t('page.adminOther.min')}
          />
          {children}
        </div>
      </Card>
    </div>
  )
}

export default function Cache(props: IProps) {
  const { t } = useTranslation()
  const { sysInfo, loading } = props
  const cardType = [ECacheName.API, ECacheName.USER, ECacheName.BIZ]

  const refresh = useCallback(
    async (type: ECacheName) => {
      const res = await refreshCache(type)
      if (res.msg === 'success') Message.success(t('common.success'))
    },
    [t]
  )
  return (
    <Spin loading={loading} style={{ display: 'block' }}>
      <div className={style['card-wrapper']}>
        {sysInfo && (
          <>
            {cardType.map((type) => (
              <CacheCard key={type} type={type} t={t} cache={sysInfo.cache}>
                <Button type="primary" onClick={() => refresh(type)}>
                  {t('page.adminOther.content.cache.refresh')}
                </Button>
              </CacheCard>
            ))}
          </>
        )}
      </div>
    </Spin>
  )
}
