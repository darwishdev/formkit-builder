<script setup>
import { ref, inject } from 'vue'
import { useRoute } from 'vue-router';
import { reset } from '@formkit/vue';
const route = useRoute()

const uploadHandler = inject('uploadHandler')
const baseImage = import.meta.env.VITE_IMG_URL
const loading = ref(false)


const getExtension = (name) => {
    return name.slice(name.lastIndexOf('.') + 1);
}
const getCurrentDateString = () => {
    const currentDate = new Date();
    return currentDate.toLocaleString('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    }).replace(/[/.,\s:]/g, '');
}
const createFileUploadRequest = (file, ext) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            const fileData = new Uint8Array(event.target.result);
            const fileName = `${route.name.toString()}_${getCurrentDateString()}.${ext}`
            resolve({ fileName, fileData });
        };

        reader.onerror = () => {
            reject(new Error('Failed to read file'));
        };

        reader.readAsArrayBuffer(file);
    });
}

async function handleInput(data) {
    if (typeof data[0] == 'undefined') return
    loading.value = true
    const req = await createFileUploadRequest(data[0].file, getExtension(data[0].name))
    uploadHandler.fileUpload(req).then((res) => {
        props.context._value = res.fileName
        props.context.node.input(res.fileName)
        loading.value = false
    })

}


const handleFileRemove = async () => {
    if (!props.context._value || props.context._value == "") return
    loading.value = true
    await uploadHandler.fileRemove({ fileName: props.context._value })
    props.context._value = ""
    props.context.node.input(props.context._value)
    loading.value = false
    reset('file-input')


}
const props = defineProps({
    context: Object,
})

</script>

<template>
    <div class="upload" :class="{ 'disabled': loading }">
        <div class="loader" v-if="loading">
            <svg version="1.1" id="L9" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px"
                y="0px" viewBox="0 0 30 10" enable-background="new 0 0 0 0" xml:space="preserve">
                <rect x="14" y="1" width="2" height="3" fill="#fff">
                    <animateTransform attributeType="xml" attributeName="transform" type="translate" values="0 0; 0 5; 0 0"
                        begin="0" dur="0.6s" repeatCount="indefinite" />
                </rect>
                <rect x="18" y="1" width="2" height="3" fill="#fff">
                    <animateTransform attributeType="xml" attributeName="transform" type="translate" values="0 0; 0 5; 0 0"
                        begin="0.2s" dur="0.6s" repeatCount="indefinite" />
                </rect>
                <rect x="22" y="1" width="2" height="3" fill="#fff">
                    <animateTransform attributeType="xml" attributeName="transform" type="translate" values="0 0; 0 5; 0 0"
                        begin="0.4s" dur="0.6s" repeatCount="indefinite" />
                </rect>
            </svg>
        </div>
        <div class="img-wrapper" @click.prevent="handleFileRemove">
            <!-- {{ `${baseImage}${props.context._value}` }} -->
            <img v-if="props.context._value" class="uploaded-img" :src="`${baseImage}${props.context._value}`"
                :alt="props.context._value" />
            <div class="remove">
                <i class="pi pi-trash"></i>
                {{ $t('remove') }}
            </div>
        </div>
        <FormKit id="file-input" @input="handleInput" type="file" name="image" accept=".jpg,.png,.webp,.jpeg" />
    </div>
</template>


<style lang="scss">
.upload {
    width: 100%;

    .loader {
        width: 100px;
        position: absolute;
        top: 0;
        right: 0;
    }

    .img-wrapper {
        max-width: 250px;
        border-radius: 6px;
        background-color: var(--color-card);
        position: relative;
        cursor: pointer;

        & img {
            width: 100%;
        }

        & .remove {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: rgba(0, 0, 0, .8);
            font-size: 20px;
            font-weight: bold;
            z-index: 10;
            padding: 6px;
            border-radius: 6px;
            display: none;
            transition: all .3s;

        }

        &::after {
            transition: all .3s;
        }

        &:hover {
            & .remove {
                display: block;
            }

            &::after {
                content: "asdasdasdasd";
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                border-radius: 6px;
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: rgba(0, 0, 0, .6);
            }
        }

    }
}
</style>