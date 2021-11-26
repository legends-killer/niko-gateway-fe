/*
 * @Author: legends-killer
 * @Date: 2021-11-16 22:02:40
 * @LastEditors: legends-killer
 * @LastEditTime: 2021-11-25 19:35:16
 * @Description:
 */
import { IAdminBiz, EDrawerUseType, IAdminBizCreate, IGroup } from '../../types'
import { createBiz, updateBiz, deleteBiz } from '../../api'
import { Drawer, Form, Input, Switch, Select } from '@arco-design/web-react'
import { useState, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import Footer from './footer'

const FormItem = Form.Item

interface IProps {
  group: IGroup[]
  visible: boolean
  onClose: (refresh: boolean) => void
  data?: IAdminBiz
  usage: EDrawerUseType
}
export default function GroupDrawer(props: IProps) {
  const { visible, onClose, data, usage, group } = props
  const [form] = Form.useForm()

  const [loading, setLoading] = useState(false)
  const { t } = useTranslation()

  const onSubmit = useCallback(async () => {
    setLoading(true)
    const values = form.getFieldsValue() as IAdminBizCreate
    if (usage === EDrawerUseType.CREATE) {
      const res = await createBiz(values)
      if (res.data) {
        onClose(true)
      }
    } else {
      const res = await updateBiz(data!.id, values)
      if (res.data) {
        onClose(true)
      }
    }
    setLoading(false)
  }, [data, form, onClose, usage])
  const onDelete = useCallback(async () => {
    const res = await deleteBiz(data!.id)
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
        t(`page.adminBiz.drawer.${usage}`) + (data ? ` ID: ${data.id}` : '')
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
        <FormItem label={t('page.adminBiz.drawer.name')} field="name">
          <Input />
        </FormItem>
        <FormItem label={t('page.adminBiz.drawer.comment')} field="comment">
          <Input />
        </FormItem>
        <FormItem label={t('page.adminBiz.drawer.url')} field="url">
          <Input />
        </FormItem>
        <FormItem label={t('page.adminBiz.drawer.api')} field="api">
          <Input />
        </FormItem>
        <FormItem
          label={t('page.adminBiz.drawer.allowGroup')}
          field="allowGroup"
        >
          <Select mode="multiple">
            {group.map((item: IGroup) => (
              <Select.Option key={item.id} value={item.id}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </FormItem>
        <FormItem
          label={t('page.adminBiz.drawer.isOpen')}
          field="isOpen"
          triggerPropName="checked"
        >
          <Switch
            checkedText={t('common.on')}
            uncheckedText={t('common.off')}
          />
        </FormItem>
        <FormItem
          label={t('page.adminBiz.drawer.isPublic')}
          field="isPublic"
          triggerPropName="checked"
        >
          <Switch
            checkedText={t('common.on')}
            uncheckedText={t('common.off')}
          />
        </FormItem>
      </Form>
    </Drawer>
  )
}
