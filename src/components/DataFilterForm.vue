<script setup lang="ts">
import { ref } from "vue";
import type { FormKitInput, FormKitComponent } from "../types";
import { reset } from '@formkit/core'
import type { FormKitSchemaDefinition } from '@formkit/core'
import TimesIcon from '@/assets/times.svg'
import FormKitFactory from "@/factory/FormKitFactory"
import { debounce } from 'lodash'
const props = defineProps({
    inputs: {
        type: Array as () => Array<FormKitInput | FormKitComponent>,
        required: true,
    },
});
const emit = defineEmits(['filter', 'clearFilter', 'clearFilters'])
const formData = ref()
const activeFilters = ref({})

const schema = [
    {
        $el: 'div',
        attrs: {
            class: ' flex justify-content-between align-items-center'
        },
        children: [
            //grid with inputs
            {
                $el: 'div',
                attrs: {
                    class: 'grid col-11   mb-4'
                },
                children: props.inputs,

            },
            // filters
            {
                $el: 'div',
                attrs: {
                    class: ' flex justify-content-end col-1 cursor-pointer',
                    onClick: '$clearAllFilters'
                },
                children: [
                    {
                        $cmp: 'FilterIcon',

                        props: {
                            severity: "remove",
                            label: "clear_filters"
                        },

                    },

                ]
            },
        ],

    },




] as FormKitSchemaDefinition

const clearAllFilters = () => {
    activeFilters.value = {}
    formData.value = {}
    reset('filter-form')
    emit('clearFilters')
}
const schemaData = ref({
    clearAllFilters
})

const clearIcon = FormKitFactory.getClearIcon('$clearAllFilters')
const formSchema = FormKitFactory.CreateFilterForm(props.inputs, clearIcon) as any


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
const updateFormValue = async (value: any) => {
    const keys = Object.keys(value)
    for (let i = 0; i < keys.length; i++) {
        const currentIterationFilter = keys[i] as any
        const currentValue = value[currentIterationFilter] as any
        if (typeof currentValue == 'undefined') {
            continue;
        }
        const activeFiltersKeys = Object.keys(activeFilters.value)
        const filterObject = { key: currentIterationFilter, value: currentValue }
        emitter(filterObject)
        if (!activeFiltersKeys.includes(currentIterationFilter)) {
            // this will execute while defining new filter as active filter

            activeFilters.value[currentIterationFilter] = filterObject
            console.log(' show on first initilzatin')
            break
        }
        // this will execute while reactivating input already defined as activeFilter
        activeFilters.value[currentIterationFilter] = filterObject
        break
    }
}
const removeFilter = (filter: keyof typeof formData.value) => {
    delete activeFilters.value[filter]
    formData.value[filter] = undefined
    emitter(filter, 'clearFilter')
}

</script>
<template>
    <div class="bg-card border-round p-4">
        <FormKit :delay="3000" id="filter-form" v-model="formData" @input="updateFormValue" type="form" :actions="false">
            <FormKitSchema :schema="formSchema" :data="schemaData" />
        </FormKit>
        <div v-if="activeFilters" class="active-filters">
            <div class="filter" v-for="(filter, index) in Object.keys(activeFilters) " :key="index"
                @click.prevent="removeFilter(activeFilters[filter].key)">
                <filter-icon />
                <h3 class=""> <strong>{{ $t(`${activeFilters[filter].key}_filter`) }}</strong> : {{
                    activeFilters[filter].value }} </h3>
                <times-icon />
            </div>
        </div>
        <pre> {{ formData }}</pre>
    </div>
</template>