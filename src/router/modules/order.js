import LoadableComponent from '@/utils/LoadableComponent'

export default [
  {
    path: '/layout/order',
    name: 'order',
    exact: true,
    permissions: [ 'admin', 'user' ],
    pageTitle: '',
    breadcrumb: [],
    requiresAuth: false,
    meta: {
      title: '交易管理'
    },
    childRoutes: [
      {
        parentKey: '/layout/order',
        path: '/layout/order/order-record',
        name: 'order-record',
        exact: true,
        permissions: [ 'admin', 'user' ],
        pageTitle: '',
        breadcrumb: [],
        component: LoadableComponent(() =>
          import('@/views/trade-manage/order-record')
        ),
        requiresAuth: false,
        meta: {
          title: '订单记录'
        }
      },
      {
        parentKey: '/layout/order',
        path: '/layout/order/financial-statistics',
        name: 'financial-statistics',
        exact: true,
        permissions: [ 'admin', 'user' ],
        pageTitle: '',
        breadcrumb: [],
        component: LoadableComponent(() =>
          import('@/views/trade-manage/financial-statistics')
        ),
        requiresAuth: false,
        meta: {
          title: '财务统计'
        }
      }
    ]
  },
  {
    path: '/financial-statistics',
    name: 'financial-statistics',
    exact: true,
    permissions: [ 'admin', 'user' ],
    pageTitle: '',
    breadcrumb: [],
    component: LoadableComponent(() =>
      import('@/views/trade-manage/financial-statistics')
    ),
    requiresAuth: false,
    meta: {
      title: '订单记录'
    }
  }
]
