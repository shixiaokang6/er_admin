import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },

  {
    path: '/teacher',
    component: Layout,
    redirect: '/teacher/table',
    name: '教师信息管理',
    meta: { title: '教师信息管理', icon: 'example' },
    children: [
      {
        path: 'table',
        name: '教师列表',
        component: () => import('@/views/edu/teacher/list'),
        meta: { title: '教师列表', icon: 'table' }
      }
    ]
  },

  {
    path: '/apply',
    component: Layout,
    redirect: '/apply/table',
    name: '教师申请管理',
    meta: { title: '教师申请管理', icon: 'example' },
    children: [
      {
        path: 'table',
        name: '教师申请列表',
        component: () => import('@/views/edu/apply/check'),
        meta: { title: '教师申请列表', icon: 'table' }
      }
    ]
  },

  {
    path: '/student',
    component: Layout,
    redirect: '/student/table',
    name: '用户信息管理',
    meta: { title: '用户信息管理', icon: 'example' },
    children: [
      {
        path: 'table',
        name: '用户信息列表',
        component: () => import('@/views/edu/student/list'),
        meta: { title: '用户信息列表', icon: 'table' }
      },
      {
        path: 'save',
        name: '添加用户信息',
        component: () => import('@/views/edu/student/save'),
        meta: { title: '添加用户信息', icon: 'tree' }
      },
      {
        path: 'edit/:id',
        name: '编辑用户信息',
        component: () => import('@/views/edu/student/save'),
        meta: { title: '编辑用户信息', noCache: true },
        hidden: true
      }
    ]
  },

  {
    path: '/banner',
    component: Layout,
    redirect: '/banner/table',
    name: '轮播图管理',
    meta: { title: '轮播图管理', icon: 'example' },
    children: [
      {
        path: 'table',
        name: '轮播图列表',
        component: () => import('@/views/edu/banner/list'),
        meta: { title: '轮播图列表', icon: 'table' }
      },
      {
        path: 'save',
        name: '添加轮播图',
        component: () => import('@/views/edu/banner/save'),
        meta: { title: '添加轮播图', icon: 'tree' }
      },
      {
        path: 'edit/:id',
        name: '编辑轮播图',
        component: () => import('@/views/edu/banner/save'),
        meta: { title: '编辑轮播图', noCache: true },
        hidden: true
      }
    ]
  },

  {
    path: '/order',
    component: Layout,
    redirect: '/order/table',
    name: '订单信息管理',
    meta: { title: '订单信息管理', icon: 'example' },
    children: [
      {
        path: 'table',
        name: '订单信息列表',
        component: () => import('@/views/edu/order/list'),
        meta: { title: '订单信息列表', icon: 'table' }
      },
      // {
      //   path: 'save',
      //   name: '添加订单信息',
      //   component: () => import('@/views/edu/order/save'),
      //   meta: { title: '添加订单信息', icon: 'tree' }
      // },
      {
        path: 'edit/:oid',
        name: '编辑订单信息',
        component: () => import('@/views/edu/order/save'),
        meta: { title: '编辑订单信息', noCache: true },
        hidden: true
      }
    ]
  },

  {
    path: '/credit',
    component: Layout,
    redirect: '/credit/table',
    name: '用户积分列表',
    meta: { title: '用户积分列表', icon: 'example' },
    children: [
      {
        path: 'table',
        name: '用户积分列表',
        component: () => import('@/views/edu/credit/list'),
        meta: { title: '用户积分列表', icon: 'table' }
      }
    ]
  },

  {
    path: '/feedback',
    component: Layout,
    redirect: '/feedback/table',
    name: '用户反馈',
    meta: { title: '用户反馈管理', icon: 'example' },
    children: [
      {
        path: 'table',
        name: '用户反馈列表',
        component: () => import('@/views/edu/feedback/list'),
        meta: { title: '用户反馈列表', icon: 'table' }
      },
      {
        path: 'save',
        name: '回复',
        component: () => import('@/views/edu/feedback/save'),
        meta: { title: '回复', icon: 'tree' }
      },
      {
        path: 'edit/:id',
        name: '回复',
        component: () => import('@/views/edu/feedback/save'),
        meta: { title: '回复', noCache: true },
        hidden: true
      }
    ]
  },

  {
    path: '/subject',
    component: Layout,
    redirect: '/subject/list',
    name: '课程分类管理',
    meta: { title: '课程分类管理', icon: 'example' },
    children: [
      {
        path: 'list',
        name: '课程分类列表',
        component: () => import('@/views/edu/subject/list'),
        meta: { title: '课程分类列表', icon: 'table' }
      },
      {
        path: 'save',
        name: '添加课程分类',
        component: () => import('@/views/edu/subject/save'),
        meta: { title: '添加课程分类', icon: 'tree' }
      }
    ]
  },

  {
    path: '/course',
    component: Layout,
    redirect: '/course/list',
    name: '课程管理',
    meta: { title: '课程管理', icon: 'example' },
    children: [
      {
        path: 'list',
        name: '课程列表',
        component: () => import('@/views/edu/course/list'),
        meta: { title: '课程列表', icon: 'table' }
      },
      {
        path: 'info',
        name: '添加课程',
        component: () => import('@/views/edu/course/info'),
        meta: { title: '添加课程', icon: 'tree' }
      },
      {
        path: 'info/:id',
        name: 'EduCourseInfoEdit',
        component: () => import('@/views/edu/course/info'),
        meta: { title: '编辑课程基本信息', noCache: true },
        hidden: true
      },
      {
        path: 'chapter/:id',
        name: 'EduCourseChapterEdit',
        component: () => import('@/views/edu/course/chapter'),
        meta: { title: '编辑课程大纲', noCache: true },
        hidden: true
      },
      {
        path: 'publish/:id',
        name: 'EduCoursePublishEdit',
        component: () => import('@/views/edu/course/publish'),
        meta: { title: '发布课程', noCache: true },
        hidden: true
      }
    ]
  },

  {
    path: '/sta',
    component: Layout,
    redirect: '/sta/show',
    name: '统计分析',
    meta: { title: '统计分析', icon: 'example' },
    children: [
      // {
      //   path: 'create',
      //   name: '生成数据',
      //   component: () => import('@/views/edu/sta/create'),
      //   meta: { title: '生成数据', icon: 'table' }
      // },
      {
        path: 'show',
        name: '统计分析',
        component: () => import('@/views/edu/sta/show'),
        meta: { title: '统计分析', icon: 'tree' }
      }
    ]
  },

  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/table',
  //   name: 'Example',
  //   meta: { title: 'Example', icon: 'example' },
  //   children: [
  //     {
  //       path: 'table',
  //       name: 'Table',
  //       component: () => import('@/views/table/index'),
  //       meta: { title: 'Table', icon: 'table' }
  //     },
  //     {
  //       path: 'tree',
  //       name: 'Tree',
  //       component: () => import('@/views/tree/index'),
  //       meta: { title: 'Tree', icon: 'tree' }
  //     }
  //   ]
  // },

  // {
  //   path: '/form',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Form',
  //       component: () => import('@/views/form/index'),
  //       meta: { title: 'Form', icon: 'form' }
  //     }
  //   ]
  // },

  // {
  //   path: '/nested',
  //   component: Layout,
  //   redirect: '/nested/menu1',
  //   name: 'Nested',
  //   meta: {
  //     title: 'Nested',
  //     icon: 'nested'
  //   },
  //   children: [
  //     {
  //       path: 'menu1',
  //       component: () => import('@/views/nested/menu1/index'), // Parent router-view
  //       name: 'Menu1',
  //       meta: { title: 'Menu1' },
  //       children: [
  //         {
  //           path: 'menu1-1',
  //           component: () => import('@/views/nested/menu1/menu1-1'),
  //           name: 'Menu1-1',
  //           meta: { title: 'Menu1-1' }
  //         },
  //         {
  //           path: 'menu1-2',
  //           component: () => import('@/views/nested/menu1/menu1-2'),
  //           name: 'Menu1-2',
  //           meta: { title: 'Menu1-2' },
  //           children: [
  //             {
  //               path: 'menu1-2-1',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
  //               name: 'Menu1-2-1',
  //               meta: { title: 'Menu1-2-1' }
  //             },
  //             {
  //               path: 'menu1-2-2',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
  //               name: 'Menu1-2-2',
  //               meta: { title: 'Menu1-2-2' }
  //             }
  //           ]
  //         },
  //         {
  //           path: 'menu1-3',
  //           component: () => import('@/views/nested/menu1/menu1-3'),
  //           name: 'Menu1-3',
  //           meta: { title: 'Menu1-3' }
  //         }
  //       ]
  //     },
  //     {
  //       path: 'menu2',
  //       component: () => import('@/views/nested/menu2/index'),
  //       meta: { title: 'menu2' }
  //     }
  //   ]
  // },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
