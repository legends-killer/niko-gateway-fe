/*
 * @Author: legends-killer
 * @Date: 2021-11-09 22:40:22
 * @LastEditors: legends-killer
 * @LastEditTime: 2021-12-01 19:09:29
 * @Description: Production Configuration
 */
const isProd = process.env.NODE_ENV === 'production'

export const cas = isProd
  ? 'https://github.com/login/oauth/authorize?client_id=bd29a9c2458c51142f68'
  : 'http://127.0.0.1:7001'

export const server = isProd
  ? 'https://api.niko-gateway.top:7003'
  : 'http://127.0.0.1:7001'

export const baseRouter = isProd ? '' : ''
