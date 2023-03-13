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
        path: '',
        name: 'home',
        // component: () => import('../pages/home')
        redirect: { name: 'account-table'}
      },
      {
        path: 'account',
        name: 'account',
        component: () => import('../pages/account'),
        redirect: {name:'account-table'},
        children: [
          {
            path: '',
            name: 'account-table',
            component: () => import('../pages/account/table')
          },
          {
            path: 'new',
            name: 'account-new',
            component: () => import('../pages/account/new')
          },
          {
            path: ':user',
            name: 'account-detail',
            component: () => import('../pages/account/detail')
          },
        ]
      },
      {
        path: 'group',
        name: 'group',
        component: () => import('../pages/group'),
        redirect: {name:'group-table'},
        children: [
          {
            path: '',
            name: 'group-table',
            component: () => import('../pages/group/table'),
          },
          {
            path: 'new',
            name: 'group-new',
            component: () => import('../pages/group/new')
          },
          {
            path: ':groupId',
            name: 'group-detail',
            component: () => import('../pages/group/detail')
          },
        ]
      },
      {
        path: 'fund',
        name: 'fund',
        component: () => import('../pages/fund'),
        redirect: {name: 'fund-table'},
        children: [
          {
            path: '',
            name: 'fund-table',
            component: () => import('../pages/fund/table')
          }
        ]
      },
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
