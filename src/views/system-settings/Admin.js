import React, { Component, Fragment } from 'react'
import { PropTypes } from 'prop-types'
import { Divider, Button } from 'antd'
import { BaseTable } from '@/components/common'
import AdminSearch from './includes/AdminSearch'
import AddAdminModal from './includes/AddAdminModal'
import { adminColumn } from './includes/TableColumn'
import { fetchUserList, fetchUserState, fetchUserDel } from '@/api/system'

class Admin extends Component {
  static propTypes = {
    form: PropTypes.object,
    adminModal: PropTypes.bool
  };
  constructor (props) {
    super(props)
    this.state = {
      adminModal: false,
      adminTitle: '',
      tableList: [ { name: '11' } ],
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
        fixed: 'right',
        align: 'center',
        width: 220,
        render: (row, record) => (
          <span>
            <Button
              type="primary"
              size="small"
              onClick={ () => this.handelEdit(row) }
            >
              编辑
            </Button>
            <Divider type="vertical" />
            <Button
              type="primary"
              size="small"
              onClick={ () => this.handelState(row) }
            >
              {row.state === 1 ? '启用' : '禁用'}
            </Button>
            <Divider type="vertical" />
            <Button
              type="danger"
              size="small"
              onClick={ () => this.handelDel(row) }
            >
              删除
            </Button>
          </span>
        )
      }
    ]
  }
  componentDidUpdate (prevProps, prevState) {
    if (prevProps.adminModal) prevProps.form.resetFields()
  }
  componentDidMount () {
    this.initAdminList()
  }

  initAdminList = async (info = {}) => {
    const params = Object.assign(info, this.state.pageInfo)
    const { code, results } = await fetchUserList(params)
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
  handelState = async row => {
    const params = {
      id: row.id,
      state: row.state === 0 ? 1 : 0
    }
    const { code } = await fetchUserState(params)
    if (code) {
      this.initAdminList()
    }
  };
  handelDel = async row => {
    const { code } = await fetchUserDel({ id: row.id })
    if (code) {
      this.initAdminList()
    }
  };
  handelEdit = row => {
    this.setState({
      editInfo: row,
      adminModal: true,
      adminTitle: '编辑管理员'
    })
  };
  handelSuccessModal = () => {
    this.setState(
      {
        adminModal: false
      },
      () => {
        this.initAdminList()
      }
    )
  };

  changePageSize = (page, size) => {
    this.setState(
      {
        pageInfo: { size, page }
      },
      () => {
        this.initAdminList()
      }
    )
  };
  changePage = (current, page) => {
    this.setState(
      {
        pageInfo: { page: current }
      },
      () => {
        this.initAdminList()
      }
    )
  };
  render () {
    const {
      tableList,
      adminModal,
      adminTitle,
      pageInfo,
      editInfo
    } = this.state
    const columnList = [ ...adminColumn, ...this.actionList ]
    return (
      <Fragment>
        <AdminSearch handleSearch={ this.initAdminList } />
        <BaseTable
          { ...{ tableList, columnList, pageInfo } }
          changePageSize={ this.changePageSize }
          changePage={ this.changePage }
        ></BaseTable>
        {adminModal && (
          <AddAdminModal
            { ...{ adminModal, adminTitle, editInfo } }
            handelSuccessModal={ this.handelSuccessModal }
            hideCancelModal={ () =>
              this.setState({
                adminModal: false
              })
            }
          />
        )}
      </Fragment>
    )
  }
}

export default Admin
