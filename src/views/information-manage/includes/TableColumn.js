import { ValidSelect } from '@/utils/CommonSelect'

function bState (rows) {
  let str = null
  ValidSelect.filter(item => {
    if (item.value === rows) {
      str = item.label
    }
  })
  return str
}
function vType (row) {
  switch (row) {
    case 0:
      return '海外'
    case 1:
      return '国内'
    case 2:
      return '展示'
    default:
      return '-'
  }
}

export const brandColumn = [
  {
    title: 'ID',
    dataIndex: 'id'
  },
  {
    title: '状态',
    dataIndex: 'bState',
    render: row => bState(row)
  },
  {
    title: '关键字',
    dataIndex: 'bBrandKeyword'
  },
  {
    title: '品牌（英文）',
    dataIndex: 'bEname'
  },
  {
    title: '品牌（中文）',
    dataIndex: 'bCname'
  },
  {
    title: '首字母',
    dataIndex: 'bAcronym'
  },
  {
    title: '排序编号',
    dataIndex: 'sortNum'
  }
]
export const seriesColumn = [
  {
    title: 'ID',
    dataIndex: 'id'
  },
  {
    title: '状态',
    dataIndex: 'astate',
    render: (row, data) => bState(row)
  },
  {
    title: '关键字',
    dataIndex: 'akeyword'
  },
  {
    title: '品牌',
    dataIndex: 'bname'
  },
  {
    title: '车系（中）',
    dataIndex: 'acname'
  },
  {
    title: '车系（英）',
    dataIndex: 'aename'
  },
  {
    title: '排序编号',
    dataIndex: 'sortNum'
  }
]
export const modelColumn = [
  {
    title: 'ID',
    dataIndex: 'id'
  },
  {
    title: '状态',
    dataIndex: 'vstate',
    render: (row, data) => bState(row)
  },
  {
    title: '类型（国内外）',
    dataIndex: 'vtype',
    render: (row, data) => vType(row)
  },
  {
    title: '车辆数量',
    dataIndex: 'count'
  },
  {
    title: '车名（英）',
    dataIndex: 'vtypeEname'
  },
  {
    title: '车名（中）',
    dataIndex: 'vtypeCname'
  },
  {
    title: '品牌车系',
    dataIndex: 'bname'
  },
  {
    title: '车源地',
    dataIndex: 'vsource'
  },
  {
    title: '简称',
    dataIndex: 'vabbreviation'
  },
  {
    title: '年款',
    dataIndex: 'vannual'
  },
  {
    title: '最低价',
    dataIndex: ''
  },
  {
    title: '最高价',
    dataIndex: ''
  },
  {
    title: '排序编号',
    dataIndex: 'sortNum'
  }
]
export const ruleColumn = [
  {
    title: 'ID',
    dataIndex: 'id'
  },
  {
    title: '状态',
    dataIndex: 'state',
    render: (row, data) => bState(row)
  },
  {
    title: '车规名称',
    dataIndex: 'gaugeName'
  },
  {
    title: '排序编号',
    dataIndex: 'sortNum'
  }
]
