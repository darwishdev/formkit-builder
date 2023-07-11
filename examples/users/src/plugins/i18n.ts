
import { createI18n } from 'vue-i18n'
import en from '../locales/en.json'
import ar from '../locales/ar.json'

const i18n = createI18n({
    locale: 'en',
    fallbackLocale: 'en',
    useScope: 'global',
    globalInjection: true,
    legacy: false,
    messages: {
        en,
        ar
    }
})
export default i18n
