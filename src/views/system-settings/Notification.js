import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Button, Divider } from 'antd'
import { BaseTable } from '@/components/common'
import NoticeModal from './includes/NoticeModal'
import { notificationColumn } from './includes/TableColumn'
import NoticeSearch from './includes/NoticeSearch'
import { fetchMessageList } from '@/api/system'

export class Notification extends Component {
  static propTypes = {};
  constructor (props) {
    super(props)
    this.state = {
      tableList: [],
      editInfo: {},
      noticeModal: false,
      pageInfo: {
        page: 1,
        size: 20,
        sizeCount: 0
      }
    }
    this.actionColumn = {
      title: '操作',
      align: 'center',
      width: 140,
      render: row => (
        <Fragment>
          <Button
            size="small"
            type="primary"
            onClick={ () => this.handelEdit(row) }
          >
            编辑
          </Button>
          <Divider type="vertical" />
          <Button size="small" type="danger">
            删除
          </Button>
        </Fragment>
      )
    }
  }
  componentDidMount () {
    this.initNoticeList()
  }
  initNoticeList = async (info = {}) => {
    const params = Object.assign(info, this.state.pageInfo)
    const { code, results } = await fetchMessageList(params)
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
  handelEdit = row => {
    this.setState({
      noticeModal: true,
      editInfo: row
    })
  };
  handelModal = () => {
    this.setState(
      {
        noticeModal: false
      },
      () => {
        this.initNoticeList()
      }
    )
  };
  hideCancelModal = () => {
    this.setState({
      noticeModal: false
    })
  };
  changePageSize = (page, size) => {
    this.setState(
      {
        pageInfo: { size, page }
      },
      () => {
        this.initNoticeList()
      }
    )
  };
  changePage = (current, page) => {
    this.setState(
      {
        pageInfo: { page: current }
      },
      () => {
        this.initNoticeList()
      }
    )
  };
  render () {
    const { tableList, noticeModal, pageInfo, editInfo } = this.state
    const columnList = [ ...notificationColumn, this.actionColumn ]
    return (
      <Fragment>
        <NoticeSearch handleSearch={ this.initNoticeList } />
        <BaseTable
          { ...{ tableList, columnList, pageInfo } }
          changePageSize={ this.changePageSize }
          changePage={ this.changePage }
        />
        {noticeModal && (
          <NoticeModal
            { ...{ noticeModal, editInfo } }
            handelSuccessModal={ this.handelModal }
            hideCancelModal={ this.hideCancelModal }
          />
        )}
      </Fragment>
    )
  }
}

export default Notification
