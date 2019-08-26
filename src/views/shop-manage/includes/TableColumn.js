import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'antd'

import { ValidSelect, ToggleSelect } from '@/utils/CommonSelect'

function aState (rows) {
  let str = null
  ToggleSelect.filter(item => {
    if (item.value === rows) {
      str = item.label
    }
  })
  return str
}

function bState (rows) {
  let str = null
  ValidSelect.filter(item => {
    if (item.value === rows) {
      str = item.label
    }
  })
  return str
}

export const shopColumnList = [
  {
    title: '车城ID',
    dataIndex: 'id'
  },
  {
    title: '车城名称',
    dataIndex: 'shopName'
  },
  {
    title: '车城状态',
    dataIndex: 'state',
    render: (row, data) => aState(row)
  },
  {
    title: '地址',
    dataIndex: 'shopAddress'
  },
  {
    title: '车城负责人',
    dataIndex: 'shopCharge'
  },
  {
    title: '联系方式',
    dataIndex: 'telephone'
  },
  {
    title: '授权车城',
    dataIndex: 'content'
  },
  {
    title: '摄像头',
    render: (rows, data) => (
      <Link to={ { pathname: '/layout/shop/car-city/camera', state: rows } }>
        摄像头列表
      </Link>
    )
  }
]
export const dealerColumnList = [
  {
    title: '经销商ID',
    key: 1,
    dataIndex: 'id'
  },
  {
    title: '经销商名称',
    key: 2,
    dataIndex: 'distributor'
  },
  {
    title: '所属车城',
    key: 3,
    dataIndex: 'tradeName'
  },
  {
    title: '经销商状态',
    key: 4,
    dataIndex: 'state',
    render: (row, data) => aState(row)
  },
  {
    title: '地址',
    key: 5,
    dataIndex: 'address'
  },
  {
    title: '经销商负责人',
    key: 6,
    dataIndex: 'distributorName'
  },
  {
    title: '联系方式',
    key: 7,
    dataIndex: 'telephone'
  }
]
export const marketColumnList = [
  {
    title: '车城ID',
    dataIndex: 'id'
  },
  {
    title: '车城名称',
    dataIndex: 'tradeName'
  },
  {
    title: '经销商',
    dataIndex: 'distributor'
  },
  {
    title: '状态',
    dataIndex: 'state',
    render: (row, data) => bState(row)
  },
  {
    title: '业务员姓名',
    dataIndex: 'name'
  },
  {
    title: '联系方式',
    dataIndex: 'telephone'
  }
]
