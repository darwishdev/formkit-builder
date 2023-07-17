import type { App } from "vue"
import * as components from "./components"
import type { ToastServiceMethods } from './types'
import type { I18n } from "vue-i18n/dist/vue-i18n.js"
import FormKitFactory from "@/factory/FormKitFactory"
import { plugin, defaultConfig } from '@formkit/vue'
import type { DefaultConfigOptions } from '@formkit/vue'



// import type { i18n } from 'vue-i18n'
export default {
    install: (app: App, options: { useToast: () => ToastServiceMethods, i18n: I18n, formKitConfig: DefaultConfigOptions }) => {
        app.provide("useToast", options.useToast);
        app.provide("i18n", options.i18n);
        app.use(plugin, defaultConfig(options.formKitConfig))
        FormKitFactory.InitTranslation(options.i18n)

        Object.keys(components).forEach((key: string) => app.component(key, components[key as keyof typeof components]))
    }
}