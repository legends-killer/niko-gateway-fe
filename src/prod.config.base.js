/*
 * @Author: legends-killer
 * @Date: 2021-11-09 22:40:22
 * @LastEditors: legends-killer
 * @LastEditTime: 2021-12-01 17:15:41
 * @Description: Production Configuration
 */
const isProd = process.env.NODE_ENV === 'production'

export const cas = isProd ? '' : ''

export const server = isProd ? '' : ''
