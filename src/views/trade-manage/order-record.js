import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './index.less'
import { BaseTable } from '@/components/common'
import { fetchOrderList } from '@/api/order'

import OrderRecordSearch from './includes/orderSearch'
import { orderColumnList } from './includes/TableColumn'
class OrderRecord extends Component {
  static propTypes = {};
  state = {
    expand: false,
    tableList: [],
    columnList: orderColumnList,
    pageInfo: {
      page: 1,
      size: 20,
      sizeCount: 0
    }
  };
  componentDidMount () {
    this.getOrderList()
  }
  getOrderList = async (info = {}) => {
    const params = Object.assign(info, this.state.pageInfo)
    const { code, results } = await fetchOrderList(params)
    if (code) {
      const pageInfo = {
        page: results.page,
        size: results.size,
        sizeCount: results.sizeCount
      }
      this.setState({
        tableList: results.data,
        pageInfo: pageInfo
      })
    }
  };
  changePageSize = (page, size) => {
    this.setState(
      {
        pageInfo: { size, page }
      },
      () => {
        this.getOrderList()
      }
    )
  };
  changePage = (current, page) => {
    this.setState(
      {
        pageInfo: { page: current }
      },
      () => {
        this.getOrderList()
      }
    )
  };
  render () {
    const { columnList, tableList, pageInfo } = this.state
    return (
      <div>
        <OrderRecordSearch handleSearch={ this.getOrderList } />
        <BaseTable
          { ...{ columnList, tableList, pageInfo } }
          changePageSize={ this.changePageSize }
          changePage={ this.changePage }
        ></BaseTable>
      </div>
    )
  }
}
export default OrderRecord
