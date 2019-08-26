import React, { Component, Fragment } from 'react'
import { Button } from 'antd'
import { BaseTable } from '@/components/common'
import MarketSearch from './includes/MarketSearch'
import { marketColumnList } from './includes/TableColumn'
import AddMarketModal from './includes/AddMarketModal'
import { fetchSalesmanList } from '@/api/shop'

export class Market extends Component {
  constructor (props) {
    super(props)
    this.state = {
      editModal: false,
      editInfo: {},
      markTitle: '',
      tableList: [],
      pageInfo: {
        page: 1,
        size: 20,
        sizeCount: 1
      }
    }
    this.actionList = {
      title: '操作',
      width: 80,
      align: 'center',
      render: (text, data) => (
        <Button
          size="small"
          type="primary"
          onClick={ () => this.handelEdit(text) }
        >
          编辑
        </Button>
      )
    }
  }
  componentDidMount () {
    this.initSalesmanList()
  }
  initSalesmanList = async (info = {}) => {
    const params = Object.assign(info, this.state.pageInfo)
    const { code, results } = await fetchSalesmanList(params)
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
  handelEdit = text => {
    this.setState({
      editModal: true,
      editInfo: text,
      markTitle: '编辑业务员'
    })
  };
  handelModal = () => {
    this.setState(
      {
        editModal: false
      },
      () => {
        this.initSalesmanList()
      }
    )
  };
  changePageSize = (page, size) => {
    this.setState(
      {
        pageInfo: { size, page }
      },
      () => {
        this.initSalesmanList()
      }
    )
  };
  changePage = (current, page) => {
    this.setState(
      {
        pageInfo: { page: current }
      },
      () => {
        this.initSalesmanList()
      }
    )
  };
  render () {
    const { tableList, pageInfo, editModal, editInfo, markTitle } = this.state
    const columnList = [ ...marketColumnList, this.actionList ]
    return (
      <Fragment>
        <MarketSearch handleSearch={ this.initSalesmanList } />
        <BaseTable
          { ...{ tableList, columnList, pageInfo } }
          changePageSize={ this.changePageSize }
          changePage={ this.changePage }
        />
        {editModal && (
          <AddMarketModal
            editInfo={ editInfo }
            markTitle={ markTitle }
            marketModal={ editModal }
            handelModal={ this.handelModal }
            hideCancelModal={ () =>
              this.setState({
                editModal: false
              })
            }
          />
        )}
      </Fragment>
    )
  }
}

export default Market
