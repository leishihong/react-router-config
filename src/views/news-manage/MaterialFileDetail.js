import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Button, Divider } from 'antd'
import { BasePageHeader, BaseTable, BaseModal } from '@/components/common'
import { fetchFileAdmin, fetchFileDel } from '@/api/news'

class MaterialFileDetail extends Component {
  static propTypes = {
    form: PropTypes.object,
    location: PropTypes.object,
    cameraModal: PropTypes.bool,
    handelModal: PropTypes.func,
    hideModal: PropTypes.func
  };
  constructor (props) {
    super(props)
    this.state = {
      tableList: [],
      cameraModal: false,
      pageInfo: {
        page: 1,
        size: 20,
        sizeCount: 0
      },
      columnList: [
        {
          title: '文件名称',
          dataIndex: 'file'
        },
        {
          title: '创建时间',
          dataIndex: 'createDate'
        },
        {
          title: '修改时间',
          dataIndex: 'updateDate'
        },
        {
          title: '操作',
          fixed: 'right',
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
      ]
    }
  }
  componentDidMount () {
    console.log(this.props.location.state.id)
    this.initDetailList()
  }
  initDetailList = async () => {
    const params = Object.assign(
      { mid: this.props.location.state.id },
      this.state.pageInfo
    )
    const { code, results } = await fetchFileAdmin(params)
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
      editInfo: row
    })
  };
  handelDel = async row => {
    const { code } = await fetchFileDel({ id: row.id })
    if (code) {
      this.initDetailList()
    }
  };
  // 分页改变
  changePageSize = (page, size) => {
    this.setState(
      {
        pageInfo: { size, page }
      },
      () => {
        this.initDetailList()
      }
    )
  };
  changePage = (current, page) => {
    this.setState(
      {
        pageInfo: { page: current }
      },
      () => {
        this.initDetailList()
      }
    )
  };
  render () {
    const { tableList, columnList, cameraModal, pageInfo } = this.state
    return (
      <Fragment>
        <BasePageHeader
          extraInfo={
            <Button
              type="primary"
              onClick={ () =>
                this.setState({
                  cameraModal: true
                })
              }
            >
              添加
            </Button>
          }
        >
          <BaseTable
            { ...{ tableList, columnList, pageInfo } }
            changePageSize={ this.changePageSize }
            changePage={ this.changePage }
          ></BaseTable>
        </BasePageHeader>
      </Fragment>
    )
  }
}

export default MaterialFileDetail
