import "@formkit/themes/genesis"
import { genesisIcons } from "@formkit/icons"
import type { DefaultConfigOptions } from '@formkit/vue'
import { createProPlugin, inputs } from '@formkit/pro'
import '@formkit/pro/genesis'
// import SubmitLoading from '../inputs/SubmitLoading.vue'

const pro = createProPlugin(import.meta.env.VITE_FORMKIT_TOKEN, inputs)



function loadSelectOptions(node: any) {
  node.on('created', () => {
    // const isRequired = node.props.parsedRules.some(rule => rule.name === 'required');
    // if (!isRequired) return

    // const isMultiOption = isCheckboxAndRadioMultiple(node)

    // // if we're going to modify the schema then we need
    // // to update the schemaMemoKey so we don't get an 
    // // invalid cached schema.
    // node.props.definition.schemaMemoKey = `required_${isMultiOption ? 'multi_' : ""}${node.props.definition.schemaMemoKey}`

    // const schemaFn = node.props.definition.schema;
    // node.props.definition.schema = (sectionsSchema = {}) => {
    //     if (isRequired) {
    //         if (isMultiOption) {
    //             sectionsSchema.legend = {
    //                 children: ['$label', '*']
    //             }
    //         } else {
    //             sectionsSchema.label = {
    //                 children: ['$label', '*']
    //             }
    //         }
    //     }
    //     return schemaFn(sectionsSchema);
    // }
  })
}

const config: DefaultConfigOptions = {
  plugins: [pro, loadSelectOptions],
  icons: { ...genesisIcons },

}

export default config
