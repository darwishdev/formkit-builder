<script setup lang="ts">
import type { FormKitInput, FormKitComponent } from '@/types'
import apiClient from '@/api/ApiMock';
import type { RolesListResponse, RolesListRequest } from '@/api/ApiTypes'
import { useDataFetcherList } from 'vue-data-fetcher'
import LoadingForm from '@/components/LoadingForm.vue';
import ErrorForm from '@/components/ErrorForm.vue';
const { responseData, loading, error } = useDataFetcherList<RolesListRequest, RolesListResponse>(apiClient.rolesList, {} as RolesListRequest);

const inputs: Array<FormKitInput | FormKitComponent> = [
    {
        $formkit: 'dropdown',
        outerClass: "col-3",
        name: 'roleName',
        label: 'by_role',
        placeholder: 'Select Role',
        options: apiClient.getRolesInput
    },
    {
        $formkit: 'datepicker',
        outerClass: "col-3",
        name: 'createdAt',
        label: 'by_createion_date',
        placeholder: 'Select Date',
    },

    {
        $formkit: 'text',
        outerClass: "col-3",
        name: 'UserPhone',
        label: 'phone_number',
        placeholder: 'Type phone number',
    },

]
const handleFilter = (filterObject: Object) => {
    // console.log('filterObject')
    // console.log(filterObject)
}
const handleClearFilters = () => {
    console.log('clear filter')
    // console.log(filter)
}
</script>

<template>
    <div>

        <data-filter-form @filter="handleFilter" @clearFilters="handleClearFilters" :inputs="inputs" :liveUpdate="false" />
        <loading-form v-if="loading" />
        <error-form v-else-if="error" :error="error" />
        <div v-for="role in responseData?.roles" :key="role.roleId">
            <p>roleId : {{ role.roleId }}</p>
            <p>roleName : {{ role.roleName }}</p>
            <hr />
        </div>

        <form-kit type="fileUpload" outerClass="col-12" name='image' label='image' />
    </div>
</template>