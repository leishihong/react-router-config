import LoadableComponent from '@/utils/LoadableComponent'

export default [
  {
    path: '/layout/vehicle',
    name: 'vehicle',
    exact: true,
    permissions: [ 'admin', 'user' ],
    pageTitle: '',
    breadcrumb: [],
    requiresAuth: false,
    meta: {
      title: '车辆管理'
    },
    childRoutes: [
      {
        parentKey: '/layout/vehicle',
        path: '/layout/vehicle/complete',
        name: 'complete',
        exact: true,
        permissions: [ 'admin', 'user' ],
        pageTitle: '',
        breadcrumb: [],
        component: LoadableComponent(() =>
          import('@/views/vehicle-manage/Complete')
        ),
        requiresAuth: false,
        meta: {
          title: '全部车辆管理'
        }
      },
      {
        parentKey: '/layout/vehicle',
        path: '/layout/vehicle/platform',
        name: 'platform',
        exact: true,
        permissions: [ 'admin', 'user' ],
        pageTitle: '',
        breadcrumb: [],
        component: LoadableComponent(() =>
          import('@/views/vehicle-manage/Platform')
        ),
        requiresAuth: false,
        meta: {
          title: '平台车辆管理'
        }
      },
      {
        parentKey: '/layout/vehicle',
        path: '/layout/vehicle/optimization',
        name: 'optimization',
        exact: true,
        permissions: [ 'admin', 'user' ],
        pageTitle: '',
        breadcrumb: [],
        component: LoadableComponent(() =>
          import('@/views/vehicle-manage/Optimization')
        ),
        requiresAuth: false,
        meta: {
          title: '优选车辆管理'
        }
      }
    ]
  }
]
