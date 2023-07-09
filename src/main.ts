
import { createApp } from 'vue'
import App from './App.vue'
import formKitConfig from './formkit.config'
import i18n from './locales/i18n'
import { plugin, defaultConfig } from '@formkit/vue'
import ToastService from 'primevue/toastservice';
import router from './router'
import PrimeVue from 'primevue/config'
import { useToast } from "primevue/usetoast";
import { useI18n } from 'vue-i18n';
import FormkitBuilder from "./FormkitBuilder"
import './assets/app.scss'
const app = createApp(App)




app.use(i18n).use(PrimeVue).use(FormkitBuilder, { useToast, i18n }).use(ToastService).use(plugin, defaultConfig(formKitConfig)).use(router)

app.mount('#app')
