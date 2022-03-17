import i18next from 'i18next';
import {en, vn} from 'locales';
import {initReactI18next} from 'react-i18next';

i18next.use(initReactI18next).init({
  resources: {
    en: {
      translation: en
    },
    vn: {
      translation: vn
    }
  },
  lng: 'en',
  fallbackLng: 'en', // use en if detected lng is not available
  keySeparator: '.', // we do not use keys in form messages.welcome

  interpolation: {
    escapeValue: false // react already safes from xss
  }
});

export default i18next;
