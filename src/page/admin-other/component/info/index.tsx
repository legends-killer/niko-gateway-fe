/*
 * @Author: legends-killer
 * @Date: 2021-11-21 16:52:02
 * @LastEditors: legends-killer
 * @LastEditTime: 2021-11-25 19:44:45
 * @Description:
 */

import { ISystemInfo } from '../../types'
import { Card, Statistic, Popover, Spin } from '@arco-design/web-react'
import { useTranslation } from 'react-i18next'
import moment from 'moment'
import style from './style.module.less'

interface IProps {
  sysInfo?: ISystemInfo
  loading?: boolean
}

export default function Info(props: IProps) {
  const { t } = useTranslation()
  const { sysInfo, loading } = props
  return (
    <div>
      <Spin loading={loading} style={{ display: 'block' }}>
        {sysInfo && (
          <>
            <Card title={null} style={{ borderRadius: 10, margin: '10px 0px' }}>
              <div className={style['item-card']}>
                <Statistic
                  title={t('page.adminOther.content.sys.time')}
                  value={moment().diff(moment(sysInfo.startedAt), 'days')}
                  suffix={t('page.adminOther.day')}
                  countUp
                />
                <Statistic
                  title={t('page.adminOther.content.sys.warn')}
                  value={sysInfo.warn}
                  countUp
                  styleValue={{ color: '#FF7D00' }}
                />
                <Statistic
                  title={t('page.adminOther.content.sys.error')}
                  value={sysInfo.error}
                  countUp
                  styleValue={{ color: '#F53F3F' }}
                />
              </div>
            </Card>

            <Card title={null} style={{ borderRadius: 10, margin: '10px 0px' }}>
              <div className={style['item-card']}>
                <Statistic
                  title={t('page.adminOther.content.cache.api.total')}
                  value={sysInfo.cache.api.total}
                  countUp
                />
                <Statistic
                  title={t('page.adminOther.content.cache.api.missed')}
                  value={sysInfo.cache.api.missed}
                  countUp
                  styleValue={{ color: '#FF7D00' }}
                />
                <Statistic
                  title={t('page.adminOther.content.cache.api.hitRate')}
                  value={(
                    ((sysInfo.cache.api.total - sysInfo.cache.api.missed) *
                      100) /
                    sysInfo.cache.api.total
                  ).toFixed(2)}
                  suffix={'%'}
                  precision={2}
                  countUp
                />
              </div>
            </Card>

            <Card title={null} style={{ borderRadius: 10, margin: '10px 0px' }}>
              <div className={style['item-card']}>
                <Statistic
                  title={t('page.adminOther.content.cache.biz.total')}
                  value={sysInfo.cache.biz.total}
                  countUp
                />
                <Statistic
                  title={t('page.adminOther.content.cache.biz.missed')}
                  value={sysInfo.cache.biz.missed}
                  countUp
                  styleValue={{ color: '#FF7D00' }}
                />
                <Statistic
                  title={t('page.adminOther.content.cache.biz.hitRate')}
                  value={(
                    ((sysInfo.cache.biz.total - sysInfo.cache.biz.missed) *
                      100) /
                    sysInfo.cache.biz.total
                  ).toFixed(2)}
                  suffix={'%'}
                  precision={2}
                  countUp
                />
              </div>
            </Card>

            <Card title={null} style={{ borderRadius: 10, margin: '10px 0px' }}>
              <div className={style['item-card']}>
                <Statistic
                  title={t('page.adminOther.content.abTest.current')}
                  value={sysInfo.abTest.current}
                  countUp
                />
                <Popover
                  trigger="hover"
                  content={
                    <div>
                      <span>
                        {t('page.adminOther.content.abTest.warn') +
                          ': ' +
                          sysInfo.abTest.warn}
                      </span>
                      <br />
                      <span>
                        {t('page.adminOther.content.abTest.error') +
                          ': ' +
                          sysInfo.abTest.error}
                      </span>
                    </div>
                  }
                >
                  <div>
                    <Statistic
                      title={t('page.adminOther.content.abTest.allError')}
                      value={sysInfo.abTest.warn + sysInfo.abTest.error}
                      countUp
                      styleValue={{ color: '#FF7D00' }}
                    />
                  </div>
                </Popover>
                <Statistic
                  title={t('page.adminOther.content.abTest.success')}
                  value={sysInfo.abTest.success}
                  countUp
                />
              </div>
            </Card>
          </>
        )}
      </Spin>
    </div>
  )
}
