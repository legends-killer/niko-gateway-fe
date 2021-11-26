/*
 * @Author: legends-killer
 * @Date: 2021-11-16 13:34:51
 * @LastEditors: legends-killer
 * @LastEditTime: 2021-11-25 19:33:14
 * @Description:
 */
import { Button } from '@arco-design/web-react'
import { EDrawerUseType } from '../../types'
import { useTranslation } from 'react-i18next'

interface IProps {
  usage: EDrawerUseType
  loading: boolean
  onClose: () => void
  onDelete: () => void
  onSubmit: () => void
}

export default function Footer(props: IProps) {
  const { onClose, onDelete, onSubmit, loading, usage } = props
  const { t } = useTranslation()
  return (
    <div className="drawer-btn-group">
      <Button loading={loading} type="primary" onClick={onSubmit}>
        {usage === EDrawerUseType.MODIFY
          ? t('common.update')
          : t('common.save')}
      </Button>
      {usage === EDrawerUseType.MODIFY && (
        <Button
          loading={loading}
          type="primary"
          status="danger"
          onClick={onDelete}
        >
          {t('common.delete')}
        </Button>
      )}
      <Button loading={loading} type="secondary" onClick={onClose}>
        {t('common.cancel')}
      </Button>
    </div>
  )
}
