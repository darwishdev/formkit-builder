<script setup lang="ts">
import type { FormKitSection, FormKitToastHandler, FormKitError, FormKitOptions, FormSubmitHandler } from '@/types'
import type { RoleCreateRequest, RoleCreateResponse } from '@/api/ApiTypes';
import apiClient from '@/api/ApiMock';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router'
const router = useRouter();
// import { sections, errorHandler, redirectRoute } from './forms/RoleCreateForm'


const { t } = useI18n()
const errorHandler: Record<string, FormKitError> = {
  'unique_constraint_roles_role_name_key': {
    roleName: 'unique_constraint_roles_role_name_key'
  }
}
const redirectRoute: string = 'list'
const sections: FormKitSection[] = [
  {
    roleInfo: [
      {
        $formkit: 'text',
        outerClass: "col-4",
        name: 'roleName',
        label: t('roleNameLabel'),
        placeholder: t('roleNamePlaceholder'),
        validation: 'required|length:3',

      },
      {
        $formkit: 'textarea',
        outerClass: "col-8",
        name: 'roleDescription',
        label: t('roleDescriptionLabel'),
        placeholder: t('roleDescriptionPlaceholder'),
        validation: '',
      },
      {
        $formkit: 'taglist',
        outerClass: "col-12",
        closeOnSelect: false,
        name: 'userRoles',
        label: 'roles',
        placeholder: 'roles',
        options: apiClient.getRolesInput
        // validation: 'required',
      }
    ],
  },
]

const toastHandler: FormKitToastHandler = {
  hideToast: false
}

const options: FormKitOptions = {
  title: "role_create",
  allowBulkDelete: false,
}
const submitHandler: FormSubmitHandler<RoleCreateRequest, RoleCreateRequest, RoleCreateResponse> = {
  submit: apiClient.roleCreateWithErr,
  submitCallBack: (res: any) => {
    router.push({ name: "list" })
  },
  errorHandler,
}
</script>

<template>
  <data-create-form :sections="sections" :submitHandler="submitHandler" :toastHandler="toastHandler" :options="options" />
</template>