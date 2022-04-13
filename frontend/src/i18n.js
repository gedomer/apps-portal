import i18n from "i18next";
import { initReactI18next } from 'react-i18next';

const resources = {
    en: {},
    tr: {}
}

i18n
  .use(initReactI18next)
  .init({
    interpolation: { escapeValue: false },
    lng: 'en',
    debug: process.env.NODE_ENV == 'development',
    resources
  });

export { i18n }
