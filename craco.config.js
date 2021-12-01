/*
 * @Author: legends-killer
 * @Date: 2021-11-09 15:17:56
 * @LastEditors: legends-killer
 * @LastEditTime: 2021-12-01 17:21:18
 * @Description:
 */
const CracoLessPlugin = require('craco-less')
const path = require('path')
const resolve = (dir) => path.resolve(__dirname, dir)
const isDev = process.env.NODE_ENV === 'development'
const TerserPlugin = require('terser-webpack-plugin')

const lessTsConfig = {
  overrideWebpackConfig: ({ webpackConfig }) => {
    const oneOfRule = webpackConfig.module.rules.find((rule) => rule.oneOf)
    oneOfRule.oneOf.unshift({
      test: /\.module?\.less$/,
      use: [
        'style-loader',
        {
          loader: '@teamsupercell/typings-for-css-modules-loader',
          options: {
            banner:
              '// autogenerated by typings-for-css-modules-loader. \n// Please do not change this file!',
          },
        },
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            sourceMap: isDev,
            modules: {
              localIdentName: isDev ? '[local]__[hash:4]' : '[hash:base64:5]',
            },
          },
        },
        'less-loader',
      ],
    })
    return webpackConfig
  },
}

module.exports = {
  webpack: {
    alias: {
      '@': resolve('src'),
    },
    plugins: [
      new TerserPlugin({
        sourceMap: false,
        parallel: true,
        terserOptions: {
          ecma: undefined,
          parse: {},
          compress: {
            warnings: false,
            drop_console: true,
            drop_debugger: true,
            pure_funcs: ['console.log'],
          },
        },
      }),
    ],
  },

  plugins: [
    {
      plugin: lessTsConfig,
      options: {},
    },
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              'border-radius-small': '5em',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
}