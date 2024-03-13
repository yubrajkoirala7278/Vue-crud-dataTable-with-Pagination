// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  // ======frontend=========
  {
    path: '/',
    name:'public',
    component: () => import('@/layouts/frontend/app_layout.vue'),
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import('@/modules/home/home.vue'),
      },
      {
        path:'/:pathMatch(.*)*',
        name:'errorPage',
        component: () => import('@/modules/error-page/error.vue'),
      }
    ],
  },
  // ========admin===========
  {
    path: '/admin',
    name:'private',
    component: () => import('@/layouts/auth/app_layout.vue'),
    children: [
      {
        path: '/admin/projects',
        name: 'projects',
        component: () => import('@/modules/admin-projects/project.vue'),
      },
      {
        path: "/admin/:id/project-details",
        name: "project-details",
        component: () =>import("@/modules/admin-projects/components/project-detail.vue"),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router