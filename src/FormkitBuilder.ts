import type { App } from "vue"
import { DataCreateForm } from "./components"
import type { ToastServiceMethods } from './types'

export default {
    install: (app: App, options: { useToast: () => ToastServiceMethods }) => {
        app.component("DataCreateForm", DataCreateForm)
        app.provide("useToast", options.useToast);
    }
}