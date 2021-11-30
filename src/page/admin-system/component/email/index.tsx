/*
 * @Author: legends-killer
 * @Date: 2021-11-30 21:25:09
 * @LastEditors: legends-killer
 * @LastEditTime: 2021-12-01 02:48:01
 * @Description:
 */
import { ISystemSettingEmail, SystemSettingKey } from '../../types'
import { updateSystemConfig } from '../../api'
import { useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Message, Form, Input, Button, InputTag } from '@arco-design/web-react'

const FormItem = Form.Item

interface IProps {
  configKey: SystemSettingKey
  config: ISystemSettingEmail
  onChange: () => void
}

export default function Email(props: IProps) {
  const { t } = useTranslation()
  const { configKey, config, onChange } = props
  const [form] = Form.useForm()

  const onUpdate = useCallback(async () => {
    const newConfig = form.getFieldsValue()
    const res = await updateSystemConfig(configKey, newConfig)
    if (res.msg === 'success') {
      Message.success('success')
      onChange()
    }
  }, [form, configKey, onChange])

  useEffect(() => {
    form.setFieldsValue(config)
  })
  return (
    <>
      <Form form={form} labelAlign="left" layout="vertical">
        <FormItem label={t('page.adminSystem.errorEmail.user')} field={'user'}>
          <Input placeholder="input user" />
        </FormItem>
        <FormItem
          label={t('page.adminSystem.errorEmail.password')}
          field={'password'}
        >
          <Input.Password placeholder="input password" />
        </FormItem>
        <FormItem label={t('page.adminSystem.errorEmail.host')} field={'host'}>
          <Input placeholder="input SMTP host" />
        </FormItem>
        <FormItem
          label={t('page.adminSystem.errorEmail.sender')}
          field={'sender'}
        >
          <Input placeholder="input sender (in most cases is the same as user)" />
        </FormItem>
        <FormItem
          label={t('page.adminSystem.errorEmail.sendTo')}
          field={'sendTo'}
        >
          <InputTag placeholder="input sendTo" />
        </FormItem>
      </Form>
      <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
        <Button type="primary" onClick={onUpdate}>
          {t('common.update')}
        </Button>
      </div>
    </>
  )
}
