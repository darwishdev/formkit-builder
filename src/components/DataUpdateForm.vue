<script setup lang="ts">
import { inject } from 'vue'
import LoadingForm from './LoadingForm.vue';
import ErrorForm from './ErrorForm.vue';
import type { FormKitSection, FormKitOptions, FormKitToastHandler, ToastServiceMethods, FormSubmitHandler, FormFindDataHandler } from "../types";
import { useDataFetcherFind } from 'vue-data-fetcher'
import FormKitFactory from "@/factory/FormKitFactory"
import { useRoute, useRouter } from 'vue-router'
import type { I18n } from 'vue-i18n/dist/vue-i18n.js';
import { handleSuccessToast, handleError } from '@/components/shared/FormHelpers'
// import type { FormKitNode } from "@formkit/core"
const { push } = useRouter();
const useToast = inject("useToast") as () => ToastServiceMethods;
const toast = useToast()
const i18n = inject("i18n") as I18n
const { t } = i18n.global


const { params } = useRoute()
const props = defineProps({
    sections: {
        type: Array as () => Array<FormKitSection>,
        required: true,
    },
    options: {
        type: Object as () => FormKitOptions,
        required: true,
    },
    submitHandler: {
        type: Object as () => FormSubmitHandler<any, any, any>,
        required: true,
    },
    findDataHandler: {
        type: Object as () => FormFindDataHandler<any, any, any>,
        required: true,
    },
    toastHandler: {
        type: Object as () => FormKitToastHandler,
        required: false,
    }
});

const log = console.log


const formSchema = FormKitFactory.CreateForm(props.options, props.sections) as any

type ResponseType = ReturnType<typeof props.findDataHandler.findData>;
type RequestType = Record<string, number>

const requestValue = props.findDataHandler.reqValue ? props.findDataHandler.reqValue : parseInt(params.id as string)
const req: RequestType = {}
req[props.findDataHandler.findRequerPropertyName] = requestValue
const { responseData, loading, error } = useDataFetcherFind<RequestType, ResponseType>(props.findDataHandler.findData, req);
const submitHandler = async (req: any, node: any) => {
    const handler = props.submitHandler
    if (handler.mapFunction) {
        req = handler.mapFunction(req)
    }
    req[handler.indentifierPropertyName!] = parseInt(params.id as string)
    await new Promise((resolve) => {
        handler.submit(req)
            .then(async (res: any) => {
                node.clearErrors()
                node.reset()
                handleSuccessToast(props.toastHandler, toast, t, props.options.title)
                if (handler.redirectRoute) push({ name: handler.redirectRoute })

                if (handler.submitCallBack) await handler.submitCallBack(res)
                resolve(null)
            }).catch((error: any) => {
                handleError(error, node, toast, handler.errorHandler, t)

                resolve(null)
            })
    })
}
</script>
<template>
    <h2>
        {{ paramId }} assas</h2>
    <loading-form v-if="loading" />
    <error-form v-else-if="error" :error="error" />
    <FormKit v-else :value="responseData" type="form" @submit-invalid="log" :actions="false" @submit="submitHandler">
        <FormKitSchema :schema="formSchema" />
    </FormKit>
</template>../factory/FormFactory