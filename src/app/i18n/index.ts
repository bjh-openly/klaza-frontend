import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en';
import ko from './locales/ko';

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    lng: 'en',
    fallbackLng: 'en',
    resources: {
      en: { translation: en },
      ko: { translation: ko },
    },
  });
}

export default i18n;
