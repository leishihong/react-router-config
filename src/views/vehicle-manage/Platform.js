import React, { Component, Fragment } from 'react'
import moment from 'moment'
import { Button, Divider } from 'antd'
import { BaseTable } from '@/components/common'
import { completeColumn } from './includes/TableColumn'
import { fetchCarAllList, fetchEditStatus } from '@/api/vehicle'
import PlatformSearch from './includes/PlatformSearch'
import {
  fetchTradeList,
  fetchTradeDel,
  fetchTradeIsGreat
} from '@/api/vehicle'
import {
  isEmpty
} from '@/lib/utils'
class Platform extends Component {
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
      width: 180,
      render: (row, data) => (
        <Fragment>
          <Button
            size="small"
            type="primary"
            onClick={ () => this.handelEdit(row) }
          >
            编辑
          </Button>
          <Divider type="vertical" />
          <Button
            size="small"
            type="primary"
            disabled={ row.isGreat === 1 ? false : true }
            onClick={ () => this.handelYou(row) }
          >
            优选车源
          </Button>
          <Divider type="vertical" />
          <Button
            size="small"
            type="primary"
            onClick={ () => this.handelDel(row) }
          >
            删除
          </Button>
        </Fragment>
      )
    }
  }
  componentDidMount () {
    this.initPlatformList()
  }
  initPlatformList = async (info = {}) => {
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
    const { code, results } = await fetchTradeList(params)
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
  handelEdit = row => {
    this.setState({
      editInfo: row,
      platformModal: true
    })
  };
  handelYou = async row => {
    const { code } = await fetchTradeIsGreat()
    if (code) {
      this.initPlatformList()
    }
  };
  handelDel = async row => {
    const { code } = await fetchTradeDel({ id: row.id })
    if (code) {
      this.initPlatformList()
    }
  };
  changePageSize = (page, size) => {
    this.setState(
      {
        pageInfo: { size, page }
      },
      () => {
        this.initPlatformList()
      }
    )
  };
  changePage = (current, page) => {
    this.setState(
      {
        pageInfo: { page: current }
      },
      () => {
        this.initPlatformList()
      }
    )
  };
  render () {
    const { tableList, pageInfo } = this.state
    const columnList = [ ...completeColumn, this.actionList ]
    return (
      <Fragment>
        <PlatformSearch handelSearch={ this.initPlatformList } />
        <BaseTable
          { ...{ tableList, columnList, pageInfo } }
          changePageSize={ this.changePageSize }
          changePage={ this.changePage }
        />
      </Fragment>
    )
  }
}

export default Platform
