import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { Language } from './Language';
import { TranslationFR } from './fr';
import { TranslationEN } from './en';

const fallbackLng = ['fr'];


const resources = {
  en: {
    translation:  TranslationEN //new json object hereTranslationEN
  },
  fr: {
    translation: TranslationFR
  }
}

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    fallbackLng, // if user computer language is not on the list of available languages, than we will be using the fallback language specified earlier
    debug: true,
    whitelist: Object.values(Language),

    interpolation: {
      escapeValue: false
    },
  });

export default i18n;
