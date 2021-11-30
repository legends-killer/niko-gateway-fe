/*
 * @Author: legends-killer
 * @Date: 2021-11-09 23:16:22
 * @LastEditors: legends-killer
 * @LastEditTime: 2021-11-30 22:44:16
 * @Description: Main Router View Component
 */
import style from './style.module.less'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { Route, Switch, useLocation } from 'react-router-dom'
import NotFound from '@/page/404'
import Login from '@/page/login'
import Auth from '@/page/auth'
import Info from '@/page/info'
import UserLog from '@/page/user-log'
import Service from '@/page/service'
import AdminUser from '@/page/admin-user'
import AdminApi from '@/page/admin-api'
import AdminGroup from '@/page/admin-group'
import AdminBiz from '@/page/admin-biz'
import AdminABTest from '@/page/admin-abtest'
import AdminOther from '@/page/admin-other'
import AdminLog from '@/page/admin-log'
import AdminSystem from '@/page/admin-system'

export default function Main() {
  const location = useLocation()
  return (
    <div className={`${style['main-wrapper']} outter-card`}>
      <TransitionGroup>
        <CSSTransition key={location.pathname} classNames="fade" timeout={800}>
          <div className={style['safe-area']}>
            <Switch location={location}>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/auth">
                <Auth />
              </Route>
              <Route exact path="/info">
                <Info />
              </Route>
              <Route exact path="/log">
                <UserLog />
              </Route>
              <Route exact path="/service">
                <Service />
              </Route>
              <Route exact path="/admin/user">
                <AdminUser />
              </Route>
              <Route exact path="/admin/api">
                <AdminApi />
              </Route>
              <Route exact path="/admin/group">
                <AdminGroup />
              </Route>
              <Route exact path="/admin/biz">
                <AdminBiz />
              </Route>
              <Route exact path="/admin/abTest">
                <AdminABTest />
              </Route>
              <Route exact path="/admin/system">
                <AdminSystem />
              </Route>
              <Route exact path="/admin/other">
                <AdminOther />
              </Route>
              <Route exact path="/admin/log">
                <AdminLog />
              </Route>
              <Route path="*">
                <NotFound />
              </Route>
            </Switch>
          </div>
        </CSSTransition>
      </TransitionGroup>
    </div>
  )
}
