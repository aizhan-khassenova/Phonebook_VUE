import { createRouter, createWebHistory } from 'vue-router'
import City from '@/components/City'

const routes = [
  {
    path: '/',
    component: City
  },
  {
    path: '/street',
    component: () => import('@/components/Street.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
