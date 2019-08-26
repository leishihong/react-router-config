import LoadableComponent from '@/utils/LoadableComponent'

export default [
  {
    path: '/layout/dashboard',
    name: 'dashboard',
    exact: true,
    permissions: [ 'admin', 'user' ],
    pageTitle: '',
    breadcrumb: [],
    requiresAuth: false,
    component: LoadableComponent(() => import('@/views/dashboard')),
    meta: {
      title: '首页'
    }
  }
]
