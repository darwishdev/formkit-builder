<script setup>
import { ref, onBeforeMount } from 'vue'
import InputSwitch from 'primevue/inputswitch';
import Panel from 'primevue/panel';
import Toolbar from 'primevue/toolbar';
import InputText from 'primevue/inputtext';
const props = defineProps({
    context: Object,
})
let modelValue = [];

const search = ref(null);
const checkedModel = ref([]);
const checkedGroupsModel = ref([]);
const checkAllModel = ref(false);
const permissions = ref(Object.assign({}, props.context.permissions))
const tmp = ref(props.context.value || '')

onBeforeMount(() => {
    if (props.context._value) {
        props.context._value.forEach(id => {
            checkedModel.value[id] = id
        });
        modelValue = props.context._value
        props.context.node.input(modelValue)
    }
    console.log(typeof props.context.permissions)
})
/**
 * Handle input, advancing or retreating focus.
 */
function handleInput(value) {
    if (value > 0) {
        modelValue.push(value)
        props.context.node.input(modelValue)
        console.log(modelValue)
        return
    }

    const index = modelValue.indexOf(value * -1);
    if (index !== -1) {
        modelValue.splice(index, 1)

    }
    props.context.node.input(modelValue)
    console.log(modelValue)
}
function toggleSelectAllGroup(value, permissions) {
    permissions.forEach(perm => {
        console.log(perm.permission_id)
        checkedModel.value[perm.permission_id] = value ? perm.permission_id : perm.permission_id * -1
        if (value) {
            const index = modelValue.indexOf(perm.permission_id);
            if (index == -1) {
                modelValue.push(perm.permission_id)
            }
        } else {
            const index = modelValue.indexOf(perm.permission_id);
            if (index !== -1) {
                modelValue.splice(index, 1)
            }
        }

    });

    // modelValue = value ? permissions.value.permissionsIds : []
    props.context.node.input(modelValue)
}
/**
 * On focus, select the text in our input.
 */
function handleFocus(e) {
    e.target.select()

}
function handleSearch(value) {
    if (value == "") {
        permissions.value = Object.assign({}, props.context.permissions)
        return
    }
    const lowercaseSearchKey = value.toLowerCase();
    const filteredPermissions = props.context.permissions.permissions.filter((permissionRow) => {
        const lowercaseGroup = permissionRow.group.toLowerCase();
        const hasMatchingGroup = lowercaseGroup.includes(lowercaseSearchKey);

        const hasMatchingPermission = permissionRow.permissions.some((permission) => {
            const lowercasePermissionName = permission.permission_name.toLowerCase();
            return lowercasePermissionName.includes(lowercaseSearchKey);
        });

        return hasMatchingGroup || hasMatchingPermission;
    });

    permissions.value.permissions = filteredPermissions

}

function toggleSelectAll(value) {
    permissions.value.permissionsIds.forEach(id => {
        checkedModel.value[id] = value ? id : id * -1
    });

    modelValue = value ? permissions.value.permissionsIds : []
    props.context.node.input(modelValue)

}
</script>

<template>
    <div class="my-3 permissions_input">
        <Toolbar>
            <template #start>
                <h2>Permissions</h2>
            </template>

            <template #end>
                <InputSwitch v-model="checkAllModel" @update:modelValue="toggleSelectAll" inputId="select_all"
                    class="p-invalid" />
                <label class="mx-4" for="select_all">select all</label>
                <span class="p-input-icon-left">
                    <i class="pi pi-search" />
                    <InputText v-model="search" @update:modelValue="handleSearch" placeholder="Search" />
                </span>
            </template>
        </Toolbar>

        <Panel v-for="(perm, index) in permissions.permissions" :key="index" :header="perm.group" toggleable>
            <template #icons>
                <div class="flex mr-4 align-items-center">

                    <InputSwitch v-model="checkedGroupsModel[perm.group]"
                        @update:modelValue="(val) => toggleSelectAllGroup(val, perm.permissions)" :trueValue="true"
                        :falseValue="false" :inputId="perm.group" class="p-invalid" />
                    <label class="ml-2" :for="perm.group">select all</label>
                </div>
            </template>
            <template #togglericon="{ collapsed }">
                <i class="pi" :class="{ 'pi-chevron-down': collapsed, 'pi-chevron-up': !collapsed }"
                    style="font-size: 1rem"></i>
            </template>
            <div class="flex flex-wrap gap-3">

                <div class="form-control flex align-items-center" v-for="(p, index) in perm.permissions" :key="index">
                    <InputSwitch v-model="checkedModel[p.permission_id]" @update:modelValue="handleInput"
                        :trueValue="p.permission_id" :falseValue="p.permission_id * -1"
                        :inputId="p.permission_id.toString()" class="p-invalid" />
                    <label class="ml-2" :for="p.permission_id">{{ p.permission_name }}</label>

                </div>
            </div>
        </Panel>

    </div>
</template>
