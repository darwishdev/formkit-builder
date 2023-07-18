
import { createApp } from 'vue'
import App from './App.vue'
import formKitConfig from './formkit.config'
import i18n from './locales/i18n'
import ToastService from 'primevue/toastservice';
import router from './router'
import PrimeVue from 'primevue/config'
import { useToast } from "primevue/usetoast";
// import { useI18n } from 'vue-i18n';
import FilterIcon from '@/components/FilterIcon.vue'
import FormkitBuilder from "./FormkitBuilder"
import './assets/app.scss'
const app = createApp(App)

app.use(i18n).use(PrimeVue).use(FormkitBuilder, { useToast, i18n, formKitConfig }).use(ToastService).use(router)
app.component("FilterIcon", FilterIcon)
app.mount('#app')
