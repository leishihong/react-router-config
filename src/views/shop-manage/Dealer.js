import React, { Component, Fragment } from 'react'
import { PropTypes } from 'prop-types'
// import { Link } from 'react-router-dom'
import { Divider, Button } from 'antd'
import { BaseTable } from '@/components/common'
import DealerSearch from './includes/DealerSearch'
import AddDealerModal from './includes/AddDealerModal'
import { dealerColumnList } from './includes/TableColumn'
import { fetchDistributorList } from '@/api/shop'

export class Dealer extends Component {
  static propTypes = {
    history: PropTypes.object
  };
  constructor (props) {
    super(props)
    this.state = {
      dealerColumnList,
      tableList: [],
      editModal: false,
      dealTitle: '',
      editInfo: {},
      pageInfo: {
        page: 1,
        size: 20,
        sizeCount: 0
      }
    }
    this.actionList = [
      {
        title: '操作',
        key: 'action',
        align: 'center',
        fixed: 'right',
        width: 80,
        render: (text, record) => (
          <Fragment>
            <Button
              size="small"
              type="primary"
              onClick={ () => this.handelEdit(text) }
            >
              编辑
            </Button>
          </Fragment>
        )
      }
    ]
  }
  componentDidMount () {
    this.distributorList()
  }
  distributorList = async (info = {}) => {
    const params = Object.assign(info, this.state.pageInfo)
    const { code, results } = await fetchDistributorList(params)
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
  handelEdit = rows => {
    this.setState({
      editModal: true,
      editInfo: Object.assign({}, rows),
      dealTitle: '编辑商城'
    })
  };
  handelModal = () => {
    this.setState(
      {
        editModal: false
      },
      () => {
        this.distributorList()
      }
    )
  };
  changePageSize = (page, size) => {
    this.setState(
      {
        pageInfo: { size, page }
      },
      () => {
        this.distributorList()
      }
    )
  };
  changePage = (current, page) => {
    this.setState(
      {
        pageInfo: { page: current }
      },
      () => {
        this.distributorList()
      }
    )
  };
  render () {
    const { tableList, pageInfo, editInfo, editModal, dealTitle } = this.state
    const columnList = [ ...dealerColumnList, ...this.actionList ]
    return (
      <Fragment>
        <DealerSearch handleSearch={ this.distributorList } />
        <BaseTable
          { ...{ columnList, tableList, pageInfo } }
          changePageSize={ this.changePageSize }
          changePage={ this.changePage }
        />
        {editModal && (
          <AddDealerModal
            dealerModal={ editModal }
            dealTitle={ dealTitle }
            editInfo={ editInfo }
            handelModal={ this.handelModal }
            hideCancelModal={ _ =>
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

export default Dealer
