import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue';

const router = createRouter({
  scrollBehavior() {
    return { top: 0 }
  },
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/custom/:id',
      name: 'Custom',
      component: () => import('../views/Custom.vue'),
    },
    {
      path: '/review',
      name: 'Review',
      component: () => import('../views/Review.vue'),
    },
    {
      path: '/checkout',
      name: 'Checkout',
      component: () => import('../views/Checkout.vue'),
    },
    {
      path: '/success',
      name: 'Success',
      component: () => import('../views/Success.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../views/NotFound.vue'),
    },
  ]
})

export default router
