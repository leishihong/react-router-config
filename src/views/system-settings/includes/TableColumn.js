import { ToggleSelect } from '@/utils/CommonSelect'
function bState (rows) {
  let str = null
  ToggleSelect.filter(item => {
    if (item.value === rows) {
      str = item.label
    }
  })
  return str
}

export const adminColumn = [
  {
    title: '管理员ID',
    dataIndex: 'id'
  },
  {
    title: '管理员账号',
    dataIndex: 'account'
  },
  {
    title: '密码',
    dataIndex: 'password'
  },
  {
    title: '管理姓名',
    dataIndex: 'username'
  },
  {
    title: '状态',
    dataIndex: 'state',
    render: row => bState(row)
  },
  {
    title: '权限',
    dataIndex: 'shiroName'
  }
]
export const ruleSetColumn = [
  {
    title: '权限名称',
    dataIndex: 'shiroName'
  },
  {
    title: '状态',
    dataIndex: 'status',
    render: row => bState(row)
  },
  {
    title: '权限内容',
    dataIndex: 'shiroContent'
  }
]
export const notificationColumn = [
  {
    title: '消息标题',
    dataIndex: 'title'
  },
  {
    title: '发送时间',
    dataIndex: 'createDate'
  },
  {
    title: '发送范围',
    dataIndex: 'around'
  },
  {
    title: '发送方式',
    dataIndex: 'type'
  }
]

export const depositColumn = [
  {
    title: '名称',
    dataIndex: 'name'
  },
  {
    title: '保证金',
    dataIndex: 'state',
    render: (text, row) => (text === 0 ? '开启' : '关闭')
  },
  {
    title: '保证金范围',
    dataIndex: 'roundContent'
  }
]
