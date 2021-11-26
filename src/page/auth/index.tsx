/*
 * @Author: legends-killer
 * @Date: 2021-11-10 11:44:08
 * @LastEditors: legends-killer
 * @LastEditTime: 2021-11-26 20:01:08
 * @Description: CAS Auth Callback Page
 */

import { useEffect, useMemo, useCallback } from 'react'
import { useLocation, useHistory } from 'react-router'
import { casAuthReq } from './api'
import { Message } from '@arco-design/web-react'
import { useTranslation } from 'react-i18next'

export default function Auth() {
  const { t } = useTranslation()
  const useQuery = () => {
    const { search } = useLocation()
    return useMemo(() => new URLSearchParams(search), [search])
  }
  const query = useQuery()
  const history = useHistory()
  // go back to service
  const tryGoBack = useCallback(
    (token?: string, redirectUrl?: string) => {
      if (redirectUrl) {
        window.location.href = redirectUrl + `${token ? '?token=' + token : ''}`
      } else {
        history.push('/info')
      }
    },
    [history]
  )
  // check ST
  const tryAuth = useCallback(async () => {
    const ticket = query.get('code')
    if (!ticket) {
      Message.error(t('page.auth.noTicket'))
      return
    }
    const { data } = await casAuthReq(ticket)
    if (data?.accessToken) {
      localStorage.setItem('token', data.accessToken)
      localStorage.removeItem('service')
      tryGoBack(data.accessToken, data.redirectUrl)
    }
  }, [query, t, tryGoBack])
  // init
  useEffect(() => {
    tryAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <p>{t('page.auth.check')}</p>
    </div>
  )
}
