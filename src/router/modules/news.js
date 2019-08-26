import LoadableComponent from '@/utils/LoadableComponent'

export default [
  {
    path: '/layout/news',
    name: 'news',
    exact: true,
    permissions: [ 'admin', 'user' ],
    pageTitle: '',
    breadcrumb: [],
    requiresAuth: false,
    meta: {
      title: '咨讯管理'
    },
    childRoutes: [
      {
        parentKey: '/layout/news',
        path: '/layout/news/hot-new',
        name: 'hot-new',
        exact: true,
        permissions: [ 'admin', 'user' ],
        pageTitle: '',
        breadcrumb: [],
        component: LoadableComponent(() =>
          import('@/views/news-manage/HotNew')
        ),
        requiresAuth: false,
        meta: {
          title: '热门资讯'
        }
      },
      {
        parentKey: '/layout/news',
        path: '/layout/news/material',
        name: 'material',
        exact: true,
        permissions: [ 'admin', 'user' ],
        pageTitle: '',
        breadcrumb: [],
        component: LoadableComponent(() =>
          import('@/views/news-manage/Material')
        ),
        requiresAuth: false,
        meta: {
          title: '资料管理'
        }
      },
      {
        parentKey: '/layout/news/material',
        path: '/layout/news/material/detail',
        name: 'detail',
        exact: true,
        permissions: [ 'admin', 'user' ],
        pageTitle: '',
        breadcrumb: [],
        component: LoadableComponent(() =>
          import('@/views/news-manage/MaterialFileDetail')
        ),
        requiresAuth: false,
        meta: {
          title: '资料列表'
        }
      }
    ]
  }
]
