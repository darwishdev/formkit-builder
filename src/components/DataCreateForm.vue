<script setup lang="ts">
import { inject } from "vue";
import type { FormKitSection, FormKitOptions, ToastServiceMethods, FormSubmitHandler } from "../types";
import FormKitFactory from "@/factory/FormKitFactory"
import { useRouter } from 'vue-router'
const router = useRouter();
const useToast = inject("useToast") as () => ToastServiceMethods;
const toast = useToast()
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
            .then(() => {
                node.clearErrors()
                toast.add({ severity: 'success', summary: 'role_create_summary', detail: 'role_create_message', life: 3000 });
                if (!req.stayOnSamePageAfterSuccess) {
                    router.push({ name: handler.redirectRoute })
                    resolve(null)
                    return
                }
                node.reset()
                node.walk((child: any) => {
                    child.focuse()
                    console.log(child.focuse())
                })
                resolve(null)
                node.input({ stayOnSamePageAfterSuccess: true });
            }).catch((error: any) => {
                const message = error.message.split(' ')[1]
                if (message == 'internalServerError') {
                    toast.add({ severity: 'error', summary: 'error_summary', detail: 'internalServerError', life: 3000 });
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
    <FormKit type="form" @submit-invalid="log" :actions="false" @submit="submitHandler">
        <FormKitSchema :schema="formSchema" />
    </FormKit>
</template>