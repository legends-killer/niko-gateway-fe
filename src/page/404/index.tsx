/*
 * @Author: legends-killer
 * @Date: 2021-11-09 22:43:12
 * @LastEditors: legends-killer
 * @LastEditTime: 2021-11-14 16:28:11
 * @Description: 404 Not Found
 */
import { useHistory } from 'react-router-dom'
import { Result, Button } from '@arco-design/web-react'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

export default function NotFound() {
  const { t } = useTranslation()
  const history = useHistory()
  const goBack = useCallback(() => {
    history.goBack()
  }, [history])
  return (
    <div>
      <Result
        status="404"
        subTitle={t('page.notFound.desc')}
        extra={[
          <Button key="back" type="primary" onClick={goBack}>
            {t('page.notFound.back')}
          </Button>,
        ]}
      />
    </div>
  )
}
