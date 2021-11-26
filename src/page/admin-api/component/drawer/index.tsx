/*
 * @Author: legends-killer
 * @Date: 2021-11-15 15:32:40
 * @LastEditors: legends-killer
 * @LastEditTime: 2021-11-25 20:04:10
 * @Description:
 */
import {
  Drawer,
  Form,
  Input,
  Switch,
  Select,
  Button,
} from '@arco-design/web-react'
import {
  IAdminApi,
  EDrawerUseType,
  IGroup,
  IAdminApiCreate,
  IAdminBiz,
} from '../../types'
import { createAdminApi, updateAdminApi, deleteAdminApi } from '../../api'
import { useState, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import Footer from './footer'
import HeaderDrawer from './header'

const FormItem = Form.Item

interface IProps {
  biz: IAdminBiz[]
  group: IGroup[]
  visible: boolean
  onClose: (refresh: boolean) => void
  data?: IAdminApi
  usage: EDrawerUseType
}

export default function ApiDrawer(props: IProps) {
  const { visible, onClose, data, usage, group, biz } = props
  const [form] = Form.useForm()
  const [vis, setVis] = useState(false)
  const [loading, setLoading] = useState(false)
  const { t } = useTranslation()

  const onSubmit = useCallback(async () => {
    setLoading(true)
    const values = {
      ...(form.getFieldsValue() as IAdminApiCreate),
      // hack 一下脱离form数据流的对象
      customHeader: form.getFieldValue('customHeader'),
    }
    if (usage === EDrawerUseType.CREATE) {
      const res = await createAdminApi(values)
      if (res.data) {
        onClose(true)
      }
    } else {
      const res = await updateAdminApi(data!.id, values)
      if (res.data) {
        onClose(true)
      }
    }
    setLoading(false)
  }, [data, form, onClose, usage])

  const onDelete = useCallback(async () => {
    const res = await deleteAdminApi(data!.id)
    if (res.data) {
      onClose(true)
    }
    setLoading(false)
  }, [data, onClose])

  useEffect(() => {
    form.resetFields()
    if (usage === EDrawerUseType.MODIFY) {
      form.setFieldsValue(data)
    } else {
      form.setFieldsValue({ dest: '/', switch: true, abTest: false })
    }
  }, [data, form, usage, visible])

  return (
    <Drawer
      visible={visible}
      onCancel={() => onClose(false)}
      className="drawer"
      closable={false}
      title={
        t(`page.adminApi.drawer.${usage}`) + (data ? ` ID: ${data.id}` : '')
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
        <FormItem label={t('page.adminApi.drawer.comment')} field="comment">
          <Input placeholder="input comment for api config" />
        </FormItem>
        <FormItem label={t('page.adminApi.drawer.router')} field="origin">
          <Input placeholder="input router for api config" />
        </FormItem>
        <FormItem label={t('page.adminApi.drawer.method')} field="method">
          <Select>
            <Select.Option value="get">GET</Select.Option>
            <Select.Option value="post">POST</Select.Option>
            <Select.Option value="put">PUT</Select.Option>
            <Select.Option value="delete">DELETE</Select.Option>
          </Select>
        </FormItem>
        <FormItem label={t('page.adminApi.drawer.server')} field="server">
          <Select>
            {biz.map((item) => (
              <Select.Option key={item.id} value={item.api}>
                {item.name + ' ' + item.api}
              </Select.Option>
            ))}
          </Select>
        </FormItem>
        <FormItem label={t('page.adminApi.drawer.dest')} field="dest">
          <Input placeholder="input dest for api config" />
        </FormItem>
        <FormItem
          label={t('page.adminApi.drawer.switch')}
          field="switch"
          triggerPropName="checked"
        >
          <Switch
            checkedText={t('common.on')}
            uncheckedText={t('common.off')}
          />
        </FormItem>
        <FormItem
          label={t('page.adminApi.drawer.abTest')}
          field="abTest"
          triggerPropName="checked"
        >
          <Switch
            checkedText={t('common.on')}
            uncheckedText={t('common.off')}
          />
        </FormItem>
        <FormItem
          label={t('page.adminApi.drawer.isPublic')}
          field="isPublic"
          triggerPropName="checked"
        >
          <Switch
            checkedText={t('common.on')}
            uncheckedText={t('common.off')}
          />
        </FormItem>
        <FormItem
          label={t('page.adminApi.drawer.allowGroup')}
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
        <FormItem label={t('page.adminApi.drawer.customHeader')}>
          <Button type="primary" onClick={() => setVis(!vis)}>
            {t('page.adminApi.drawer.customHeaderBtn')}
          </Button>
        </FormItem>
      </Form>
      <HeaderDrawer
        visible={vis}
        onClose={(newHeader) => {
          form.setFieldValue('customHeader', newHeader)
          setVis(false)
        }}
        currentHeader={data?.customHeader || {}}
      />
    </Drawer>
  )
}
