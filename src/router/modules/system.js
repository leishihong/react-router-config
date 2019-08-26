import LoadableComponent from '@/utils/LoadableComponent'

export default [
  {
    path: '/layout/system',
    name: 'system',
    exact: true,
    permissions: [ 'admin', 'user' ],
    pageTitle: '',
    breadcrumb: [],
    requiresAuth: false,
    meta: {
      title: '系统设置'
    },
    childRoutes: [
      {
        parentKey: '/layout/system',
        path: '/layout/system/admin',
        name: 'admin',
        exact: true,
        permissions: [ 'admin', 'user' ],
        pageTitle: '',
        breadcrumb: [],
        component: LoadableComponent(() =>
          import('@/views/system-settings/Admin')
        ),
        requiresAuth: false,
        meta: {
          title: '管理员设置'
        }
      },
      {
        parentKey: '/layout/system',
        path: '/layout/system/rule-set',
        name: 'rule-set',
        exact: true,
        permissions: [ 'admin', 'user' ],
        pageTitle: '',
        breadcrumb: [],
        component: LoadableComponent(() =>
          import('@/views/system-settings/RuleSet')
        ),
        requiresAuth: false,
        meta: {
          title: '权限设置'
        }
      },
      {
        parentKey: '/layout/system',
        path: '/layout/system/notification',
        name: 'notification',
        exact: true,
        permissions: [ 'admin', 'user' ],
        pageTitle: '',
        breadcrumb: [],
        component: LoadableComponent(() =>
          import('@/views/system-settings/Notification')
        ),
        requiresAuth: false,
        meta: {
          title: '消息推送'
        }
      },
      {
        parentKey: '/layout/system',
        path: '/layout/system/cash-deposit',
        name: 'cash-deposit',
        exact: true,
        permissions: [ 'admin', 'user' ],
        pageTitle: '',
        breadcrumb: [],
        component: LoadableComponent(() =>
          import('@/views/system-settings/CashDeposit')
        ),
        requiresAuth: false,
        meta: {
          title: '保证金设置'
        }
      },
      {
        parentKey: '/layout/system',
        path: '/layout/system/about-us',
        name: 'about-us',
        exact: true,
        permissions: [ 'admin', 'user' ],
        pageTitle: '',
        breadcrumb: [],
        component: LoadableComponent(() =>
          import('@/views/system-settings/AboutUs')
        ),
        requiresAuth: false,
        meta: {
          title: '关于我们'
        }
      },
      {
        parentKey: '/layout/system',
        path: '/layout/system/action-log',
        name: 'action-log',
        exact: true,
        permissions: [ 'admin', 'user' ],
        pageTitle: '',
        breadcrumb: [],
        component: LoadableComponent(() =>
          import('@/views/system-settings/ActionLog')
        ),
        requiresAuth: false,
        meta: {
          title: '操作日志'
        }
      }
    ]
  }
]
