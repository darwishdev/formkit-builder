<script setup lang="ts">
import type { FormKitOptions, FormSubmitHandler } from 'formkit-builder/types'
import type { UserCreateRequest, UserCreateResponse } from '@/api/ApiTypes'
import apiClient from '@/api/ApiMock';
import { sections, errorHandler, redirectRoute } from '@/forms/UserForm'
const options: FormKitOptions = {
  title: "New User",
  allowBulkDelete: true,
}

const submitHandler: FormSubmitHandler<UserCreateRequest, UserCreateRequest, UserCreateResponse> = {
  submit: apiClient.userCreate,
  errorHandler,
  redirectRoute,
}

</script>

<template>
  <data-create-form :sections="sections" :submitHandler="submitHandler" :options="options" />
</template>