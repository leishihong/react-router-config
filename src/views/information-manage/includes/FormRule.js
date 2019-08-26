export const brandRule = {
  bCname: {
    rules: [
      {
        required: true,
        message: '品牌中文不能为空'
      }
    ]
  },
  bEname: {
    rules: [
      {
        required: true,
        message: '品牌英文不能为空'
      }
    ]
  },
  bImage: {
    rules: [
      {
        required: true,
        message: '图片地址不能为空'
      }
    ]
  },
  bBrandKeyword: {
    rules: [
      {
        required: true,
        message: '搜索关键字不能为空'
      }
    ]
  },
  bAcronym: {
    rules: [
      {
        required: true,
        message: '首字母不能为空'
      }
    ]
  },
  sortNum: {
    rules: [
      {
        required: true,
        message: '排序编号不能为空'
      }
    ]
  },
  bState: {
    rules: [
      {
        required: true,
        message: '状态不能为空'
      }
    ]
  }
}
export const seriesRule = {
  bid: {
    rules: [
      {
        required: true,
        message: '品牌不能为空'
      }
    ]
  },
  aCname: {
    rules: [
      {
        required: true,
        message: '车系中文不能为空'
      }
    ]
  },
  aEname: {
    rules: [
      {
        required: true,
        message: '车系英文不能为空'
      }
    ]
  },
  aAppImage: {
    rules: [
      {
        required: true,
        message: '车系app图片不能为空'
      }
    ]
  },
  aKeyword: {
    rules: [
      {
        required: true,
        message: '车系关键字查询不能为空'
      }
    ]
  },
  aState: {
    rules: [
      {
        required: true,
        message: '状态不能为空'
      }
    ]
  },
  sortNum: {
    rules: [
      {
        required: true,
        message: '排序编号不能为空'
      }
    ]
  }
}
export const modelRule = {
  bid: {
    rules: [
      {
        required: true,
        message: '品牌不能为空'
      }
    ]
  },
  aid: {
    rules: [
      {
        required: true,
        message: '车系不能为空'
      }
    ]
  },
  vTypeCname: {
    rules: [
      {
        required: true,
        message: '车型中文名称不能为空'
      }
    ]
  },
  vTypeEname: {
    rules: [
      {
        required: true,
        message: '车型英文名称不能为空'
      }
    ]
  },
  vType: {
    rules: [
      {
        required: true,
        message: '车型类型不能为空'
      }
    ]
  },
  vSource: {
    rules: [
      {
        required: true,
        message: '车源地不能为空'
      }
    ]
  },
  vAbbreviation: {
    rules: [
      {
        required: true,
        message: '简称不能为空'
      }
    ]
  },
  vAnnual: {
    rules: [
      {
        required: true,
        message: '年款不能为空'
      }
    ]
  },
  vAppImage: {
    rules: [
      {
        required: true,
        message: 'app大图不能为空'
      }
    ]
  },
  vState: {
    rules: [
      {
        required: true,
        message: '状态不能为空'
      }
    ]
  },
  sortNum: {
    rules: [
      {
        required: true,
        message: '排序编号不能为空'
      }
    ]
  }
}
// 车规
export const vehicleRule = {
  gaugeName: {
    rules: [
      {
        required: true,
        message: '车规名称不能为空'
      }
    ]
  },
  state: {
    rules: [
      {
        required: true,
        message: '状态不能为空'
      }
    ]
  },
  sortNum: {
    rules: [
      {
        required: true,
        message: '排序编号不能为空'
      }
    ]
  }
}
