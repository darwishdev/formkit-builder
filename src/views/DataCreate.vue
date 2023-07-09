<script setup lang="ts">
import type { FormKitSection, FormKitError, FormKitOptions, FormSubmitHandler } from '@/types'
import type { RoleCreateRequest, RoleCreateResponse } from '@/api/ApiTypes';
import apiClient from '@/api/ApiMock';
// import { sections, errorHandler, redirectRoute } from './forms/RoleCreateForm'

const errorHandler: Record<string, FormKitError> = {
  'unique_constraint_roles_role_name_key': {
    roleName: 'unique_constraint_roles_role_name_key'
  }
}
const redirectRoute: string = 'roles_list'
const sections: FormKitSection[] = [
  {
    roleInfo: [
      {
        $formkit: 'text',
        outerClass: "col-4",
        name: 'roleName',
        label: 'roleNameLabel',
        placeholder: 'roleNamePlaceholder',
        validation: 'required|length:3',

      },
      {
        $formkit: 'textarea',
        outerClass: "col-8",
        name: 'roleDescription',
        label: 'roleDescriptionLabel',
        placeholder: 'roleDescriptionPlaceholder',
        validation: '',
      },
    ],
  },
]
const options: FormKitOptions = {
  title: "role_create",
  allowBulkDelete: true,
}
const submitHandler: FormSubmitHandler<RoleCreateRequest, RoleCreateRequest, RoleCreateResponse> = {
  submit: apiClient.roleCreate,
  errorHandler,
  redirectRoute,
}
</script>

<template>
  <data-create-form :sections="sections" :submitHandler="submitHandler" :options="options" />
</template>