/*
 * @Author: legends-killer
 * @Date: 2021-11-10 11:44:08
 * @LastEditors: legends-killer
 * @LastEditTime: 2021-12-01 15:03:06
 * @Description: CAS Auth Callback Page
 */

import { useEffect, useMemo, useCallback, useState, useRef } from 'react'
import { useLocation, useHistory } from 'react-router'
import { casAuthReq } from './api'
import { Message, Modal } from '@arco-design/web-react'
import { useTranslation } from 'react-i18next'
import moment from 'moment'

export default function Auth() {
  const { t } = useTranslation()
  const [visible, setVisible] = useState(false)
  const token = useRef('')
  const redirect = useRef('')

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

  // deside where to save the token
  const saveToken = useCallback(
    (trust: boolean, persist?: boolean) => {
      trust && localStorage.setItem('token', token.current)
      persist &&
        localStorage.setItem('trust', moment().add(7, 'days').toString())
      // always save token in sessionStorage
      sessionStorage.setItem('token', token.current)
      localStorage.removeItem('service')
      tryGoBack(token.current, redirect.current)
    },
    [redirect, token, tryGoBack]
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
      const isTrusted = moment(localStorage.getItem('trust')).isAfter(moment())
      token.current = data.accessToken
      redirect.current = data.redirectUrl
      isTrusted ? saveToken(true, false) : setVisible(true)
    }
  }, [query, saveToken, t])
  // init
  useEffect(() => {
    tryAuth()
    // eslint-disable-next-line
  }, [])
  return (
    <>
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
      <Modal
        simple={true}
        visible={visible}
        onOk={() => saveToken(true, true)}
        onCancel={() => saveToken(false)}
        okText={t('common.yes')}
        cancelText={t('common.no')}
      >
        {t('page.auth.trust')}
      </Modal>
    </>
  )
}
