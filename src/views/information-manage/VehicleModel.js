import React, { Component, Fragment } from 'react'
import { Button, Divider } from 'antd'
import { BaseTable, BaseModal } from '@/components/common'
import { modelColumn } from './includes/TableColumn.js'
import AddModelModal from './includes/AddModelModal'
import ModelSearch from './includes/ModelSearch'
import { fetchVehicle } from '@/api/info'

export class VehicleModel extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tableList: [],
      editInfo: {},
      modelTitle: '',
      editModel: false,
      imgShow: false,
      imgInfo: '',
      pageInfo: {
        page: 1,
        size: 20,
        sizeCount: 0
      }
    }
    this.actionColumn = [
      {
        title: 'APP图片（大图）',
        dataIndex: 'vappImage',
        render: (row, data) => (
          <Button size="small" type="link" onClick={ () => this.handelImg(row) }>
            查看
          </Button>
        )
      },
      {
        title: '操作',
        width: 80,
        align: 'center',
        render: (row, data) => (
          <Fragment>
            <Button
              size="small"
              type="primary"
              onClick={ () => this.handelEdit(row) }
            >
              编辑
            </Button>
            {/* <Divider type="vertical" />
            <Button
              size="small"
              type="primary"
              onClick={ () => this.handelDel(row) }
            >
              删除
            </Button> */}
          </Fragment>
        )
      }
    ]
  }
  componentDidMount () {
    this.initModelList()
  }
  initModelList = async (info = {}) => {
    const params = Object.assign(info, this.pageInfo)
    const { code, results } = await fetchVehicle(params)
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
  handelImg = row => {
    this.setState({
      imgShow: true,
      imgInfo: row
    })
  };
  handelImgHide = () => {
    this.setState({
      imgShow: false
    })
  };
  handelEdit = row => {
    this.setState({
      editInfo: row,
      editModel: true,
      modelTitle: '编辑车型'
    })
  };
  handelDel = row => {};
  handelModal = () => {
    this.setState(
      {
        editModel: false
      },
      () => {
        this.initModelList()
      }
    )
  };
  changePageSize = (page, size) => {
    this.setState(
      {
        pageInfo: { size, page }
      },
      () => {
        this.initModelList()
      }
    )
  };
  changePage = (current, page) => {
    this.setState(
      {
        pageInfo: { page: current }
      },
      () => {
        this.initModelList()
      }
    )
  };
  render () {
    const { tableList, pageInfo, imgShow, imgInfo } = this.state
    const columnList = [ ...modelColumn, ...this.actionColumn ]
    return (
      <Fragment>
        <ModelSearch handelSearch={ this.initModelList } />
        <BaseTable
          { ...{ pageInfo, columnList, tableList } }
          changePageSize={ this.changePageSize }
          changePage={ this.changePage }
        />
        {imgShow && (
          <BaseModal
            ModalTitle="查看图片"
            ModalWidth={ 900 }
            ModalVisible={ imgShow }
            hideSuccessModal={ this.handelImgHide }
            hideModal={ this.handelImgHide }
          >
            <img style={ { width: '100%', height: 600 } } src={ imgInfo } />
          </BaseModal>
        )}
        {this.state.editModel && (
          <AddModelModal
            modelTitle={ this.state.modelTitle }
            modelModal={ this.state.editModel }
            editInfo={ this.state.editInfo }
            handelModal={ type => this.handelModal(type) }
            hideCancelModal={ _ =>
              this.setState({
                editModel: false
              })
            }
          />
        )}
      </Fragment>
    )
  }
}

export default VehicleModel
