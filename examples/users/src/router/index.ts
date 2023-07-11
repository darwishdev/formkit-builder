import { createRouter, createWebHistory } from 'vue-router'
import UsersList from '../views/UsersList.vue'
import UserCreate from '../views/UserCreate.vue'
import UserUpdate from '../views/UserUpdate.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/users',
      name: 'users_list',
      component: UsersList
    },
    {
      path: '/users/create',
      name: 'user_create',
      component: UserCreate
    },
    {
      path: '/users/update',
      name: 'user_update',
      component: UserUpdate
    }
  ]
})

export default router
