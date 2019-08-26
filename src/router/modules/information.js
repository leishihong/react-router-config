import LoadableComponent from '@/utils/LoadableComponent'

export default [
  {
    path: '/layout/info',
    name: 'info',
    exact: true,
    permissions: [ 'admin', 'user' ],
    pageTitle: '',
    breadcrumb: [],
    requiresAuth: false,
    meta: {
      title: '车辆信息管理'
    },
    childRoutes: [
      {
        parentKey: '/layout/info',
        path: '/layout/info/brand',
        name: 'brand',
        exact: true,
        permissions: [ 'admin', 'user' ],
        pageTitle: '',
        breadcrumb: [],
        component: LoadableComponent(() =>
          import('@/views/information-manage/Brand')
        ),
        requiresAuth: false,
        meta: {
          title: '品牌管理'
        }
      },
      {
        parentKey: '/layout/info',
        path: '/layout/info/vehicle-series',
        name: 'vehicle-series',
        exact: true,
        permissions: [ 'admin', 'user' ],
        pageTitle: '',
        breadcrumb: [],
        component: LoadableComponent(() =>
          import('@/views/information-manage/VehicleSeries')
        ),
        requiresAuth: false,
        meta: {
          title: '车系管理'
        }
      },
      {
        parentKey: '/layout/info',
        path: '/layout/info/vehicle-model',
        name: 'vehicle-model',
        exact: true,
        permissions: [ 'admin', 'user' ],
        pageTitle: '',
        breadcrumb: [],
        component: LoadableComponent(() =>
          import('@/views/information-manage/VehicleModel')
        ),
        requiresAuth: false,
        meta: {
          title: '车型管理'
        }
      },
      {
        parentKey: '/layout/info',
        path: '/layout/info/vehicle-rule',
        name: 'vehicle-rule',
        exact: true,
        permissions: [ 'admin', 'user' ],
        pageTitle: '',
        breadcrumb: [],
        component: LoadableComponent(() =>
          import('@/views/information-manage/VehicleRule')
        ),
        requiresAuth: false,
        meta: {
          title: '车规管理'
        }
      }
    ]
  }
]
