/*
 * @Author: legends-killer
 * @Date: 2021-11-30 21:25:09
 * @LastEditors: legends-killer
 * @LastEditTime: 2021-12-01 03:01:28
 * @Description:
 */
import { ISystemSettingErrorReport, SystemSettingKey } from '../../types'
import { updateSystemConfig } from '../../api'
import { useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Message,
  Form,
  Button,
  Switch,
  DatePicker,
  InputNumber,
} from '@arco-design/web-react'

const FormItem = Form.Item

interface IProps {
  configKey: SystemSettingKey
  config: ISystemSettingErrorReport
  onChange: () => void
}

export default function ErrorReport(props: IProps) {
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
      <Form form={form} labelAlign="right" layout="vertical">
        <FormItem
          label={t('page.adminSystem.errorReportBase.timeThreshold')}
          field={'timeThreshold'}
        >
          <InputNumber suffix={t('common.min')} />
        </FormItem>
        <FormItem
          label={t('page.adminSystem.errorReportBase.warnThreshold')}
          field={'warnThreshold'}
        >
          <InputNumber suffix={'Records'} />
        </FormItem>
        <FormItem
          label={t('page.adminSystem.errorReportBase.errorThreshold')}
          field={'errorThreshold'}
        >
          <InputNumber suffix={'Records'} />
        </FormItem>
        <FormItem
          label={t('page.adminSystem.errorReportBase.muteUntil')}
          field={'muteUntil'}
        >
          <DatePicker format="YYYY-MM-DD HH:mm:ss" style={{ width: '100%' }} />
        </FormItem>
        <FormItem
          label={t('page.adminSystem.errorReportBase.enable')}
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
    </>
  )
}
