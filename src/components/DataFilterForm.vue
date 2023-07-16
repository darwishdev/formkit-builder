<script setup lang="ts">
import { ref } from "vue";
import type { FormKitInput, FormKitComponent } from "../types";
import { reset } from '@formkit/core'
import TimesIcon from '@/assets/times.svg'
import FormKitFactory from "@/factory/FormKitFactory"
import { debounce } from 'lodash'
import { parseDate } from "./shared/FormHelpers";
import type { FilterHandler } from './filter'
import { inputTypes, DefaultInputFilter, ListInputFilter, DateInputFilter } from './filter'
import { t } from "vue-i18n";
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
    console.log('clearFilers')
    reset('filter-form')
    emit('clearFilters')
    activeFilters.value = {}
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
    // const updatedInputName = value.find(valueKey => {
    //     console.log(valueKey)
    //     return valueKey == 'roleName'
    // })

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
    return
    for (let i = 0; i < keys.length; i++) {
        const currentIterationFilter = keys[i] as any
        const currentValue = value[currentIterationFilter] as any
        if (typeof currentValue == 'undefined') {
            continue;
        }
        const currentInput = node.at(currentIterationFilter)
        let currentDisplayValue = ""

        console.log('currentInput')
        console.log(currentInput.props.type)
        if (currentInput && 'options' in currentInput.props) {
            const valueLable = currentInput.props.options.find(option => option.value === `__mask_${currentValue}`).label
            currentDisplayValue = valueLable
        } else if (currentInput.props.type == 'datepicker') {
            currentDisplayValue = parseDate(currentValue)
        } else {

            currentDisplayValue = currentValue;
        }
        const filterObject = { key: currentIterationFilter, value: currentDisplayValue }
        const isBinded = (typeof activeFilters.value[currentIterationFilter] != 'undefined' && activeFilters.value[currentIterationFilter].value == currentDisplayValue)
        if (isBinded) {
            continue;
        }
        const activeFiltersKeys = Object.keys(activeFilters.value)
        emitter({ key: currentIterationFilter, value: currentValue })
        if (!activeFiltersKeys.includes(currentIterationFilter)) {
            // this will execute while defining new filter as active filter
            activeFilters.value[currentIterationFilter] = filterObject
            break
        }
        // this will execute while reactivating input already defined as activeFilter
        activeFilters.value[currentIterationFilter] = filterObject
        // console.log(' show on reactive')
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
    <!-- <div class="bg-card border-round p-4"> -->
    <FormKit :delay="3000" id="filter-form" v-model="formData" @input="updateFormValue" type="form" :actions="false">
        <FormKitSchema :schema="formSchema" :data="schemaData" />
    </FormKit>
    <div v-if="activeFilters" class="active-filters">
        <div class="filter" v-for="(filter, index) in Object.keys(activeFilters) " :key="index"
            @click.prevent="removeFilter(activeFilters[filter].key)">
            <filter-icon />
            <h3 class=""> <strong>{{ $t(`${activeFilters[filter].key}_filter`) }}</strong> : {{
                activeFilters[filter].displayValue }} </h3>
            <times-icon />
        </div>
    </div>
    <!-- <pre> {{ formData }}</pre> -->
    <!-- </div> -->
</template>