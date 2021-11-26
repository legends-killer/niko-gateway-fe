/*
 * @Author: legends-killer
 * @Date: 2021-11-16 22:02:40
 * @LastEditors: legends-killer
 * @LastEditTime: 2021-11-25 19:35:45
 * @Description:
 */
import { IAdminGroup, EDrawerUseType, IAdminGroupCreate } from '../../types'
import { createGroup, updateGroup, deleteGroup } from '../../api'
import { Drawer, Form, Input, Switch } from '@arco-design/web-react'
import { useState, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import Footer from './footer'

const FormItem = Form.Item

interface IProps {
  visible: boolean
  onClose: (refresh: boolean) => void
  data?: IAdminGroup
  usage: EDrawerUseType
}
export default function GroupDrawer(props: IProps) {
  const { visible, onClose, data, usage } = props
  const [form] = Form.useForm()

  const [loading, setLoading] = useState(false)
  const { t } = useTranslation()

  const onSubmit = useCallback(async () => {
    setLoading(true)
    const values = form.getFieldsValue() as IAdminGroupCreate
    if (usage === EDrawerUseType.CREATE) {
      const res = await createGroup(values)
      if (res.data) {
        onClose(true)
      }
    } else {
      const res = await updateGroup(data!.id, values)
      if (res.data) {
        onClose(true)
      }
    }
    setLoading(false)
  }, [data, form, onClose, usage])
  const onDelete = useCallback(async () => {
    const res = await deleteGroup(data!.id)
    if (res.data) {
      onClose(true)
    }
    setLoading(false)
  }, [data, onClose])
  useEffect(() => {
    form.resetFields()
    if (usage === EDrawerUseType.MODIFY) {
      form.setFieldsValue(data)
    }
  }, [data, form, usage])
  return (
    <Drawer
      visible={visible}
      onCancel={() => onClose(false)}
      className="drawer"
      closable={false}
      title={
        t(`page.adminGroup.drawer.${usage}`) + (data ? ` ID: ${data.id}` : '')
      }
      footer={
        <Footer
          usage={usage}
          loading={loading}
          onClose={() => onClose(false)}
          onDelete={onDelete}
          onSubmit={onSubmit}
        />
      }
    >
      <Form form={form} className="drawer-form">
        <FormItem label={t('page.adminGroup.drawer.name')} field="name">
          <Input />
        </FormItem>
        <FormItem label={t('page.adminGroup.drawer.comment')} field="comment">
          <Input />
        </FormItem>
        <FormItem
          label={t('page.adminGroup.drawer.default')}
          field="default"
          triggerPropName="checked"
        >
          <Switch />
        </FormItem>
      </Form>
    </Drawer>
  )
}
