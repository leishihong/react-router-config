// 新增管理员
export const adminRule = {
  username: {
    rules: [
      {
        required: true,
        message: '姓名不能为空'
      }
    ]
  },
  account: {
    rules: [
      {
        required: true,
        message: '账号不能为空'
      }
    ]
  },
  password: {
    rules: [
      {
        required: true,
        message: '密码不能为空'
      }
    ]
  },
  sid: {
    rules: [ { required: true, message: '权限不能为空' } ]
  },
  state: {
    rules: [
      {
        required: true,
        message: '状态不能为空'
      }
    ]
  }
}
export const ruleSetRule = {
  name: {
    rules: [
      {
        required: true,
        message: '权限名称不能为空'
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
  }
}
export const cashRule = {
  name: {
    rules: [
      {
        required: true,
        message: '保证金名称不能为空'
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
  }
}
export const noticeRule = {
  title: {
    rules: [
      {
        required: true,
        message: '标题不能为空'
      }
    ]
  },
  around: {
    rules: [
      {
        required: true,
        message: '范围不能为空'
      }
    ]
  },
  type: {
    rules: [
      {
        required: true,
        message: '发送方式不能为空'
      }
    ]
  },
  content: {
    rules: [
      {
        required: true,
        message: '内容不能为空'
      }
    ]
  }
}
