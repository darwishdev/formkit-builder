
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

import apiClient from "@/api/ApiMock"
import 'primeicons/primeicons.css'
import './assets/app.scss'
import 'primevue/resources/primevue.min.css'
import './assets/prime_theme.scss'
import type { UploadHandler } from './types';



const app = createApp(App)


const uploadHandler: UploadHandler = {
    fileUpload: apiClient.fileUpload,
    fileRemove: apiClient.fileRemove,
}
app.use(i18n).use(PrimeVue).use(FormkitBuilder, { uploadHandler, useToast, i18n, formKitConfig }).use(ToastService).use(router)
app.component("FilterIcon", FilterIcon)
app.mount('#app')
