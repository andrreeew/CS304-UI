import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../layout'
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import {isLogin} from "@/utils/auth";
import {Message} from "@arco-design/web-vue";
import api from "@/api";


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
        redirect: {name:'admin-home'},
        children: [
          {
            path: '',
            name: 'admin-home',
            component: () => import('../pages/admin/home')
          },
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
          {
            path: 'message',
            name: 'admin-message',
            component: () => import('../pages/admin/message')

          }
        ]
      },
      {
        path: 'user',
        name: 'user',
        redirect: {name:'user-home'},
        children: [
          {
            path: '',
            name: 'user-home',
            component: ()=>import('../pages/user/home')
          },
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
            },
          {
            path: 'group',
            name: 'user-group',
            component: ()=>import('../pages/user/group'),
            redirect: {name:'user-group-table'},
            children: [
              {
                path: '',
                name: 'user-group-table',
                component: ()=>import('../pages/user/group/table')
              },
              {
                path: ':groupId',
                name: 'user-group-detail',
                component: () => import('../pages/user/group/detail')
              },
              {
                path: ':groupId/:fundId',
                name: 'user-fund-group',
                component: () => import('../pages/user/group/fund')
              },
            ]
          },
          {
            path:'message',
            name: 'user-message',
            component: ()=>import('../pages/user/message')
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
  if (to.name==='login'){
    next()
  }else if(!isLogin()){
    Message.warning('请先登录')
    next({ name: 'login' })
  }else{
    api.getIdentity().then(res=>{
      var identity = res.data.data.identity
      if ((to.name !== 'login' && !isLogin())||identity===''){
        Message.warning('请先登录')
        next({ name: 'login' })
      }  else {
        if(to.name==='layout'){
          next({ name: identity })
        }else{
          var id = to.name.split('-')[0]
          if((id==='admin'&&identity==='user')||(id==='user'&&identity==='admin')){
            Message.warning('无权限')
            next({ name: identity })
          }else {
            next()
          }
        }

      }

    })
  }


})

router.afterEach(() => {
  NProgress.done();
});

export default router
