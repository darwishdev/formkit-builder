<script setup lang="ts">
import FilterIcon from '@/assets/filter.svg'
import FilterPlusIcon from '@/assets/filter-plus.svg'
import FilterRemoveIcon from '@/assets/filter-remove.svg'
import type { PropType } from 'vue';
const componnts = {
    '': FilterIcon,
    'remove': FilterRemoveIcon,
    'add': FilterPlusIcon,
}

type iconType = '' | 'remove' | 'add'
const props = defineProps({
    severity: {
        type: String as PropType<iconType>,
        default: '',
        required: false
    },
    label: {
        type: String,
        default: '',
        required: false
    }
})


</script>
<template>
    <div class="flex align-items-center">

        <label>{{ $t(props.label) }}</label>
        <component :is="componnts[props.severity]" style="fill: var(--color-white);margin-inline-end:4px" />
    </div>
</template>