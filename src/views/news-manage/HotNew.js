import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Button, Divider } from 'antd'
import { BaseTable } from '@/components/common'
import ArticleModal from './includes/ArticleModal'
import { articleColumn } from './includes/TableColumn'
import { fetchNewList, fetchNewDel, fetchEditStatus } from '@/api/news'
import HotSearch from './includes/HotSearch'
class HotNew extends Component {
  static propTypes = {};
  constructor (props) {
    super(props)
    this.state = {
      articleModal: false,
      editInfo: {},
      articleTitle: '',
      tableList: [],
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
      width: 220,
      render: (row, data) => (
        <Fragment>
          <Button
            size="small"
            type="primary"
            onClick={ () => this.hendelEdit(row) }
          >
            编辑
          </Button>
          <Divider type="vertical" />
          <Button
            size="small"
            type="primary"
            onClick={ () => this.hendelStatus(row) }
          >
            {row.status === 1 ? '下架' : '上架'}
          </Button>
          <Divider type="vertical" />
          <Button
            size="small"
            type="primary"
            onClick={ () => this.hendelDel(row) }
          >
            删除
          </Button>
        </Fragment>
      )
    }
  }
  componentDidMount () {
    this.initNewList()
  }
  initNewList = async (info = {}) => {
    const params = Object.assign(info, this.state.pageInfo)
    const { code, results } = await fetchNewList(params)
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
  hendelEdit = row => {
    this.setState({
      editInfo: row,
      articleModal: true,
      articleTitle: '编辑文章'
    })
  };
  // 上下架
  hendelStatus = async row => {
    const params = {
      id: row.id,
      status: row.status === 1 ? 0 : 1
    }
    const { code } = await fetchEditStatus(params)
    if (code) {
      this.initNewList()
    }
  };
  hendelDel = async row => {
    const { code } = await fetchNewDel({ id: row.id })
    if (code) {
      this.initNewList()
    }
  };
  handelModal = () => {
    this.setState(
      {
        articleModal: false
      },
      () => {
        this.initNewList()
      }
    )
  };
  changePageSize = (page, size) => {
    this.setState(
      {
        pageInfo: { size, page }
      },
      () => {
        this.initNewList()
      }
    )
  };
  changePage = (current, page) => {
    this.setState(
      {
        pageInfo: { page: current }
      },
      () => {
        this.initNewList()
      }
    )
  };
  render () {
    const {
      tableList,
      articleModal,
      articleTitle,
      pageInfo,
      editInfo
    } = this.state
    const columnList = [ ...articleColumn, this.actionList ]
    return (
      <Fragment>
        <HotSearch handelSearch={ this.initNewList } />
        <BaseTable
          { ...{ tableList, columnList, pageInfo } }
          changePageSize={ this.changePageSize }
          changePage={ this.changePage }
        />
        {articleModal && (
          <ArticleModal
            { ...{ articleModal, articleTitle, editInfo } }
            handelModal={ this.handelModal }
            hideCancelModal={ () =>
              this.setState({
                articleModal: false
              })
            }
          />
        )}
      </Fragment>
    )
  }
}

export default HotNew
