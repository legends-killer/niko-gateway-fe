/*
 * @Author: legends-killer
 * @Date: 2021-11-21 14:28:49
 * @LastEditors: legends-killer
 * @LastEditTime: 2021-11-22 20:45:23
 * @Description:
 */
import { Button, Message, Modal } from '@arco-design/web-react'
import { reloadWorker } from '../../api'
import { useTranslation } from 'react-i18next'

interface IProps {}
export default function Cluster(props: IProps) {
  const { t } = useTranslation()
  return (
    <div>
      <Button
        type="primary"
        onClick={() =>
          Modal.warning({
            title: t('page.adminOther.content.cluster.title'),
            onOk: async () => {
              const res = await reloadWorker()
              if (res.msg === 'success') Message.success(t('common.success'))
            },
          })
        }
      >
        {t('page.adminOther.content.cluster.btn')}
      </Button>
    </div>
  )
}
