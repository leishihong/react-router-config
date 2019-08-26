import React, { Component, Fragment } from 'react'
import { BaseTable } from '@/components/common'
import { auditColumn } from './includes/TableColumn.js'
import { Button, Divider } from 'antd'
import { fetchAuditList } from '@/api/market'
import AuditSearch from './includes/AuditSearch'

class MarketAudit extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tableList: [],
      pageInfo: {
        page: 1,
        size: 20,
        sizeCount: 0
      }
    }
    this.actionColumn = {
      title: '操作',
      width: 80,
      align: 'center',
      render: (row, data) => (
        <Fragment>
          <Button
            disabled={ row.status === 0 ? false : true }
            type="primary"
            size="small"
          >
            {row.status === 0 ? '审核' : '已审核'}
          </Button>
        </Fragment>
      )
    }
  }
  componentDidMount () {
    this.initAuditList()
  }
  initAuditList = async (info = {}) => {
    const params = Object.assign(info, this.state.pageInfo)
    const { code, results } = await fetchAuditList(params)
    if (code) {
      const pageInfo = {
        page: results.page,
        size: results.size,
        sizeCount: results.sizeCount
      }
      if (results.data && results.data.length > 0) {
        results.data.map(item => {
          item.auditCarInfo = `${ item.bname }-${ item.aname }-${ item.vname }`
          return item
        })
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
        this.initAuditList()
      }
    )
  };
  changePage = (current, page) => {
    this.setState(
      {
        pageInfo: { page: current }
      },
      () => {
        this.initAuditList()
      }
    )
  };
  render () {
    const { tableList, pageInfo } = this.state
    const columnList = [ ...auditColumn, this.actionColumn ]
    return (
      <Fragment>
        <AuditSearch handelSearch={ this.initAuditList } />
        <BaseTable
          { ...{ pageInfo, columnList, tableList } }
          changePageSize={ this.changePageSize }
          changePage={ this.changePage }
        />
      </Fragment>
    )
  }
}

export default MarketAudit
