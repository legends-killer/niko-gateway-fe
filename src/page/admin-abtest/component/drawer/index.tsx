/*
 * @Author: legends-killer
 * @Date: 2021-11-16 22:02:40
 * @LastEditors: legends-killer
 * @LastEditTime: 2021-11-25 19:29:26
 * @Description:
 */
import { IAdminABTest, EDrawerUseType, IAdminABTestCreate } from '../../types'
import { createABTest, updateABTest, deleteABTest } from '../../api'
import {
  Drawer,
  Form,
  Input,
  Switch,
  Select,
  InputNumber,
} from '@arco-design/web-react'
import { useState, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import Footer from './footer'

const FormItem = Form.Item

interface IProps {
  visible: boolean
  onClose: (refresh: boolean) => void
  data?: IAdminABTest
  usage: EDrawerUseType
}
export default function GroupDrawer(props: IProps) {
  const { visible, onClose, data, usage } = props
  const [form] = Form.useForm()

  const [loading, setLoading] = useState(false)
  const { t } = useTranslation()

  const onSubmit = useCallback(async () => {
    setLoading(true)
    const values = form.getFieldsValue() as IAdminABTestCreate
    if (usage === EDrawerUseType.CREATE) {
      const res = await createABTest(values)
      if (res.data) {
        onClose(true)
      }
    } else {
      const res = await updateABTest(data!.id, values)
      if (res.data) {
        onClose(true)
      }
    }
    setLoading(false)
  }, [data, form, onClose, usage])
  const onDelete = useCallback(async () => {
    const res = await deleteABTest(data!.id)
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
        t(`page.adminABTest.drawer.${usage}`) + (data ? ` ID: ${data.id}` : '')
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
        <FormItem label={t('page.adminABTest.drawer.comment')} field="comment">
          <Input />
        </FormItem>
        <FormItem label={t('page.adminABTest.drawer.method')} field="method">
          <Select>
            <Select.Option value="get">GET</Select.Option>
            <Select.Option value="post">POST</Select.Option>
            <Select.Option value="put">PUT</Select.Option>
            <Select.Option value="delete">DELETE</Select.Option>
          </Select>
        </FormItem>
        <FormItem label={t('page.adminABTest.drawer.origin')} field="origin">
          <Input />
        </FormItem>
        <FormItem label={t('page.adminABTest.drawer.server')} field="server">
          <Input />
        </FormItem>
        <FormItem label={t('page.adminABTest.drawer.dest')} field="dest">
          <Input />
        </FormItem>
        <FormItem label={t('page.adminABTest.drawer.current')} field="current">
          <InputNumber min={0} max={100} suffix={'%'} />
        </FormItem>
        <FormItem
          label={t('page.adminABTest.drawer.increase')}
          field="increase"
        >
          <InputNumber min={0} max={100} suffix={'%'} />
        </FormItem>
        <FormItem label={t('page.adminABTest.drawer.timeGap')} field="timeGap">
          <InputNumber min={0} suffix={t('common.hr')} />
        </FormItem>
        <FormItem
          label={t('page.adminABTest.drawer.suspend')}
          field="suspend"
          triggerPropName="checked"
        >
          <Switch
            checkedText={t('common.yes')}
            uncheckedText={t('common.no')}
          />
        </FormItem>
      </Form>
    </Drawer>
  )
}
