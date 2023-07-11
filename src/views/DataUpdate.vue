<script setup lang="ts">
import type { FormKitSection, FormKitError, FormKitToastHandler, FormKitOptions, FormSubmitHandler, FormFindDataHandler } from '@/types'
import type { RoleUpdateRequest, RoleUpdateResponse, RoleFindRequest, RoleFindResponse } from '@/api/ApiTypes';
import apiClient from '@/api/ApiMock';
import { useI18n } from 'vue-i18n';

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
      }
    ],
  },
]
const options: FormKitOptions = {
  title: "role_update",
  allowBulkDelete: false,
}


const toastHandler: FormKitToastHandler = {
  hideToast: true
}
const submitHandler: FormSubmitHandler<RoleUpdateRequest, RoleUpdateRequest, RoleUpdateResponse> = {
  submit: apiClient.roleUpdate,
  errorHandler,
  redirectRoute,
}
const findDataHandler: FormFindDataHandler<RoleFindRequest, RoleFindResponse, any> = {
  findData: apiClient.roleFind,
  findRequerPropertyName: 'roleId',
}

</script>

<template>
  <data-update-form :sections="sections" :toastHandler="toastHandler" :findDataHandler="findDataHandler"
    :submitHandler="submitHandler" :options="options" />
</template>