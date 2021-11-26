/*
 * @Author: legends-killer
 * @Date: 2021-11-09 22:37:04
 * @LastEditors: legends-killer
 * @LastEditTime: 2021-11-25 19:25:26
 * @Description: Sidebar Nav
 */
import style from './style.module.less'
import { Menu } from '@arco-design/web-react'
import {
  IconInfoCircle,
  IconSettings,
  IconBulb,
} from '@arco-design/web-react/icon'
import { Link, useLocation } from 'react-router-dom'
import { useContext, useEffect, useState, useCallback } from 'react'
import { isAdminContext } from '@/globalContext'
import { useTranslation } from 'react-i18next'

const MenuItem = Menu.Item
const SubMenu = Menu.SubMenu
const navMap: {
  [key: string]: string
} = {
  '/info': '0',
  '/log': '1_0',
  '/service': '1_1',
  '/admin/api': '2_0',
  '/admin/abTest': '2_1',
  '/admin/user': '2_2',
  '/admin/group': '2_3',
  '/admin/biz': '2_4',
  '/admin/log': '2_5',
  '/admin/other': '2_6',
}

export default function Nav() {
  const { t } = useTranslation()
  const location = useLocation()
  const { state } = useContext(isAdminContext)
  const [admin, setAdmin] = useState(false)
  const [selected, setSelected] = useState('')
  useEffect(() => {
    setAdmin(state || sessionStorage.getItem('admin') === '1')
  }, [admin, state])
  useEffect(() => {
    const key = navMap[location.pathname]
    setSelected(key)
  }, [location.pathname])
  const [size, setSize] = useState({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight,
  })
  const onResize = useCallback(() => {
    setSize({
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
    })
  }, [])
  useEffect(() => {
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [onResize])
  return (
    <div className={`${style['nav-wrapper']} outter-card`}>
      <Menu
        mode={size.width > 768 ? 'vertical' : 'horizontal'}
        className={style['nav-menu']}
        defaultOpenKeys={['1', '2']}
        defaultSelectedKeys={[selected]}
        selectedKeys={[selected]}
      >
        <Link to="/info">
          <MenuItem key="0">
            <IconInfoCircle />
            {t('nav.info')}
          </MenuItem>
        </Link>
        <SubMenu
          key="1"
          title={
            <>
              <IconBulb />
              {t('nav.btnMore')}
            </>
          }
        >
          <Link to="/log">
            <MenuItem key="1_0">{t('nav.log')}</MenuItem>
          </Link>
          <Link to="/service">
            <MenuItem key="1_1">{t('nav.service')}</MenuItem>
          </Link>
        </SubMenu>
        {admin && (
          <SubMenu
            key="2"
            title={
              <>
                <IconSettings /> {t('nav.btnConfig')}
              </>
            }
          >
            <Link to="/admin/api">
              <MenuItem key="2_0">{t('nav.api')}</MenuItem>
            </Link>
            <Link to="/admin/abTest">
              <MenuItem key="2_1">{t('nav.abTest')}</MenuItem>
            </Link>
            <Link to="/admin/user">
              <MenuItem key="2_2">{t('nav.user')}</MenuItem>
            </Link>
            <Link to="/admin/group">
              <MenuItem key="2_3">{t('nav.group')}</MenuItem>
            </Link>
            <Link to="/admin/biz">
              <MenuItem key="2_4">{t('nav.biz')}</MenuItem>
            </Link>
            <Link to="/admin/log">
              <MenuItem key="2_5">{t('nav.sysLog')}</MenuItem>
            </Link>
            <Link to="/admin/other">
              <MenuItem key="2_6">{t('nav.other')}</MenuItem>
            </Link>
          </SubMenu>
        )}
      </Menu>
    </div>
  )
}
