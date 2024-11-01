import i18next from 'i18next';
import id from '@/lang/id.json';
import en from '@/lang/en.json';

export default defineNuxtPlugin({
  order: 1,
  setup: (nuxtApp) => {
    const lang = useCookie('lang').value || 'en';

    i18next.init({
      lng: lang,
      interpolation: {
        prefix: '{',
        suffix: '}',
      },
      resources: {
        id: {
          translation: id,
        },
        en: {
          translation: en,
        },
      },
    });

    nuxtApp.lang = lang;
    nuxtApp.i18n = i18next;
  },
});
