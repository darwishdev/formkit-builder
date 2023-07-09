import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import formKitConfig from './formkit.config'
import { plugin, defaultConfig } from '@formkit/vue'
import router from './router'

const app = createApp(App)

app.use(plugin, defaultConfig(formKitConfig)).use(router)

app.mount('#app')
