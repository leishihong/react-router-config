import React, { Component, Fragment } from 'react'
import { Divider, Modal, Button, Checkbox } from 'antd'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import CarCitySearch from './includes/CarCitySearch'
import { BaseTable, BaseModal } from '@/components/common'
import { shopColumnList } from './includes/TableColumn.js'

import AddCarModal from './includes/AddCarModal'
import { isEmpty } from '@/lib/utils'

import Main from '../../Main'
import { fetchShopList, fetchTradeAll, fetchTradeAuth } from '@/api/shop'

class CarCity extends Component {
  static propTypes = {};
  constructor (props) {
    super(props)
    this.state = {
      authModal: false, // 是否开启授权
      editCarModal: false,
      carTitle: '',
      editInfo: {
        shopName: '',
        shopAddress: '',
        shopCharge: '',
        telephone: '',
        state: '',
        id: '',
        password: '',
        shopContent: ''
      },
      tableList: [],
      carTradeList: [],
      authList: [],
      carId: null,
      pageInfo: {
        page: 1,
        size: 20,
        sizeCount: 0
      },
      shopColumnList
    }
    this.actionList = [
      {
        title: '操作',
        key: 'action',
        align: 'center',
        fixed: 'right',
        width: 140,
        render: (text, record) => (
          <Fragment>
            <Button
              size="small"
              type="primary"
              onClick={ () => this.handelEdit(text) }
            >
              编辑
            </Button>
            <Divider type="vertical" />
            <Button
              size="small"
              type="primary"
              onClick={ () => this.handelAuthCar(text) }
            >
              授权
            </Button>
          </Fragment>
        )
      }
    ]
  }
  handelEdit = row => {
    this.setState({
      editCarModal: true,
      editInfo: row
    })
    console.log(this.refs.car)
  };
  handelAuthCar = async row => {
    const { code, results } = await fetchTradeAll()
    if (code) {
      results.map(item => {
        item.label = item.cname
        item.value = item.id
      })
      this.setState({
        carTradeList: results,
        carId: row,
        authModal: true,
        carTitle: '编辑商城'
      })
    }
  };
  handelAddModal = () => {
    this.setState(
      {
        editCarModal: false
      },
      () => {
        this.initList()
      }
    )
  };
  cardBtn = type => {
    console.log(type)
  };
  componentDidMount () {
    this.initList()
  }
  initList = async (info = {}) => {
    const params = Object.assign(info, this.state.pageInfo)
    const { code, results } = await fetchShopList(params)
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
  handelCarChange = val => {
    this.setState({
      authList: val
    })
  };
  handelModal = type => {
    if (this.state.authList && this.state.authList.length > 0) {
      this.setAuthCar()
    } else {
      Modal.alert({
        title: '提示',
        content: '请选泽授权车城'
      })
      return false
    }
    // if (type) {
    //   Modal.confirm({
    //     title: '提示',
    //     content: '确定授权车城吗？',
    //     okText: '确认',
    //     cancelText: '取消',
    //     onOk: () => {
    //       return new Promise((resolve, reject) => {
    //         setTimeout(Math.random() > 0.5 ? resolve : reject, 2000)
    //       }).catch(() =>
    //         this.setState({
    //           authModal: false
    //         })
    //       )
    //     },
    //     onCancel: () => {
    //       console.log('Cancel')
    //     }
    //   })
    // }
  };
  setAuthCar = async () => {
    const params = { ids: this.state.authList, id: this.state.carId.id }
    const { code } = await fetchTradeAuth(params)
    if (code) {
      this.setState(
        {
          authModal: false
        },
        () => {
          this.initList()
        }
      )
    }
  };

  changePageSize = (page, size) => {
    this.setState(
      {
        pageInfo: { size, page }
      },
      () => {
        this.initList()
      }
    )
  };
  changePage = (current, page) => {
    this.setState(
      {
        pageInfo: { page: current }
      },
      () => {
        this.initList()
      }
    )
  };
  render () {
    const {
      tableList,
      authModal,
      pageInfo,
      editCarModal,
      editInfo,
      carTradeList,
      carTitle
    } = this.state
    const columnList = [ ...shopColumnList, ...this.actionList ]
    return (
      <Fragment>
        <Main>
          <CarCitySearch handelSearch={ this.initList } />
          <BaseTable
            { ...{ pageInfo, columnList, tableList } }
            changePageSize={ this.changePageSize }
            changePage={ this.changePage }
            ref="car"
          />
          <BaseModal
            ModalTitle={ '授权车城' }
            ModalVisible={ authModal }
            hideSuccessModal={ () => this.handelModal(true) }
            hideModal={ () =>
              this.setState({
                authModal: false
              })
            }
          >
            <Checkbox.Group
              options={ carTradeList }
              onChange={ this.handelCarChange }
            />
          </BaseModal>
        </Main>
        {editCarModal && (
          <AddCarModal
            editInfo={ editInfo }
            carTitle={ carTitle }
            carShopModal={ editCarModal }
            handelModal={ this.handelAddModal }
            hideCancelModal={ _ =>
              this.setState({
                editCarModal: false
              })
            }
          />
        )}

        {/* {this.props.children} */}
      </Fragment>
    )
  }
}

export default CarCity
