const menuList = [
  {
    id: 1,
    text: '首页',
    iconSkin: 'home',
    children: [],
    url: '/layout/dashboard'
  },
  {
    id: 2,
    text: '交易管理',
    iconSkin: 'shop',
    children: [
      {
        id: 3,
        text: '订单统计',
        iconSkin: 'folder',
        url: '/layout/order/order-record',
        parent: 2
      }
      // {
      //   id: 4,
      //   text: '财务管理',
      //   iconSkin: 'folder',
      //   url: '/layout/order/financial-statistics',
      //   parent: 2
      // }
    ],
    url: '/layout/order'
  },
  {
    id: 5,
    text: '商家管理',
    iconSkin: 'shopping',
    children: [
      {
        id: 6,
        text: '车城管理',
        iconSkin: 'folder',
        url: '/layout/shop/car-city',
        parent: 5
      },
      {
        id: 7,
        text: '经销商管理',
        iconSkin: 'folder',
        url: '/layout/shop/dealer',
        parent: 5
      },
      {
        id: 8,
        text: '销售',
        iconSkin: 'folder',
        url: '/layout/shop/market',
        parent: 5
      }
    ],
    url: '/layout/shop'
  },
  {
    id: 9,
    text: '车辆信息管理',
    iconSkin: 'car',
    children: [
      {
        id: 10,
        text: '品牌管理',
        iconSkin: 'folder',
        url: '/layout/info/brand',
        parent: 9
      },
      {
        id: 11,
        text: '车系管理',
        iconSkin: 'folder',
        url: '/layout/info/vehicle-series',
        parent: 9
      },
      {
        id: 12,
        text: '车型管理',
        iconSkin: 'folder',
        url: '/layout/info/vehicle-model',
        parent: 9
      },
      {
        id: 13,
        text: '车规管理',
        iconSkin: 'folder',
        url: '/layout/info/vehicle-rule',
        parent: 9
      }
    ],
    url: '/layout/info'
  },
  {
    id: 100,
    text: '车辆管理',
    iconSkin: 'deployment-unit',
    children: [
      {
        id: 102,
        text: '全部车辆管理',
        iconSkin: 'folder',
        url: '/layout/vehicle/complete',
        parent: 100
      }
      // {
      //   id: 103,
      //   text: '平台车辆管理',
      //   iconSkin: 'folder',
      //   url: '/layout/vehicle/platform',
      //   parent: 100
      // },
      // {
      //   id: 104,
      //   text: '优选车辆管理',
      //   iconSkin: 'folder',
      //   url: '/layout/vehicle/optimization',
      //   parent: 100
      // }
    ],
    url: '/layout/vehicle'
  },
  {
    id: 14,
    text: '行情表管理',
    iconSkin: 'sliders',
    children: [
      {
        id: 15,
        text: '行情表车型管理',
        iconSkin: 'folder',
        url: '/layout/market/market-model',
        parent: 14
      },
      {
        id: 16,
        text: '行情表审核管理',
        iconSkin: 'folder',
        url: '/layout/market/market-audit',
        parent: 14
      }
    ],
    url: '/layout/market'
  },
  {
    id: 17,
    text: '资讯管理',
    iconSkin: 'notification',
    children: [
      {
        id: 18,
        text: '热门资讯管理',
        iconSkin: 'folder',
        url: '/layout/news/hot-new',
        parent: 17
      },
      {
        id: 19,
        text: '资料管理',
        iconSkin: 'folder',
        url: '/layout/news/material',
        parent: 17
      }
    ],
    url: '/layout/news'
  },
  {
    id: 20,
    text: '系统管理',
    iconSkin: 'setting',
    children: [
      {
        id: 21,
        text: '管理员设置',
        iconSkin: 'folder',
        url: '/layout/system/admin',
        parent: 20
      },
      {
        id: 22,
        text: '权限设置',
        iconSkin: 'folder',
        url: '/layout/system/rule-set',
        parent: 20
      },
      {
        id: 23,
        text: '消息推送',
        iconSkin: 'folder',
        url: '/layout/system/notification',
        parent: 20
      },
      {
        id: 24,
        text: '保证金设置',
        iconSkin: 'folder',
        url: '/layout/system/cash-deposit',
        parent: 20
      },
      {
        id: 25,
        text: '关于我们',
        iconSkin: 'folder',
        url: '/layout/system/about-us',
        parent: 20
      },
      {
        id: 26,
        text: '操作日志',
        iconSkin: 'folder',
        url: '/layout/system/action-log',
        parent: 20
      }
    ],
    url: '/layout/system'
  }
]
// const menuList = [
//   {
//     oid: '001',
//     permissionName: '首页',
//     permissionDesc: '',
//     iconSkin: 'home',
//     permissionType: '0',
//     content: '/layout/dashboard',
//     page: null,
//     parentOid: '0',
//     isParent: null,
//     checked: null,
//   },
//   {
//     oid: '011',
//     permissionName: '交易管理',
//     permissionDesc: '',
//     permissionType: '0',
//     content: '/layout/order',
//     iconSkin: 'global',
//     page: null,
//     parentOid: '',
//     isParent: null,
//     checked: null,
//     btnList: [],
//     children: [
//       {
//         oid: '024',
//         permissionName: '订单记录',
//         permissionDesc: '',
//         permissionType: '0',
//         content: '/layout/order/order-record',
//         iconSkin: '',
//         page: null,
//         parentOid: '023',
//         isParent: null,
//         checked: null,
//       },
//       {
//         oid: '025',
//         permissionName: '饼图',
//         permissionDesc: '',
//         permissionType: '0',
//         content: '/layout/order/financial-statistics',
//         iconSkin: '',
//         page: null,
//         parentOid: '023',
//         isParent: null,
//         checked: null,
//       },
//     ],
//   },
//   {
//     oid: '017',
//     permissionName: '商家管理',
//     permissionDesc: '',
//     permissionType: '0',
//     content: '/layout/shop',
//     iconSkin: 'car',
//     page: null,
//     parentOid: '',
//     isParent: null,
//     checked: null,
//     children: [
//       {
//         oid: '024',
//         permissionName: '车城管理',
//         permissionDesc: '',
//         permissionType: '0',
//         content: '/layout/shop/car-city',
//         iconSkin: '',
//         page: null,
//         parentOid: '023',
//         isParent: null,
//         checked: null,
//       },
//       {
//         oid: '025',
//         permissionName: '经销商管理',
//         permissionDesc: '',
//         permissionType: '0',
//         content: '/layout/order/financial-statistics',
//         iconSkin: '',
//         page: null,
//         parentOid: '023',
//         isParent: null,
//         checked: null,
//       },
//     ],
//   },
//   {
//     oid: '018',
//     permissionName: '订单管理',
//     permissionDesc: '',
//     permissionType: '0',
//     content: '/menu/Order',
//     iconSkin: 'global',
//     page: null,
//     parentOid: '',
//     isParent: null,
//     checked: null,
//     btnList: [
//       {
//         oid: '019',
//         permissionName: '订单详情',
//         permissionDesc: '',
//         permissionType: '0',
//         content: 'detail',
//         iconSkin: '',
//         page: null,
//         parentOid: '018',
//         isParent: null,
//         checked: null,
//       },
//       {
//         oid: '020',
//         permissionName: '结束订单',
//         permissionDesc: '',
//         permissionType: '0',
//         content: 'finish',
//         iconSkin: '',
//         page: null,
//         parentOid: '018',
//         isParent: null,
//         checked: null,
//       },
//     ],
//   },
//   {
//     oid: '021',
//     permissionName: '员工管理',
//     permissionDesc: '',
//     permissionType: '0',
//     content: 'menu/User',
//     iconSkin: 'usergroup-add',
//     page: null,
//     parentOid: '018',
//     isParent: null,
//     checked: null,
//   },
//   {
//     oid: '022',
//     permissionName: '车辆地图',
//     permissionDesc: '',
//     permissionType: '0',
//     content: 'menu/BikeMap',
//     iconSkin: 'environment',
//     page: null,
//     parentOid: '018',
//     isParent: null,
//     checked: null,
//   },
//   {
//     oid: '023',
//     permissionName: '图标',
//     permissionDesc: '',
//     permissionType: '0',
//     content: '/Charts',
//     iconSkin: 'line-chart',
//     page: null,
//     parentOid: '',
//     isParent: null,
//     checked: null,
//     children: [
//       {
//         oid: '024',
//         permissionName: '柱形图',
//         permissionDesc: '',
//         permissionType: '0',
//         content: '/Charts/Bar',
//         iconSkin: '',
//         page: null,
//         parentOid: '023',
//         isParent: null,
//         checked: null,
//       },
//       {
//         oid: '025',
//         permissionName: '饼图',
//         permissionDesc: '',
//         permissionType: '0',
//         content: '/Charts/Pie',
//         iconSkin: '',
//         page: null,
//         parentOid: '023',
//         isParent: null,
//         checked: null,
//       },
//       {
//         oid: '026',
//         permissionName: '折线图',
//         permissionDesc: '',
//         permissionType: '0',
//         content: '/Charts/Line',
//         iconSkin: '',
//         page: null,
//         parentOid: '023',
//         isParent: null,
//         checked: null,
//       },
//     ],
//   },
//   {
//     oid: '027',
//     permissionName: '权限设置',
//     permissionDesc: '',
//     permissionType: '0',
//     content: '/Permission',
//     iconSkin: 'key',
//     page: null,
//     parentOid: '',
//     isParent: null,
//     checked: null,
//   },
// ];

export default menuList
