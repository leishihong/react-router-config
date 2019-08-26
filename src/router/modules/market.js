import LoadableComponent from '@/utils/LoadableComponent'

export default [
  {
    path: '/layout/market',
    name: 'market',
    exact: true,
    permissions: [ 'admin', 'user' ],
    pageTitle: '',
    breadcrumb: [],
    requiresAuth: false,
    meta: {
      title: '行情表管理'
    },
    childRoutes: [
      {
        parentKey: '/layout/market',
        path: '/layout/market/market-model',
        name: 'market-model',
        exact: true,
        permissions: [ 'admin', 'user' ],
        pageTitle: '',
        breadcrumb: [],
        component: LoadableComponent(() =>
          import('@/views/market-manage/MarketModel')
        ),
        requiresAuth: false,
        meta: {
          title: '行情表车型管理'
        }
      },
      {
        parentKey: '/layout/market',
        path: '/layout/market/market-audit',
        name: 'market-audit',
        exact: true,
        permissions: [ 'admin', 'user' ],
        pageTitle: '',
        breadcrumb: [],
        component: LoadableComponent(() =>
          import('@/views/market-manage/MarketAudit')
        ),
        requiresAuth: false,
        meta: {
          title: '行情表审核管理'
        }
      }
    ]
  }
]
