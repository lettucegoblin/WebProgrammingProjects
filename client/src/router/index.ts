import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/activity',
      name: 'myactivity',
      component: () => import('../views/ActivityView.vue')
    },
    {
      path: '/activity/:id',
      name: 'activity',
      component: () => import('../views/ActivityView.vue')
    },
    {
      path: '/activity/FriendsActivity',
      name: 'friendsactivity',
      component: () => import('../views/ActivityView.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },{
      path: '/peoplesearch',
      name: 'peoplesearch',
      component: () => import('../views/PeopleSearchView.vue')
    },
    {
      path: '/profile/:id',
      name: 'profile',
      component: () => import('../views/ProfileView.vue')
    },
    {
      path: '/profile',
      name: 'profileHome',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/editprofile/:id',
      name: 'editprofile',
      component: () => import('../views/ProfileView.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/SignUpView.vue')
    },
    {
      path: '/adminUsers',
      name: 'adminUsers',
      component: () => import('../views/AdminUsersView.vue')
    },
    {
      path: '/:catchAll(.*)',
      component: () => import('../views/404View.vue')
    }

  ]
})

export default router
