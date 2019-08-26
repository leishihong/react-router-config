export const articleRule = {
  title: {
    rules: [
      {
        required: true,
        message: '文章标题不能为空'
      }
    ]
  },
  type: {
    rules: [
      {
        required: true,
        message: '分类不能为空'
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
  },
  status: {
    rules: [
      {
        required: true,
        message: '状态不能为空'
      }
    ]
  }
}
