import React, { Component, Fragment } from 'react'
import moment from 'moment'
import { Button, Divider } from 'antd'
import { BaseTable } from '@/components/common'
import { completeColumn } from './includes/TableColumn'
import { fetchGrateList, fetchEditStatus, fetchLower } from '@/api/vehicle'
import OptimizationSearch from './includes/OptimizationSearch'
import {
  fetchTradeList,
  fetchTradeDel,
  fetchTradeIsGreat
} from '@/api/vehicle'
import {
  isEmpty
} from '@/lib/utils'
class Optimization extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tableList: [],
      editInfo: {},
      platformModal: false,
      pageInfo: {
        page: 1,
        size: 20,
        sizeCount: 0
      }
    }
    this.actionList = {
      title: '操作',
      align: 'center',
      fixed: 'right',
      width: 120,
      render: (row, data) => (
        <Fragment>
          <Button
            size="small"
            type="primary"
            onClick={ () => this.handelLower(row) }
          >
            下架优选车
          </Button>
        </Fragment>
      )
    }
  }
  componentDidMount () {
    this.initList()
  }
  initList = async (info = {}) => {
    const dateRecord = info.dateRecord
    info.createDateLeft =
      dateRecord && dateRecord.length > 0 ?
        moment(dateRecord[ 0 ]).format('YYYY-MM-DD') :
        ''
    info.createDateRight =
      dateRecord && dateRecord.length > 0 ?
        moment(dateRecord[ 1 ]).format('YYYY-MM-DD') :
        ''
    const params = Object.assign(info, this.state.pageInfo)
    delete params.dateRecord
    isEmpty( params )
    const { code, results } = await fetchGrateList(params)
    if (code) {
      const pageInfo = {
        page: results.page,
        size: results.size,
        sizeCount: results.sizeCount
      }
      if (results.data && results.data.length > 0) {
        results.data.map(item => {
          item.infoCar = `${ item.brandName }-${ item.audiName }-${ item.guageName }`
          return item
        })
      }
      this.setState({
        tableList: results.data,
        pageInfo: pageInfo
      })
    }
  };
  handelLower = async row => {
    const { code } = await fetchLower({ id: row.id })
    if (code) {
      this.initList()
    }
  };
  // handelYou = async row => {
  //   const { code } = await fetchTradeIsGreat()
  //   if (code) {
  //     this.initList()
  //   }
  // };
  // handelDel = async row => {
  //   const { code } = await fetchTradeDel({ id: row.id })
  //   if (code) {
  //     this.initList()
  //   }
  // };
  changePageSize = (page, size) => {
    this.setState(
      {
        pageInfo: { size, page }
      },
      () => {
        this.initList()
      }
    )
  };
  changePage = (current, page) => {
    this.setState(
      {
        pageInfo: { page: current }
      },
      () => {
        this.initList()
      }
    )
  };
  render () {
    const { tableList, pageInfo } = this.state
    const columnList = [ ...completeColumn, this.actionList ]
    return (
      <Fragment>
        <OptimizationSearch handelSearch={ this.initList } />
        <BaseTable
          { ...{ tableList, columnList, pageInfo } }
          changePageSize={ this.changePageSize }
          changePage={ this.changePage }
        />
      </Fragment>
    )
  }
}

export default Optimization
