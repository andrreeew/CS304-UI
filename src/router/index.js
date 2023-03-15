import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../layout'
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import {isLogin} from "@/utils/auth";
import {Message} from "@arco-design/web-vue";

NProgress.configure({
  showSpinner: false,
});

const routes = [
  {
    path: '/test',
    name: 'test',
    component: ()=> import('../pages/test')
  },
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
        path: 'admin',
        name: 'admin',
        children: [
          {
            path: 'account',
            name: 'admin-account',
            component: () => import('../pages/admin/account'),
            redirect: {name:'admin-account-table'},
            children: [
              {
                path: '',
                name: 'admin-account-table',
                component: () => import('../pages/admin/account/table')
              },
              {
                path: 'new',
                name: 'admin-account-new',
                component: () => import('../pages/admin/account/new')
              },
              {
                path: ':user',
                name: 'admin-account-detail',
                component: () => import('../pages/admin/account/detail')
              },
            ]
          },
          {
            path: 'group',
            name: 'admin-group',
            component: () => import('../pages/admin/group'),
            redirect: {name:'admin-group-table'},
            children: [
              {
                path: '',
                name: 'admin-group-table',
                component: () => import('../pages/admin/group/table'),
              },
              {
                path: 'new',
                name: 'admin-group-new',
                component: () => import('../pages/admin/group/new')
              },
              {
                path: ':groupId',
                name: 'admin-group-detail',
                component: () => import('../pages/admin/group/detail')
              },
            ]
          },
          {
            path: 'fund',
            name: 'admin-fund',
            component: () => import('../pages/admin/fund'),
            redirect: {name: 'admin-fund-table'},
            children: [
              {
                path: '',
                name: 'admin-fund-table',
                component: () => import('../pages/admin/fund/table')
              },
              {
                path: ':fundId',
                name: 'admin-fund-detail',
                component: () => import('../pages/admin/fund/detail')
              },
              {
                path: ':fundId/:groupId',
                name: 'admin-fund-group',
                component: () => import('../pages/admin/fund/group')
              }
            ]
          },
          {
            path: 'application',
            name: 'admin-application',
            component: () => import('../pages/admin/application'),
            redirect: { name: 'admin-application-table' },
            children: [
              {
                path: 'table',
                name: 'admin-application-table',
                component: () => import('../pages/admin/application/table')
              },
            ]
          },
        ]
      },
      {
        path: 'user',
        name: 'user',
        children: [
            {
              path: 'application',
              name: 'user-application',
              component:()=>import('../pages/user/application'),
              redirect: {name:'user-application-table'},
              children: [
                {
                  path: 'table',
                  name: 'user-application-table',
                  component: ()=>import('../pages/user/application/table')
                },
                {
                  path: 'new',
                  name: 'user-application-new',
                  component: ()=>import('../pages/user/application/new')
                }
              ]
            }
        ]
      },

      {
        path: ':pathMatch(.*)*',
        name: 'notFound',
        component: () => import('../pages/error')
      }
    ]
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  NProgress.start();
  if (to.name !== 'login' && !isLogin()){
    Message.warning('请先登录')
    next({ name: 'login' })
  } else next()
})

router.afterEach(() => {
  NProgress.done();
});

export default router
