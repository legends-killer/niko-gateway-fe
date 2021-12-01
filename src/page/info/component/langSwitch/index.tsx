/*
 * @Author: legends-killer
 * @Date: 2021-11-14 13:30:35
 * @LastEditors: legends-killer
 * @LastEditTime: 2021-12-01 18:07:37
 * @Description:
 */
import { IconLanguage } from '@arco-design/web-react/icon'
import { Dropdown, Menu } from '@arco-design/web-react'
import { useMemo, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { userPerferenceLanguageContext } from '@/globalContext'
import style from './style.module.less'

export default function LangSwitch() {
  const { dispatchLanguage } = useContext(userPerferenceLanguageContext)
  const { i18n } = useTranslation()
  const dropList = useMemo(() => {
    const currentLang = i18n.language
    return (
      <Menu>
        <Menu.Item
          key="1"
          onClick={() => {
            i18n.changeLanguage('zh-CN')
            dispatchLanguage('zh-CN')
          }}
        >
          <div className={`${currentLang === 'zh-CN' ? style.active : ''}`}>
            简体中文
          </div>
        </Menu.Item>
        <Menu.Item
          key="2"
          onClick={() => {
            i18n.changeLanguage('en')
            dispatchLanguage('en-US')
          }}
        >
          <div className={`${currentLang === 'en' ? style.active : ''}`}>
            English
          </div>
        </Menu.Item>
      </Menu>
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n, i18n.language])
  return (
    <div style={{ fontSize: '1.25rem', cursor: 'pointer' }}>
      <Dropdown droplist={dropList} position="br" trigger="click">
        <IconLanguage />
      </Dropdown>
    </div>
  )
}
