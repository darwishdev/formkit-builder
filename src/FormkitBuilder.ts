import type { App } from "vue"
import { DataCreateForm } from "./components"
import type { ToastServiceMethods } from './types'
import type { UseI18nOptions } from "vue-i18n/dist/vue-i18n.js"
// import type { i18n } from 'vue-i18n'
export default {
    install: (app: App, options: { useToast: () => ToastServiceMethods, i18n: any }) => {
        app.component("DataCreateForm", DataCreateForm)
        app.provide("useToast", options.useToast);
        app.provide("i18n", options.i18n);
    }
}