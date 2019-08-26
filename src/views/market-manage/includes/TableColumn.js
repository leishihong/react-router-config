import { ValidSelect, statusSelect } from '@/utils/CommonSelect'

function bState (rows) {
  let str = null
  ValidSelect.filter(item => {
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
export const modelColumn = [
  {
    title: 'ID',
    dataIndex: 'id'
  },
  {
    title: '车辆信息',
    dataIndex: 'message'
  },
  {
    title: '车规',
    dataIndex: 'guage'
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
    title: '提供者',
    dataIndex: ''
  },
  {
    title: '颜色',
    dataIndex: 'color'
  },
  {
    title: '价格',
    dataIndex: 'price'
  },
  {
    title: '配置',
    dataIndex: 'configure'
  },
  {
    title: '环保是否公开',
    dataIndex: 'isopen',
    render: (text, row) => (text === 0 ? '是' : '否')
  },
  {
    title: '手续',
    dataIndex: 'shock'
  },
  {
    title: '排放标准',
    dataIndex: 'standard'
  },
  {
    title: '创建时间',
    dataIndex: 'createDate'
  },
  {
    title: '更新时间',
    dataIndex: 'updateDate'
  }
]
export const auditColumn = [
  {
    title: 'ID',
    dataIndex: 'id'
  },
  {
    title: '申请人信息',
    dataIndex: ''
  },
  {
    title: '车辆信息',
    dataIndex: 'auditCarInfo'
  },
  {
    title: '车规',
    dataIndex: 'guage'
  },
  {
    title: '状态',
    dataIndex: 'state',
    render: (row, data) => bState(row)
  },
  {
    title: '创建人',
    dataIndex: 'createPerson'
  },
  {
    title: '颜色',
    dataIndex: 'color'
  },
  {
    title: '原价格',
    dataIndex: 'originPrice'
  },
  {
    title: '提交价格',
    dataIndex: 'submitPrice'
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
    title: '手续',
    dataIndex: 'shock'
  },
  {
    title: '排放标准',
    dataIndex: 'standard'
  },
  {
    title: '图片',
    dataIndex: 'image'
  },
  {
    title: '创建时间',
    dataIndex: 'createDate'
  },
  {
    title: '更新时间',
    dataIndex: 'updateDate'
  }
]
