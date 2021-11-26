/*
 * @Author: legends-killer
 * @Date: 2021-11-11 13:05:23
 * @LastEditors: legends-killer
 * @LastEditTime: 2021-11-15 12:44:04
 * @Description:
 */

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { en } from './en'
import { ch } from './ch'
// moment.js l10n
import 'moment/locale/zh-cn'

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
export const resources = {
  'zh-CN': {
    translation: ch,
  },
  en: {
    translation: en,
  },
}

export const defaultNS = 'translation'

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: localStorage.getItem('language') || 'en-US', // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option
    ns: ['translation'], // use default namespace
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  })

export default i18n
