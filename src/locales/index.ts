import {NativeModules, Platform,AsyncStorage} from 'react-native';
//import AsyncStorage from '@react-native-community/async-storage';
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import pt_br from './pt_BR.json';
import en_us from './en_US.json';

const resources = {
  ['pt-BR']: pt_br,
  ['en-US']: en_us,
};



i18n
  
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'pt-BR',
    debug: true,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;