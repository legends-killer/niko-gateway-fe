/*
 * @Author: legends-killer
 * @Date: 2021-11-13 13:16:49
 * @LastEditors: legends-killer
 * @LastEditTime: 2021-11-25 19:41:23
 * @Description:
 */
import {
  Card,
  Avatar,
  Typography,
  Popover,
  Message,
} from '@arco-design/web-react'
import { IconArrowRight } from '@arco-design/web-react/icon'
import style from './style.module.less'
import { useTranslation } from 'react-i18next'
interface IProps {
  biz: {
    id: number
    name: string
    comment: string
    isOpen: boolean
    url: string
  }
  children?: any
}

const Content = (props: IProps) => {
  const { biz, children } = props
  const { t } = useTranslation()
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <span style={{ display: 'flex', alignItems: 'center', color: '#1D2129' }}>
        <Avatar
          style={{ marginRight: 8, backgroundColor: '#165DFF' }}
          size={28}
        >
          {biz.name.substr(0, 1).toUpperCase()}
        </Avatar>
        <Typography.Text>{`${biz.name} ${
          biz.isOpen ? '' : `(${t('page.service.closed')})`
        }`}</Typography.Text>
      </span>
      {children}
    </div>
  )
}

export default function BizCard(props: IProps) {
  const { biz } = props
  const { t } = useTranslation()
  return (
    <>
      <Popover trigger="hover" content={biz.comment} position="br">
        <Card
          className={style['card-with-icon-hover']}
          hoverable
          style={{
            width: '49%',
            cursor: biz.isOpen ? 'pointer' : '',
            marginBottom: '1%',
          }}
          onClick={() => {
            if (!biz.isOpen) {
              Message.warning(t('page.service.tipClosed'))
              return
            }
            window.location.href = `${biz.url}`
          }}
        >
          <a href={biz.url}>
            <Content biz={{ ...biz }}>
              <span className={style['icon-hover']}>
                <IconArrowRight />
              </span>
            </Content>
          </a>
        </Card>
      </Popover>
    </>
  )
}
