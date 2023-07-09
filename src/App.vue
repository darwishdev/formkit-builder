<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Toast from 'primevue/toast';
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/create">Create</RouterLink>
        <RouterLink to="/update/1">Update</RouterLink>
      </nav>
    </div>
  </header>
  <div class="page-content">
    <RouterView />

  </div>
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

<style>
.page-content {
  padding: 20px;
}
</style>