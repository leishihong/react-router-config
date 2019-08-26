import {
  ToggleSelect,
  statusSelect,
  salesStates,
  ValidSelect,
  stradeSelect
} from '@/utils/CommonSelect'
function bState (rows) {
  let str = null
  ValidSelect.filter(item => {
    if (item.value === rows) {
      str = item.label
    }
  })
  return str
}

function trade (rows) {
  let str = null
  stradeSelect.filter(item => {
    if (item.value === rows) {
      str = item.label
    }
  })
  return str
}
function salesStateFun (rows) {
  let str = null
  salesStates.filter(item => {
    if (item.value === rows) {
      str = item.label
    }
  })
  return str
}
function statusFun (rows) {
  let str = null
  statusSelect.filter(item => {
    if (item.value === rows) {
      str = item.label
    }
  })
  return str
}

export const completeColumn = [
  {
    title: 'id',
    dataIndex: 'id'
  },
  {
    title: '车辆信息',
    dataIndex: 'infoCar'
  },
  {
    title: '车规',
    dataIndex: 'guageName'
  },
  {
    title: '状态',
    dataIndex: 'state',
    render: (row, data) => bState(row)
  },
  {
    title: '创建者',
    dataIndex: 'createPerson'
  },
  {
    title: '颜色',
    dataIndex: 'color'
  },
  {
    title: '平台/车城',
    dataIndex: 'isTrade',
    render: (row, data) => trade(row)
  },
  {
    title: '车城名称',
    dataIndex: 'trade'
  },
  {
    title: '经销商',
    dataIndex: 'distributor'
  },
  {
    title: '业务员',
    dataIndex: 'salesman'
  },
  {
    title: '价格',
    dataIndex: 'price'
  },
  {
    title: '平台推广价格',

    dataIndex: 'platformPrice'
  },
  {
    title: '售卖状态',
    dataIndex: 'salesState',
    render: (row, data) => salesStateFun(row)
  },
  {
    title: '车辆生产日期',
    dataIndex: 'manufactureDate'
  },
  {
    title: '车辆库存',
    dataIndex: 'count'
  },
  {
    title: '配置',
    dataIndex: 'configure'
  },
  {
    title: '环保是否公开',
    dataIndex: 'isOpen',
    render: (row, data) => statusFun(row)
  },
  {
    title: '车辆所在地',
    dataIndex: 'address'
  },
  {
    title: '手续',
    dataIndex: 'stock'
  },
  {
    title: '排放标准',
    dataIndex: 'standard'
  },
  // {
  //   title: '是否同步到展厅',
  //
  //   dataIndex: 'isshow'
  // },
  {
    title: '创建时间',
    dataIndex: 'createDate'
  },
  {
    title: '更新时间',
    dataIndex: 'updateDate'
  }
]
