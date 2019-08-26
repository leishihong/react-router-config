import LoadableComponent from '@/utils/LoadableComponent'

export default [
  {
    path: '/login',
    name: 'login',
    exact: true,
    permissions: [ 'admin', 'user' ],
    pageTitle: '',
    breadcrumb: [ '/outlets' ],
    requiresAuth: false,
    component: LoadableComponent(() => import('@/views/login')),
    meta: {
      title: '登录页'
    }
  },
  {
    path: '/notFound',
    name: 'NotFound',
    exact: true,
    permissions: [ 'admin', 'user' ],
    pageTitle: '',
    breadcrumb: [ '/outlets' ],
    requiresAuth: false,
    component: LoadableComponent(() => import('@/views/NotFound')),
    meta: {
      title: '404'
    }
  }
]
