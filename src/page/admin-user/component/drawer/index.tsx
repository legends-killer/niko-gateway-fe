/*
 * @Author: legends-killer
 * @Date: 2021-11-17 15:08:17
 * @LastEditors: legends-killer
 * @LastEditTime: 2021-11-26 18:14:56
 * @Description:
 */
import { IAdminUser, IGroup } from '../../types'
import { Drawer, Form, Select } from '@arco-design/web-react'
import { useTranslation } from 'react-i18next'
import Footer from './footer'
import { useCallback, useState, useEffect } from 'react'
import { getUserGroupMap, addUserGroupMap, deleteUserGroupMap } from '../../api'

const FormItem = Form.Item

interface IProps {
  group: IGroup[]
  visible: boolean
  onClose: (refresh: boolean) => void
  data?: IAdminUser
}

const diff = (a: number[], b: number[]) => {
  const sa = new Set(a)
  const sb = new Set(b)
  const d1 = b.filter((x) => !sa.has(x))
  const d2 = a.filter((x) => !sb.has(x))
  return [d1, d2]
}

export default function UserDrawer(props: IProps) {
  const { t } = useTranslation()
  const { group, visible, onClose, data } = props
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()
  const [currentGroup, setCurrentGroup] = useState<number[]>()
  const [userGroupMap, setUserGroupMap] =
    useState<{ id: number; userId: string; groupId: string }[]>()

  const onSubmit = useCallback(async () => {
    setLoading(true)
    const values = form.getFieldsValue()
    const updated = values.groupId
    const [add, del] = diff(currentGroup || [], updated)
    let result = true
    if (add.length) {
      const ugMap = add.map((id) => {
        return { userId: Number(data!.id), groupId: id }
      })
      const res = await addUserGroupMap({ map: ugMap })
      if (res.msg !== 'success') {
        result = false
      }
    }
    if (del.length) {
      const ids: number[] = []
      userGroupMap!.forEach((ugm) => {
        if (del.includes(Number(ugm.groupId))) {
          ids.push(ugm.id)
        }
      })
      const res = await deleteUserGroupMap({ id: ids.toString() })
      if (res.msg !== 'success') {
        result = false
      }
    }
    result && onClose(true)
    setLoading(false)
  }, [currentGroup, data, form, onClose, userGroupMap])

  const fetchUGMap = useCallback(async () => {
    setLoading(true)
    const res = await getUserGroupMap({ userId: data!.id })
    if (res.data) {
      const { group } = res.data.group
      const { idMap } = res.data.map
      setCurrentGroup(group.map((item) => item.id))
      setUserGroupMap(idMap)
      form.setFieldsValue({
        groupId: group.map((item) => item.id),
      })
    }
    setLoading(false)
  }, [data, form])

  useEffect(() => {
    data && fetchUGMap()
  }, [data, fetchUGMap])
  return (
    <div>
      <Drawer
        visible={visible}
        onCancel={() => onClose(false)}
        className="drawer"
        closable={false}
        title={t('page.adminUser.drawer.title')}
        footer={
          <Footer
            loading={loading}
            onClose={() => onClose(false)}
            onSubmit={onSubmit}
          />
        }
      >
        <Form form={form} className="drawer-form">
          <FormItem label={t('page.adminUser.drawer.group')} field="groupId">
            <Select mode="multiple">
              {group.map((item: IGroup) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </FormItem>
        </Form>
      </Drawer>
    </div>
  )
}
