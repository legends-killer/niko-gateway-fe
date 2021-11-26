/*
 * @Author: legends-killer
 * @Date: 2021-11-09 22:46:43
 * @LastEditors: legends-killer
 * @LastEditTime: 2021-11-14 01:59:51
 * @Description: Login Page
 */
import { useCallback, useEffect, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { cas } from '../../prod.config.js'
import { useTranslation } from 'react-i18next'

export default function Login() {
  const { t } = useTranslation()
  const useQuery = () => {
    const { search } = useLocation()
    return useMemo(() => new URLSearchParams(search), [search])
  }
  const query = useQuery()
  const service = query.get('service')
  const saveCallback = useCallback(() => {
    window.localStorage.removeItem('service')
    if (service) window.localStorage.setItem('service', service)
  }, [service])
  const redirect = useCallback(() => {
    window.location.href = cas
  }, [])
  useEffect(() => {
    saveCallback()
    redirect()
  })
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <p>{t('page.login.toAuth')}</p>
    </div>
  )
}
