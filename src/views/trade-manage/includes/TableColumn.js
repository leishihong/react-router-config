export const orderColumnList = [
  {
    title: '订单编号',
    dataIndex: 'orderNumber'
  },
  {
    title: '来源',
    dataIndex: 'source'
  },
  {
    title: '支付方式',
    dataIndex: 'payment'
  },
  {
    title: '车辆信息',
    dataIndex: 'carMessage'
  },
  {
    title: '数量',
    dataIndex: 'count'
  },
  {
    title: '客户信息',
    dataIndex: 'customer'
  },
  {
    title: '车辆价格（万元）',
    dataIndex: 'price'
  },
  {
    title: '卖方信息',
    dataIndex: 'saleMessage'
  },
  {
    title: '地区',
    dataIndex: 'area'
  },
  {
    title: '订单状态',
    dataIndex: 'state',
    render: row => {
      {
        switch (row) {
          case 0:
            return '待支付'
          case 1:
            return '成功'
          default:
            return '失败'
        }
      }
    }
  }
]
