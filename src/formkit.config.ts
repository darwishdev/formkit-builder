import "@formkit/themes/genesis"
import { genesisIcons } from "@formkit/icons"
import type { DefaultConfigOptions } from '@formkit/vue'
import { createProPlugin, inputs } from '@formkit/pro'
import '@formkit/pro/genesis'
// import SubmitLoading from '../inputs/SubmitLoading.vue'

const pro = createProPlugin(import.meta.env.VITE_FORMKIT_TOKEN, inputs)



function loadSelectOptions(node: any) {
    node.on('created', () => {
        const hasOptions = typeof node.props.options != 'undefined';
        if (hasOptions) {
            // node.props.options().then(res => {
            //     console.log(res)
            // })
            // node.props.attrs.optionsGetter().then((res: any) => node.props.options = res)
        }
    })
}

const config: DefaultConfigOptions = {
    plugins: [pro, loadSelectOptions],
    icons: { ...genesisIcons },

}

export default config
