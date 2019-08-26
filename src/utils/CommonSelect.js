// 开启、关闭
export const ToggleSelect = [
  {
    label: '开启',
    value: 0
  },
  {
    label: '关闭',
    value: 1
  }
]
// 预定、有效、删除
export const ValidSelect = [
  {
    label: '可预订',
    value: 0
  },
  {
    label: '有效',
    value: 1
  },
  {
    label: '删除',
    value: -1
  }
]

// 已处理、未处理
export const ConductSelect = [
  {
    label: '处理',
    value: 1
  },
  {
    label: '未处理',
    value: 2
  }
]
export const statusSelect = [
  {
    label: '否',
    value: 0
  },
  {
    label: '是',
    value: 1
  }
]
export const stradeSelect = [
  {
    label: '平台',
    value: 1
  },
  {
    label: '车城',
    value: 2
  }
]
export const noticeSelect = [
  {
    label: '全部',
    value: 0,
    title: '推送+短信'
  },
  {
    label: '应用推送',
    value: 1,
    title: '推送'
  },
  {
    label: '短信通知',
    value: 2,
    title: '短信'
  }
]
export const carSelectType = [
  {
    label: '国外',
    value: 0
  },
  {
    label: '国内',
    value: 1
  },
  {
    label: '展示',
    value: 2
  }
]
export const salesStates = [
  {
    label: '海外期货',
    value: 0
  },
  {
    label: '海外仓在库',
    value: 1
  },
  {
    label: '海运在途',
    value: 2
  },
  {
    label: '已到港',
    value: 3
  },
  {
    label: '保税在库',
    value: 4
  },
  {
    label: '完税',
    value: 5
  },
  {
    label: '国内可预定',
    value: 6
  }
]
export const putAwayList = [
  {
    label: '下架',
    value: 0
  },
  {
    label: '上架',
    value: 1
  }
]
function generateBig () {
  const chBig = 'A'
  let strBig = ''
  for (let i = 0; i < 26; i++) {
    strBig += String.fromCharCode(chBig.charCodeAt(0) + i)
  }
  return strBig
}
// 首字母
export const initialSelect = generateBig()
