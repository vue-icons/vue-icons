import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/index'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/icons',
      name: 'Icons',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/icons.tsx')
    },
    {
      path: '/search',
      name: 'Search',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/search.tsx')
    }
  ]
})

export default router
