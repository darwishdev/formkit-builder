<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
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

  <RouterView />
</template>
