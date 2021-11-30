/*
 * @Author: legends-killer
 * @Date: 2021-12-01 01:41:56
 * @LastEditors: legends-killer
 * @LastEditTime: 2021-12-01 03:01:31
 * @Description:
 */
import {
  SystemSettingKey,
  ScheduleName,
  ISystemSettingSchedule,
} from '../../types'
import { updateSystemConfig } from '../../api'
import { useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Message, Form, Button, Switch, Input } from '@arco-design/web-react'
import styles from './style.module.less'

const FormItem = Form.Item

interface IProps {
  configKey: SystemSettingKey
  config: ISystemSettingSchedule
  onChange: () => void
}

export default function Schedule(props: IProps) {
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
      <Form
        form={form}
        labelAlign="left"
        layout="vertical"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
      >
        {Object.keys(config).map((key) => {
          return (
            <FormItem
              label={t(
                `page.adminSystem.scheduleInterval.${key as ScheduleName}`
              )}
              style={{ marginBottom: 0 }}
            >
              <div className={styles['schedule-input-wrapper']}>
                <FormItem
                  field={`${key}.interval`}
                  className={styles['input-item']}
                >
                  <Input />
                </FormItem>
                <FormItem
                  field={`${key}.enable`}
                  triggerPropName="checked"
                  className={styles['switch-item']}
                >
                  <Switch
                    checkedText={t('common.on')}
                    uncheckedText={t('common.off')}
                  />
                </FormItem>
              </div>
            </FormItem>
          )
        })}
      </Form>
      <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
        <Button type="primary" onClick={onUpdate}>
          {t('common.update')}
        </Button>
      </div>
    </>
  )
}
