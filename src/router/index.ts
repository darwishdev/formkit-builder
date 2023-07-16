import { createRouter, createWebHistory } from 'vue-router'
import DataList from '../views/DataList.vue'
import DataCreate from '../views/DataCreate.vue'
import DataUpdate from '../views/DataUpdate.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'list',
      component: DataList
    },
    {
      path: '/create',
      name: 'create',
      component: DataCreate
    },
    {
      path: '/update/:id',
      name: 'update',
      component: DataUpdate
    }
  ]
})

export default router
