<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Toast from 'primevue/toast';
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/users">List</RouterLink>
        <RouterLink to="/users/create">Create</RouterLink>
        <RouterLink to="/users/update/1">Update</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
  <toast>
    <template #message="slotProps">
      <div class="flex toast-inner flex-column align-items-center" style="flex: 1">
        <div class="text-center">
          <h1 class="font-bold text-4xl ">{{ slotProps.message.summary }}</h1>
          <p class="my-1">{{ slotProps.message.detail }}</p>
        </div>

      </div>
    </template>
  </toast>
</template>
