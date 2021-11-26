/*
 * @Author: legends-killer
 * @Date: 2021-11-09 14:58:23
 * @LastEditors: legends-killer
 * @LastEditTime: 2021-11-16 17:00:44
 * @Description: App Entry
 */
import React from 'react'
import ReactDOM from 'react-dom'
import './index.less'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter } from 'react-router-dom'
import '@arco-design/web-react/dist/css/arco.css'
import '@arco-design/web-react/dist/css/index.less'
import './i18n'
window.document.documentElement.lang = 'zh-CN'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
