import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../layout'
import NProgress from "nprogress";
import "nprogress/nprogress.css";

NProgress.configure({
  showSpinner: false,
});

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../pages/login')
  },
  {
    path: '',
    name: 'layout',
    component: Layout,
    children:[
      {
        path: 'record',
        name: 'record',
        component: () => import('../pages/record'),
        redirect: { name: 'record-table' },
        children: [
          {
            path: 'table',
            name: 'record-table',
            component: () => import('../pages/record/table')
          },
          {
            path: 'new',
            name: 'record-new',
            component: () => import('../pages/record/new')
          },
          {
            path: 'detail',
            name: 'record-detail',
            component: () => import('../pages/record/detail')
          }
        ]
      },

      {
        path: ':pathMatch(.*)*',
        name: 'notFound',
        component: () => import('../pages/error')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
})

router.afterEach(() => {
  NProgress.done();
});

export default router
