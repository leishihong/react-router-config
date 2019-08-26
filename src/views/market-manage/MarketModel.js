import React, { Component, Fragment } from 'react'
import { Button, Divider, Modal, message } from 'antd'
import { BaseTable, BaseModal } from '@/components/common'
import { modelColumn } from './includes/TableColumn'
import AddModalMarket from './includes/AddModalMarket'
import { fetchMarketList, fetchMarketDel } from '@/api/market'

import MarketModelSearch from './includes/ModelSearch'
class MarketModel extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tableList: [],
      editInfo: {},
      imgShow: false,
      ImgIcon: '',
      MarketTitle: '',
      editMarket: false,
      pageInfo: {
        page: 1,
        size: 20,
        sizeCount: 0
      }
    }
    this.actionColumn = [
      {
        title: '图片',
        dataIndex: 'image',
        render: row => (
          <Button
            type="primary"
            size="small"
            onClick={ () => this.handelImg(row) }
          >
            查看
          </Button>
        )
      },
      {
        title: '操作',
        width: 140,
        align: 'center',
        render: (text, row) => (
          <Fragment>
            <Button
              type="primary"
              size="small"
              onClick={ () => this.handelEdit(text) }
            >
              编辑
            </Button>
            <Divider type="vertical" />
            <Button
              type="primary"
              size="small"
              onClick={ () => this.handelDel(text) }
            >
              删除
            </Button>
          </Fragment>
        )
      }
    ]
  }
  componentDidMount () {
    this.initMarketList()
  }
  initMarketList = async (info = {}) => {
    const params = Object.assign(info, this.state.pageInfo)
    const { code, results } = await fetchMarketList(params)
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
      ImgIcon: row
    })
  };
  handleOk = () => {
    this.setState({
      imgShow: false
    })
  };
  handelModal = () => {
    this.setState(
      {
        editMarket: false
      },
      () => {
        this.initMarketList()
      }
    )
  };
  handelEdit = row => {
    this.setState({
      editMarket: true,
      editInfo: row,
      MarketTitle: '编辑车辆'
    })
  };
  handelDel = async rows => {
    const params = { id: rows.id }
    const { code } = await fetchMarketDel(params)
    if (code) {
      this.initMarketList()
      message.success('删除成功')
    }
    // Modal.confirm({
    //   title: '提示',
    //   content: '确定删除?',
    //   okText: '确认',
    //   cancelText: '取消',
    //   onOk: () => {
    //     return new Promise((resolve, reject) => {
    //       setTimeout(Math.random() > 0.5 ? resolve : reject, 2000)
    //     }).catch(() =>
    //       this.setState({
    //         authModal: false
    //       })
    //     )
    //   },
    //   onCancel: () => {
    //     console.log('Cancel')
    //   }
    // })
  };
  changePageSize = (page, size) => {
    this.setState(
      {
        pageInfo: { size, page }
      },
      () => {
        this.initMarketList()
      }
    )
  };
  changePage = (current, page) => {
    this.setState(
      {
        pageInfo: { page: current }
      },
      () => {
        this.initMarketList()
      }
    )
  };
  render () {
    const {
      tableList,
      pageInfo,
      editMarket,
      MarketTitle,
      editInfo,
      imgShow,
      ImgIcon
    } = this.state
    const columnList = [ ...modelColumn, ...this.actionColumn ]
    return (
      <Fragment>
        <MarketModelSearch handelSearch={ this.initMarketList } />
        <BaseTable
          { ...{ pageInfo, columnList, tableList } }
          changePageSize={ this.changePageSize }
          changePage={ this.changePage }
        />
        {imgShow && (
          <BaseModal
            ModalTitle="图片查看"
            ModalWidth={ 900 }
            ModalVisible={ imgShow }
            hideModal={ this.handleOk }
            hideSuccessModal={ this.handleOk }
          >
            <img src={ ImgIcon } style={ { width: '100%', height: 600 } } />
          </BaseModal>
        )}
        {editMarket && (
          <AddModalMarket
            MarketModal={ editMarket }
            MarketTitle={ MarketTitle }
            editInfo={ editInfo }
            handelModal={ this.handelModal }
            hideCancelModal={ () =>
              this.setState({
                editMarket: false
              })
            }
          />
        )}
      </Fragment>
    )
  }
}
export default MarketModel
