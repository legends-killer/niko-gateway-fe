/*
 * @Author: legends-killer
 * @Date: 2021-11-09 14:58:23
 * @LastEditors: legends-killer
 * @LastEditTime: 2021-11-26 22:18:59
 * @Description: App Main Component
 */
import Nav from '@/component/nav'
import Footer from './component/footer'
import Main from './component/main'
import './App.less'
import {
  isAdminContext,
  isAdminReducer,
  userPerferenceLanguageContext,
  userPerferenceLanguageReducer,
} from './globalContext'
import { useEffect, useReducer, useCallback } from 'react'
import { ConfigProvider } from '@arco-design/web-react'
import enUS from '@arco-design/web-react/es/locale/en-US'
import zhCN from '@arco-design/web-react/es/locale/zh-CN'

const getLocale = (language: string) => {
  switch (language) {
    case 'zh-CN':
      return zhCN
    case 'en-US':
      return enUS
    default:
      return enUS
  }
}
const componentConfig = {
  Button: {
    shape: 'round' as any,
  },
  Table: {
    border: false,
  },
}

function App() {
  // provide global context
  const [state, dispatch] = useReducer(isAdminReducer, false)
  const isAdminContextProvider = { state, dispatch }
  const [language, dispatchLanguage] = useReducer(
    userPerferenceLanguageReducer,
    'zh-CN'
  )
  useEffect(() => {
    dispatchLanguage(localStorage.getItem('language') || 'en-US')
  }, [])

  const onColorSchemeChange = useCallback((type?: 'dark' | 'normal') => {
    console.log(type)
    type === 'dark' && document.body.setAttribute('arco-theme', 'dark')
    type === 'normal' && document.body.removeAttribute('arco-theme')
  }, [])
  useEffect(() => {
    window.matchMedia('(prefers-color-scheme: dark)').matches &&
      onColorSchemeChange('dark')
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (e) =>
        onColorSchemeChange(e.matches ? 'dark' : 'normal')
      )
    window.removeEventListener('change', () => {})
  }, [onColorSchemeChange])
  const userPerferenceLanguageContextProvider = { language, dispatchLanguage }
  return (
    <ConfigProvider
      locale={getLocale(language)}
      componentConfig={componentConfig}
    >
      <div className="view">
        <isAdminContext.Provider value={isAdminContextProvider}>
          <userPerferenceLanguageContext.Provider
            value={userPerferenceLanguageContextProvider}
          >
            <div className="app">
              <div className="nav">
                <Nav />
              </div>
              <div className="main">
                <Main />
              </div>
            </div>
            <div className="footer">
              <Footer info="Niko Gateway" />
            </div>
          </userPerferenceLanguageContext.Provider>
        </isAdminContext.Provider>
      </div>
    </ConfigProvider>
  )
}

export default App
