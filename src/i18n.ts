import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en/translation.json'
import es from './locales/en/translation.json'
import nl from './locales/nl/translation.json'

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en, 
      es,
      nl
    },
    lng: "en",
    interpolation: {
      escapeValue: false
    },
    supportedLngs: ['en', 'es', 'nl']
  });

export default i18n;
