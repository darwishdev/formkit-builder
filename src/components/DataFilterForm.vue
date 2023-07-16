<script setup lang="ts">
import { ref } from "vue";
import type { FormKitInput, FormKitComponent } from "../types";
import { reset } from '@formkit/core'
import TimesIcon from '@/assets/times.svg'
import FormKitFactory from "@/factory/FormKitFactory"
import { debounce } from 'lodash'
import { inputTypes } from './filter'
const props = defineProps({
    inputs: {
        type: Array as () => Array<FormKitInput | FormKitComponent>,
        required: true,
    },
});

const clearIcon = FormKitFactory.getClearIcon('$clearAllFilters')
const formSchema = FormKitFactory.CreateFilterForm(props.inputs, clearIcon) as any

const emit = defineEmits(['filter', 'clearFilter', 'clearFilters'])
const formData = ref()
const activeFilters = ref({})

const clearAllFilters = () => {
    reset('filter-form')
    emit('clearFilters')
    activeFilters.value = {}
    // formData.value = {}

}
const schemaData = ref({
    clearAllFilters
})

const emitFilter = ref(debounce((filterObject: any) => {
    emit('filter', filterObject)
}, 500))
const emitClearFilter = ref(debounce((filter: any) => {
    emit('clearFilter', filter)
}, 500))

function emitter(args: any, emitFunc: string = 'filter') {
    const emits = {
        'filter': emitFilter,
        'clearFilter': emitClearFilter,
    }
    const targetEmit = emits[emitFunc]
    targetEmit.value.cancel()
    targetEmit.value(args)
}

const updateFormValue = async (value: any, node: any) => {
    const keys = Object.keys(value)
    let i = 0
    for (const input of keys) {
        const isBinded = (typeof activeFilters.value[input] != 'undefined' && activeFilters.value[input].value == value[input])
        if (typeof value[input] == 'undefined' || isBinded) {
            continue
        }
        i++
        console.log("iteration", i)
        const currentInput = node.at(input)
        const t = inputTypes[currentInput.props.type]
        const displayValue = t.getDisplayValue(currentInput)
        emitter({ key: input, value: currentInput.value })
        activeFilters.value[input] = { key: input, value: currentInput.value, displayValue }
        return
    }

}
const removeFilter = (filter: keyof typeof formData.value) => {
    delete activeFilters.value[filter]
    formData.value[filter] = undefined
    emitter(filter, 'clearFilter')
}

</script>
<template>
    <!-- <div class="bg-card border-round p-4"> -->
    <FormKit :delay="3000" id="filter-form" v-model="formData" @input="updateFormValue" type="form" :actions="false">
        <FormKitSchema :schema="formSchema" :data="schemaData" />
    </FormKit>
    <div v-if="activeFilters" class="active-filters">
        <div class="filter" v-for="(filter, index) in Object.keys(activeFilters) " :key="index"
            @click.prevent="removeFilter(activeFilters[filter].key)">
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="none" viewBox="0 0 24 24">
                <path stroke="#464455" stroke-linecap="round" stroke-linejoin="round"
                    d="M18 7h-2m-3.5-2H6c-.471 0-.707 0-.854.146C5 5.293 5 5.53 5 6v1.965c0 .262 0 .393.06.503.058.11.167.184.385.329l3.024 2.015c.872.582 1.308.873 1.544 1.315.237.442.237.966.237 2.014V19l3.5-1.75v-3.11c0-1.047 0-1.571.237-2.013.133-.25.331-.452.636-.686M20 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
            <h3 class=""> <strong>{{ $t(`${activeFilters[filter].key}_filter`) }}</strong> : {{
                activeFilters[filter].displayValue }} </h3>
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="none" viewBox="0 0 24 24">
                <path stroke="var(--color-white)" stroke-linecap="round" stroke-width="2" d="m16 8-8 8m0-8 8 8" />
            </svg>
        </div>
    </div>
    <!-- <pre> {{ formData }}</pre> -->
    <!-- </div> -->
</template>