/*
 * @Author: legends-killer
 * @Date: 2021-11-25 01:34:56
 * @LastEditors: legends-killer
 * @LastEditTime: 2021-11-25 19:33:39
 * @Description:
 */
import { Button, Drawer, Input } from '@arco-design/web-react'
import { IconMinus, IconPlus } from '@arco-design/web-react/icon'
import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import style from './style.module.less'

interface IProps {
  visible: boolean
  onClose: (newHeader?: { [index: string]: string }) => void
  currentHeader: { [key: string]: string }
}

export default function HeaderDrawer(props: IProps) {
  const { t } = useTranslation()
  const { visible, onClose, currentHeader } = props
  const [newHeader, setNewHeader] = useState<{ [key: string]: string }>()
  const [newKey, setNewKey] = useState('')
  const [newValue, setNewValue] = useState('')
  const [error, setError] = useState(false)

  const onOk = useCallback(() => {
    onClose(newHeader)
  }, [newHeader, onClose])
  const onCancel = useCallback(() => {
    onClose()
  }, [onClose])

  const onChange = useCallback(
    (key: string, val: string, type: 'del' | 'add') => {
      const copy = JSON.parse(JSON.stringify(newHeader))
      if (type === 'del') {
        delete copy[key]
      } else {
        copy[key] = val
        setNewKey('')
        setNewValue('')
      }
      setNewHeader({ ...copy })
    },
    [newHeader]
  )

  useEffect(() => {
    setNewHeader(currentHeader)
  }, [currentHeader])
  return (
    <>
      <Drawer
        className={style.drawer2}
        title={t('page.adminApi.drawer2.title')}
        visible={visible}
        onOk={onOk}
        onCancel={onCancel}
      >
        {Object.keys(newHeader || {}).map((item) => {
          return (
            <>
              <Input.Group style={{ height: '50px' }}>
                <Input style={{ width: '30%' }} value={item} disabled />
                <IconMinus style={{ color: 'var(--color-text-1)' }} />
                <Input
                  style={{ width: '50%' }}
                  value={newHeader![item]}
                  disabled
                />
                <Button
                  type="primary"
                  icon={<IconMinus />}
                  onClick={() => {
                    onChange(item, '', 'del')
                  }}
                ></Button>
              </Input.Group>
            </>
          )
        })}
        <Input.Group style={{ height: '50px' }}>
          <Input
            placeholder={t('page.adminApi.drawer2.key')}
            error={error}
            style={{ width: '30%' }}
            value={newKey}
            onChange={(val) => {
              val && setError(false)
              setNewKey(val)
            }}
          />
          <IconMinus style={{ color: 'var(--color-text-1)' }} />
          <Input
            placeholder={t('page.adminApi.drawer2.value')}
            error={error}
            style={{ width: '50%' }}
            value={newValue}
            onChange={(val) => {
              val && setError(false)
              setNewValue(val)
            }}
          />
          <Button
            type="primary"
            icon={<IconPlus />}
            onClick={() => {
              // just allow empty value
              if (!newKey) {
                setError(true)
                return
              }
              onChange(newKey, newValue, 'add')
            }}
          ></Button>
        </Input.Group>
      </Drawer>
    </>
  )
}
