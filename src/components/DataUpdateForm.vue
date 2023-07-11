<script setup lang="ts">
import { inject } from 'vue'
import LoadingForm from './LoadingForm.vue';
import ErrorForm from './ErrorForm.vue';
import type { FormKitSection, FormKitOptions, FormKitToastHandler, ToastServiceMethods, FormSubmitHandler, FormFindDataHandler } from "../types";
import { useDataFetcherFind } from 'vue-data-fetcher'
import FormKitFactory from "@/factory/FormKitFactory"
import { useRoute, useRouter } from 'vue-router'
import type { I18n } from 'vue-i18n/dist/vue-i18n.js';
import { handleSuccessToast } from '@/components/shared/FormHelpers'
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
const { responseData, loading, error } = useDataFetcherFind<RequestType, ResponseType>(props.findDataHandler.findData, props.findDataHandler.findRequerPropertyName, props.findDataHandler.mapFunction);
const submitHandler = async (req: any, node: any) => {
    const handler = props.submitHandler
    if (handler.mapFunction) {
        req = handler.mapFunction(req)
    }
    req[handler.indentifierPropertyName!] = parseInt(params.id as string)
    await new Promise((resolve) => {
        handler.submit(req)
            .then(() => {
                node.clearErrors()
                handleSuccessToast(props.toastHandler, toast, t, props.options.title)
                push({ name: handler.redirectRoute })
                resolve(null)
            }).catch((error: any) => {
                const message = error.message.split(' ')[1]
                if (message == 'internalServerError') {
                    toast.add({ severity: 'error', summary: t('error_summary'), detail: t('internalServerError'), life: 3000 });
                } else {
                    if (handler.errorHandler[message]) {
                        node.setErrors(
                            [],
                            handler.errorHandler[message]
                        )
                    } else {
                        node.setErrors([message])
                    }

                }

                resolve(null)
            })
    })
}
</script>
<template>
    <loading-form v-if="loading" />
    <error-form v-else-if="error" :error="error" />
    <FormKit v-else :value="responseData" type="form" @submit-invalid="log" :actions="false" @submit="submitHandler">
        <FormKitSchema :schema="formSchema" />
    </FormKit>
</template>../factory/FormFactory