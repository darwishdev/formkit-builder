<script setup lang="ts">
import { inject } from "vue";
import type { FormKitSection, FormKitOptions, ToastServiceMethods, FormKitToastHandler, FormSubmitHandler } from "../types";
import FormKitFactory from "@/factory/FormKitFactory"
import type { I18n } from "vue-i18n/dist/vue-i18n.js";
import { handleSuccessToast, handleError } from '@/components/shared/FormHelpers'
import { useRouter } from 'vue-router'
const router = useRouter();
const useToast = inject("useToast") as () => ToastServiceMethods;
const toast = useToast()
const i18n = inject("i18n") as I18n

const { t } = i18n.global
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
    toastHandler: {
        type: Object as () => FormKitToastHandler,
        required: false,
    }
});

const log = console.log


const formSchema = FormKitFactory.CreateForm(props.options, props.sections) as any

const submitHandler = async (req: any, node: any) => {
    const handler = props.submitHandler
    if (handler.mapFunction) {
        req = handler.mapFunction(req)
    }

    await new Promise((resolve) => {
        handler.submit(req)
            .then(async (res: any) => {
                node.reset()

                if (handler.submitCallBack) await handler.submitCallBack(res)
                handleSuccessToast(props.toastHandler, toast, t, props.options.title)
                if (!req.stayOnSamePageAfterSuccess) {
                    if (handler.redirectRoute) router.push({ name: handler.redirectRoute })
                    resolve(null)
                    return
                }
                node.clearErrors()
                node.input({ stayOnSamePageAfterSuccess: true });
                resolve(null)
            }).catch((error: any) => {
                handleError(error, node, toast, handler.errorHandler, t)
                resolve(null)
            })
    })
}
</script>
<template>
    <FormKit type="form" @submit-invalid="log" :actions="false" @submit="submitHandler">
        <FormKitSchema :schema="formSchema" />
    </FormKit>
</template>