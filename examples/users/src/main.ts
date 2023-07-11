import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './plugins/i18n'
import PrimeVue from 'primevue/config'
import formKitConfig from './plugins/formkit.config'
import { plugin, defaultConfig } from '@formkit/vue'
import FormkitBuilder from "formkit-builder"
import ToastService from 'primevue/toastservice';
import { useToast } from "primevue/usetoast";
import "./app.css";
const app = createApp(App)
app.use(plugin, defaultConfig(formKitConfig))
    .use(router)
    .use(PrimeVue)
    .use(i18n)
    .use(ToastService)
    .use(FormkitBuilder, { useToast, i18n })

app.mount('#app')
