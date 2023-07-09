
import { createApp } from 'vue'
import App from './App.vue'
import formKitConfig from './formkit.config'
import { plugin, defaultConfig } from '@formkit/vue'
import ToastService from 'primevue/toastservice';
import router from './router'
import PrimeVue from 'primevue/config'
import { useToast } from "primevue/usetoast";
import FormkitBuilder from "./FormkitBuilder"
import './assets/app.scss'
const app = createApp(App)



app.use(PrimeVue).use(FormkitBuilder, { router, useToast }).use(ToastService).use(plugin, defaultConfig(formKitConfig)).use(router)

app.mount('#app')
