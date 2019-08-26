import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Button, Divider } from 'antd'
import { BaseTable } from '@/components/common'
import { materialColumn } from './includes/TableColumn'
import MaterialSearch from './includes/MaterialSearch'
import AddMaterialModal from './includes/AddMaterialModal'
import { fetchFileList, fetchFileDel } from '@/api/news'
import history from '@/lib/history'

class Material extends Component {
  static propTypes = {
    history: PropTypes.object
  };
  constructor (props) {
    super(props)
    this.state = {
      articleModal: false,
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
          <Button
            size="small"
            type="primary"
            onClick={ () => this.handelDetail(row) }
          >
            查看
          </Button>
          <Divider type="vertical" />
          <Button
            size="small"
            type="danger"
            onClick={ () => this.handelDel(row) }
          >
            删除
          </Button>
        </Fragment>
      )
    }
  }
  componentDidMount () {
    this.initFileList()
  }
  initFileList = async (info = {}) => {
    const params = Object.assign(info, this.state.searchInfo)
    const { code, results } = await fetchFileList(params)
    if (code) {
      const pageInfo = {
        page: results.page,
        size: results.size,
        sizeCount: results.sizeCount
      }
      setTimeout(() => {
        this.setState({
          tableList: results.data,
          pageInfo: pageInfo
        })
      }, 300)
    }
  };
  handelEdit = row => {
    this.setState({
      editInfo: row,
      materialModal: true,
      articleTitle: '编辑分类'
    })
  };
  handelDetail = row => {
    this.props.history.push({
      pathname: '/layout/news/material/detail',
      state: row
    })
  };
  handelDel = async row => {
    const params = {
      id: row.id
    }
    const { code } = await fetchFileDel(params)
    if (code) {
      this.initFileList()
    }
  };
  changePageSize = (page, size) => {
    this.setState(
      {
        pageInfo: { size, page }
      },
      () => {
        this.initFileList()
      }
    )
  };
  changePage = (current, page) => {
    this.setState(
      {
        pageInfo: { page: current }
      },
      () => {
        this.initFileList()
      }
    )
  };
  render () {
    const {
      tableList,
      editInfo,
      articleTitle,
      pageInfo,
      materialModal
    } = this.state
    const columnList = [ ...materialColumn, this.actionList ]
    return (
      <Fragment>
        <MaterialSearch handelSearch={ this.initFileList } />
        <BaseTable
          { ...{ tableList, columnList, pageInfo } }
          changePageSize={ this.changePageSize }
          changePage={ this.changePage }
        />
        {materialModal && (
          <AddMaterialModal
            { ...{ materialModal, articleTitle, editInfo } }
            handelModal={ this.handelModal }
            hideCancelModal={ () =>
              this.setState({
                materialModal: false
              })
            }
          />
        )}
      </Fragment>
    )
  }
}

export default Material
