/*
 * @Author: legends-killer
 * @Date: 2021-11-09 22:46:43
 * @LastEditors: legends-killer
 * @LastEditTime: 2021-12-02 15:19:36
 * @Description: Login Page
 */
import { useEffect, useMemo } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { cas } from '../../prod.config.js'
import { useTranslation } from 'react-i18next'
import { checkToken } from './api'
import { getUserBizService } from '../service/api'

export default function Login() {
  const { t } = useTranslation()
  const useQuery = () => {
    const { search } = useLocation()
    return useMemo(() => new URLSearchParams(search), [search])
  }
  const query = useQuery()
  const service = query.get('service')
  const history = useHistory()

  const saveService = () => {
    window.localStorage.removeItem('service')
    if (service) window.localStorage.setItem('service', service)
  }

  const redirect = () => {
    window.location.href = cas
  }

  /**
   * @return false - not match or not given
   * @return ture - match
   */
  const validateService = async () => {
    const res = await getUserBizService()
    const registedService = res.data?.biz.map((item) => item.url)
    if (!service) return false
    if (registedService && registedService.includes(service)) {
      return true
    }
    return false
  }

  const validateToken = async () => {
    const res = await checkToken()
    if (res.data?.ok) {
      // token is valid
      const token =
        sessionStorage.getItem('token') || localStorage.getItem('token')
      const serviceValid = await validateService()

      serviceValid &&
        (window.location.href = service + `${token ? '?token=' + token : ''}`)
      !serviceValid && history.push('/info')
    } else {
      // redirect to login
      redirect()
    }
  }

  //init
  useEffect(() => {
    saveService()
    validateToken()
    // eslint-disable-next-line
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
      <p>{t('page.login.toAuth')}</p>
    </div>
  )
}
