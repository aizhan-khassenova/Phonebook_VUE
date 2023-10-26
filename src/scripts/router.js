import { createRouter, createWebHistory } from 'vue-router'
import Phone from '@/views/Phone'

const routes = [
  {
    path: '/',
    component: Phone
  },
  {
    path: '/city',
    component: () => import('@/views/City.vue')
  },
  {
    path: '/street',
    component: () => import('@/views/Street.vue')
  },
  {
    path: '/house',
    component: () => import('@/views/House.vue')
  },
  {
    path: '/apartment',
    component: () => import('@/views/Apartment.vue')
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router