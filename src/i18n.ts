import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en/translation.json'
import es from './locales/en/translation.json'
import nl from './locales/nl/translation.json'

const lng = localStorage.getItem('locale') || 'en'

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
translation: en
      }, 
      es: {
        translation: es
      },
      nl: {
        translation: nl
      }
    },
    lng,
    interpolation: {
      escapeValue: false
    },
    supportedLngs: ['en', 'es', 'nl']
  });

export default i18n;
