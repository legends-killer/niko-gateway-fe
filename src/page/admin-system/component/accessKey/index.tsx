/*
 * @Author: legends-killer
 * @Date: 2021-11-30 23:36:44
 * @LastEditors: legends-killer
 * @LastEditTime: 2021-12-01 03:01:22
 * @Description:
 */
import { ISystemSettingAccessKey, SystemSettingKey } from '../../types'
import { updateSystemConfig } from '../../api'
import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import copy from 'copy-to-clipboard'
import {
  Message,
  Form,
  Input,
  Button,
  Switch,
  Modal,
  Alert,
} from '@arco-design/web-react'

const FormItem = Form.Item

interface IProps {
  configKey: SystemSettingKey
  config: ISystemSettingAccessKey
  onChange: () => void
}

export default function AccessKey(props: IProps) {
  const { t } = useTranslation()
  const { configKey, config, onChange } = props
  const [form] = Form.useForm()
  const [visible, setVisible] = useState(false)
  const [newKey, setNewKey] = useState('')

  const onUpdate = useCallback(async () => {
    const newConfig = form.getFieldsValue()
    const res = await updateSystemConfig(configKey, newConfig)
    if (res.msg === 'success') {
      Message.success('success')
      setNewKey((res.data as any).key)
      setVisible(true)
    }
  }, [form, configKey])

  useEffect(() => {
    form.setFieldsValue(config)
  })
  return (
    <>
      <Form form={form} labelAlign="left" layout="vertical">
        <FormItem label={'key'} field={'key'}>
          <Input.Password disabled placeholder="input password" />
        </FormItem>
        <FormItem
          label={t('page.adminSystem.accessKey.enable')}
          field="enable"
          triggerPropName="checked"
        >
          <Switch
            checkedText={t('common.on')}
            uncheckedText={t('common.off')}
          />
        </FormItem>
      </Form>
      <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
        <Button type="primary" onClick={onUpdate}>
          {t('common.update')}
        </Button>
      </div>
      <Modal
        simple={true}
        visible={visible}
        okText="Copy To Clipboard"
        cancelText="Just Go Back"
        onOk={() => {
          copy(newKey)
          setVisible(false)
          onChange()
          Message.success('Copied to clipboard')
        }}
        onCancel={() => {
          setVisible(false)
          onChange()
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Alert closable type="info" content="Key Updated" />
          <p>{newKey}</p>
        </div>
      </Modal>
    </>
  )
}
