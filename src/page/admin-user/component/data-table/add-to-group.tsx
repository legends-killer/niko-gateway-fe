/*
 * @Author: legends-killer
 * @Date: 2021-11-18 23:27:54
 * @LastEditors: legends-killer
 * @LastEditTime: 2021-11-19 00:29:18
 * @Description:
 */
import { IGroup } from '../../types'
import { addUserGroupMap } from '../../api'
import { Button, Message, Modal, Select } from '@arco-design/web-react'
import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'

const Option = Select.Option

interface IProps {
  visible: boolean
  onClose: (v: boolean) => void
  users: Array<string | number>
  groups: IGroup[]
}
export default function AddToGroup(props: IProps) {
  const { t } = useTranslation()
  const { users, groups, visible, onClose } = props
  const [selected, setSelected] = useState<number[]>([])
  const [loading, setLoading] = useState(false)

  const onOK = useCallback(async () => {
    setLoading(true)
    const UGMap = []
    for (const u of users) {
      for (const g of selected) {
        UGMap.push({
          userId: Number(u),
          groupId: Number(g),
        })
      }
    }
    if (!UGMap.length) {
      Message.error(t('common.paramsError'))
      setLoading(false)
      return
    }
    const res = await addUserGroupMap({ map: UGMap })
    if (res.msg === 'success') {
      onClose(true)
    }
    setLoading(false)
  }, [onClose, selected, t, users])
  return (
    <Modal
      title={t('page.adminUser.popUp.title')}
      visible={visible}
      onCancel={() => onClose(false)}
      autoFocus={false}
      focusLock={true}
      footer={
        <>
          <Button
            onClick={() => {
              onClose(false)
            }}
          >
            {t('common.cancel')}
          </Button>
          <Button
            loading={loading}
            onClick={() => {
              onOK()
            }}
            type="primary"
            style={{ marginLeft: 12 }}
          >
            {t('common.save')}
          </Button>
        </>
      }
    >
      <Select
        defaultValue={[]}
        mode="multiple"
        onChange={(val) => {
          setSelected(val)
        }}
      >
        {groups.map((g) => {
          return (
            <Option key={g.id} value={g.id}>
              {g.name}
            </Option>
          )
        })}
      </Select>
    </Modal>
  )
}
