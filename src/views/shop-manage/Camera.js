import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Button, Tag, Row, Col, Form, Input } from 'antd'
import { BasePageHeader, BaseTable, BaseModal } from '@/components/common'
import { cameraRule } from './includes/FormRule'
import { fetchTradeCamera, fetchCameraAdd, fetchCameraDel } from '@/api/shop'

class cameraForm extends Component {
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
      cameraInfo: {
        cameraAddress: '',
        cameraName: ''
      },
      cameraModal: this.props.cameraModal
    }
  }

  handelModal = () => {
    this.props.form.validateFieldsAndScroll(async (err, fieldsValue) => {
      if (!err) {
        const { code, results } = await fetchCameraAdd(
          Object.assign({ tid: this.props.location.state.id }, fieldsValue)
        )
        if (code) {
          this.props.handelModal()
        }
      }
    })
  };
  hideModal = () => {
    this.props.hideModal()
  };
  render () {
    const { getFieldDecorator } = this.props.form
    const { cameraInfo, cameraModal } = this.state
    return (
      <BaseModal
        ModalTitle="添加摄像头"
        ModalVisible={ cameraModal }
        hideSuccessModal={ () => this.handelModal(true) }
        hideModal={ () => this.hideModal() }
      >
        <Form layout={ 'vertical' }>
          <Row gutter={ 20 }>
            <Col span={ 24 }>
              <Form.Item label="摄像头名称">
                {getFieldDecorator('cameraName', {
                  initialValue: cameraInfo.cameraName,
                  ...cameraRule.name
                })(<Input></Input>)}
              </Form.Item>
            </Col>
            <Col span={ 24 }>
              <Form.Item label="地址">
                {getFieldDecorator('cameraAddress', {
                  initialValue: cameraInfo.cameraAddress,
                  ...cameraRule.url
                })(<Input></Input>)}
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </BaseModal>
    )
  }
}
const AddCameraModal = Form.create()(cameraForm)

class Camera extends Component {
  static propTypes = {
    location: PropTypes.object
  };
  constructor (props) {
    super(props)
    this.state = {
      cameraModal: false,
      pageInfo: {
        page: 1,
        size: 20,
        sizeCount: 0
      },
      tableList: [],
      columnList: [
        {
          title: '摄像头描述',
          dataIndex: 'cameraName'
        },
        {
          title: '地址',
          dataIndex: 'cameraAddress',
          render: (row, data) => (
            <a href={ row } target="_blank">
              <Tag color="blue">{row}</Tag>
            </a>
          )
        },
        {
          title: '操作',
          align: 'center',
          width: 90,
          render: (row, data) => {
            return (
              <Button
                size="small"
                type="danger"
                onClick={ () => this.handelDel(row) }
              >
                删除
              </Button>
            )
          }
        }
      ]
    }
  }
  componentDidMount () {
    this.initCamera()
  }
  initCamera = async () => {
    const params = {
      tid: this.props.location.state.id
    }
    const { code, results } = await fetchTradeCamera(params)
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
  handelModal = () => {
    this.setState(
      {
        cameraModal: false
      },
      () => {
        this.initCamera()
      }
    )
  };
  // 删除数据
  handelDel = async rows => {
    const params = {
      id: rows.id
    }
    const { code } = await fetchCameraDel(params)
    if (code) {
      this.initCamera()
    }
  };
  // 分页改变
  changePageSize = (page, size) => {
    this.setState(
      {
        pageInfo: { size, page }
      },
      () => {
        this.initCamera()
      }
    )
  };
  changePage = (current, page) => {
    this.setState(
      {
        pageInfo: { page: current }
      },
      () => {
        this.initCamera()
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
        {cameraModal && (
          <AddCameraModal
            { ...{ cameraModal } }
            { ...this.props }
            handelModal={ this.handelModal }
            hideModal={ () =>
              this.setState({
                cameraModal: false
              })
            }
          />
        )}
      </Fragment>
    )
  }
}

export default Camera
