/*
 * @Author: legends-killer
 * @Date: 2021-11-16 13:34:51
 * @LastEditors: legends-killer
 * @LastEditTime: 2021-11-25 19:37:58
 * @Description:
 */
import { Button } from '@arco-design/web-react'
import { useTranslation } from 'react-i18next'

interface IProps {
  loading: boolean
  onClose: () => void
  onSubmit: () => void
}

export default function Footer(props: IProps) {
  const { onClose, onSubmit, loading } = props
  const { t } = useTranslation()
  return (
    <div className="drawer-btn-group">
      <Button loading={loading} type="primary" onClick={onSubmit}>
        {t('common.update')}
      </Button>
      <Button loading={loading} type="secondary" onClick={onClose}>
        {t('common.cancel')}
      </Button>
    </div>
  )
}
