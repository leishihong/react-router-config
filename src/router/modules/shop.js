import LoadableComponent from '@/utils/LoadableComponent'

export default [
  {
    path: '/layout/shop',
    name: 'shop',
    exact: true,
    permissions: [ 'admin', 'user' ],
    pageTitle: '',
    breadcrumb: [],
    requiresAuth: false,
    // component: LoadableComponent(() => import('../../Main')),
    meta: {
      title: '商家管理'
    },
    childRoutes: [
      {
        parentKey: '/layout/shop',
        path: '/layout/shop/car-city',
        name: 'shop-record',
        exact: true,
        permissions: [ 'admin', 'user' ],
        pageTitle: '',
        breadcrumb: [],
        component: LoadableComponent(() =>
          import('@/views/shop-manage/CarCity')
        ),
        requiresAuth: false,
        meta: {
          title: '车城管理'
        },
        childRoutes: []
      },
      {
        parentKey: '/layout/shop/car-city',
        path: '/layout/shop/car-city/camera',
        name: 'camera',
        exact: true,
        permissions: [ 'admin', 'user' ],
        pageTitle: '',
        breadcrumb: [],
        component: LoadableComponent(() =>
          import('@/views/shop-manage/Camera')
        ),
        requiresAuth: true,
        meta: {
          title: '摄像头列表'
        }
      },
      {
        parentKey: '/layout/shop',
        path: '/layout/shop/dealer',
        name: 'dealer',
        exact: true,
        permissions: [ 'admin', 'user' ],
        pageTitle: '',
        breadcrumb: [],
        component: LoadableComponent(() =>
          import('@/views/shop-manage/Dealer')
        ),
        requiresAuth: false,
        meta: {
          title: '经销商管理'
        }
      },
      {
        parentKey: '/layout/shop',
        path: '/layout/shop/market',
        name: 'market',
        exact: true,
        permissions: [ 'admin', 'user' ],
        pageTitle: '',
        breadcrumb: [],
        component: LoadableComponent(() =>
          import('@/views/shop-manage/Market')
        ),
        requiresAuth: false,
        meta: {
          title: '销售管理'
        }
      }
    ]
  }
]
