// TODO: update version
import i18next from 'i18next'
import XHR from 'i18next-xhr-backend'
import langDetector from 'i18next-browser-languagedetector'

import ru from '../assets/locales/ru'

const resources = {
  ru,
}

i18next
  .use(XHR)
  .use(langDetector)
  .init({
    fallbackLng: 'ru',
    debug: process.env.NODE_ENV === 'development',
    react: {
      wait: true,
      nsMode: 'default',
    },
    resources,
    ns: ['auth'],
    defaultNS: 'auth',
  })

export default i18next
