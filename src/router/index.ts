import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

import Layout from '@/layout/index.vue';

import { RouterTy } from '@/types/router'


// 固定路由
export const constantRoutes: RouterTy = [
  {
    path: '/login',
    hidden: true, // 隐藏
    component: () => import('@/views/login/login.vue'),
  },
  {
    path: '/404',
    component: () => import('@/views/404.vue'),
    hidden: true
  },
  {
    path: '/redirect', // 重定向路由
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)', // 匹配所有path
        component: () => import('@/views/redirect/index'),
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        meta: {
          title: 'Dashboard',
          icon: 'table',
          affix: true // 固定 tags-view
        }
      }
    ]
  },
  {
    path: '/table',
    component: Layout,
    redirect: '/table/list',
    children: [
      {
        path: 'list',
        name: 'table-list',
        component: () => import('@/views/table/index.vue'),
        meta: {
          title: 'Table',
          icon: 'table'
        }
      }
    ]
  },
  {
    path: '/function',
    component: Layout,
    redirect: '/function',
    meta: {
      title: '功能',
      icon: 'example'
    },
    children: [
      {
        path: 'flow',
        name: '流程图',
        component: () => import('@/views/function/flow/index.vue'),
        meta: {
          title: '流程图',
          icon: 'table'
        }
      },
      {
        path: 'contextmenu',
        name: '右键菜单',
        component: () => import('@/views/function/contextmenu/index.vue'),
        meta: {
          title: '右键菜单',
          icon: 'table'
        }
      },
      {
        path: '',
        name: 'axios',
        component: () => import('@/views/function/axios.vue'),
        meta: {
          title: 'Axios',
          icon: 'table'
        }
      },
     
    ]
  },
];

// 异步路由：需根据用户权限进行筛选
export const asyncRoutes: RouterTy = [
  {
    path: '/comps',
    component: Layout,
    redirect: '/comps/list',
    meta: {
      title: '组件',
      icon: 'example'
    },
    children: [
      {
        path: 'list',
        name: 'comps-list',
        component: () => import('@/views/comps/list.vue'),
        meta: {
          title: '组件列表',
          icon: 'table'
        }
      },
      {
        path: 'set',
        name: 'comps-set',
        component: () => import('@/views/comps/set.vue'),
        meta: {
          title: '组件设置',
          icon: 'table',
          roles: ['admin'] // 路由权限
        }
      },
      {
        path: 'upload',
        name: 'comps-upload',
        component: () => import('@/views/comps/upload.vue'),
        meta: {
          title: '上传',
          icon: 'table'
        }
      }
    ]
  },
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/list',
    name: 'permission',
    meta: {
      title: '权限管理',
      icon: 'lock',
      roles: ['admin', 'editor'] // 路由权限
    },
    children: [
      {
        path: 'list',
        name: 'permission-list',
        component: () => import('@/views/permission/list.vue'),
        meta: {
          title: '权限管理列表',
          icon: 'table'
        }
      },
      {
        path: 'set',
        name: 'permission-set',
        component: () => import('@/views/permission/set.vue'),
        meta: {
          title: '权限管理设置',
          icon: 'tree',
          roles: ['admin']
        }
      }
    ]
  },
  {
    path: '/admin',
    component: Layout,
    redirect: '/admin/list',
    name: 'admin',
    alwaysShow: true, // 始终展示
    meta: {
      title: '管理员',
      icon: 'user',
      roles: ['admin'] // 路由权限
    },
    children: [
      {
        path: 'list',
        name: 'admin-list',
        component: () => import('@/views/admin/index.vue'),
        meta: {
          title: '管理员列表',
          icon: 'user'
        }
      },
    ]
  },
  { path: '/:pathMatch(.*)', redirect: '/404', hidden: true } // 未匹配，重定向到404
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes,
});

export default router;
