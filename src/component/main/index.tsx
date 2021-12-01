/*
 * @Author: legends-killer
 * @Date: 2021-11-09 23:16:22
 * @LastEditors: legends-killer
 * @LastEditTime: 2021-12-01 18:52:23
 * @Description: Main Router View Component
 */
import style from './style.module.less'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { Redirect, Route, Switch, useLocation } from 'react-router-dom'
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
import { baseRouter } from '@/prod.config'

export default function Main() {
  const location = useLocation()
  return (
    <div className={`${style['main-wrapper']} outter-card`}>
      <TransitionGroup>
        <CSSTransition key={location.pathname} classNames="fade" timeout={800}>
          <div className={style['safe-area']}>
            <Switch location={location}>
              <Route exact path={baseRouter + '/login'}>
                <Login />
              </Route>
              <Route exact path={baseRouter + '/auth'}>
                <Auth />
              </Route>
              <Route exact path={baseRouter + '/info'}>
                <Info />
              </Route>
              <Route exact path={baseRouter + '/log'}>
                <UserLog />
              </Route>
              <Route exact path={baseRouter + '/service'}>
                <Service />
              </Route>
              <Route exact path={baseRouter + '/admin/user'}>
                <AdminUser />
              </Route>
              <Route exact path={baseRouter + '/admin/api'}>
                <AdminApi />
              </Route>
              <Route exact path={baseRouter + '/admin/group'}>
                <AdminGroup />
              </Route>
              <Route exact path={baseRouter + '/admin/biz'}>
                <AdminBiz />
              </Route>
              <Route exact path={baseRouter + '/admin/abTest'}>
                <AdminABTest />
              </Route>
              <Route exact path={baseRouter + '/admin/system'}>
                <AdminSystem />
              </Route>
              <Route exact path={baseRouter + '/admin/other'}>
                <AdminOther />
              </Route>
              <Route exact path={baseRouter + '/admin/log'}>
                <AdminLog />
              </Route>
              <Route exact path={baseRouter + '/'}>
                <Redirect to={baseRouter + '/info'} />
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
