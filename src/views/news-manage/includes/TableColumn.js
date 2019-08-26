import { ValidSelect, putAwayList } from '@/utils/CommonSelect'
function bState (rows) {
  let str = null
  ValidSelect.filter(item => {
    if (item.value === rows) {
      str = item.label
    }
  })
  return str
}
function bStatus (rows) {
  let str = null
  putAwayList.filter(item => {
    if (item.value === rows) {
      str = item.label
    }
  })
  return str
}
export const articleColumn = [
  {
    title: '文章ID',
    dataIndex: 'id'
  },
  {
    title: '文章名称',
    dataIndex: 'title'
  },
  {
    title: '分类',
    dataIndex: 'type'
  },
  {
    title: '发布时间',
    dataIndex: 'createdate'
  },
  {
    title: '状态',
    dataIndex: 'status',
    // (row === 0 ? '下架' : '上架')
    render: (row, data) => bStatus(row)
  }
]
export const materialColumn = [
  {
    title: '分类名称',
    dataIndex: 'type'
  },
  {
    title: '文件数量',
    dataIndex: 'count'
  },
  {
    title: '创建时间',
    dataIndex: 'createDate'
  },
  {
    title: '修改时间',
    dataIndex: 'updateDate'
  },
  {
    title: '状态',
    dataIndex: 'state',
    render: row => bState(row)
  }
]
