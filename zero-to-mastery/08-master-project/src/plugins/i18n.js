import { createI18n } from 'vue-i18n';
import messages from '@intlify/vite-plugin-vue-i18n/messages';

const i18n = createI18n({
  legacy: false,
  fallbackLocale: 'en',
  locale: 'en',
  globalInjection: true,
  messages,
});

export default i18n;
