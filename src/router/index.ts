import { createRouter, createWebHistory } from 'vue-router'
import DataCreate from '../views/DataCreate.vue'
import DataUpdate from '../views/DataUpdate.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/create',
      name: 'home',
      component: DataCreate
    },
    {
      path: '/update/1',
      name: 'about',
      component: DataUpdate
    }
  ]
})

export default router
