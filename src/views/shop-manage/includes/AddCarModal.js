import React, { PureComponent } from 'react'
import { PropTypes } from 'prop-types'
import { Row, Col, Form, Input, Select } from 'antd'
import { BaseModal } from '@/components/common'
import { carRule } from './FormRule'
import { fetchTradeAdd } from '@/api/shop'
import { ToggleSelect } from '@/utils/CommonSelect'
const { Option } = Select

class AddCarModal extends PureComponent {
  static propTypes = {
    form: PropTypes.object,
    carShopModal: PropTypes.bool,
    handelModal: PropTypes.func,
    hideCancelModal: PropTypes.func,
    editInfo: PropTypes.array,
    carTitle: PropTypes.string
  };
  constructor (props) {
    super(props)
    this.state = {
      carShopModal: this.props.carShopModal,
      carInfo: {
        shopName: '',
        shopAddress: '',
        shopCharge: '',
        telephone: null,
        state: 0,
        id: '',
        password: null,
        shopContent: ''
      }
    }
  }
  componentDidMount () {
    if (this.props.editInfo) {
      this.setState({
        carInfo: this.props.editInfo
      })
    }
  }

  handelModal = e => {
    this.props.form.validateFieldsAndScroll(async (err, fieldsValue) => {
      if (!err) {
        let params = fieldsValue
        if (this.props.editInfo) {
          params = Object.assign(fieldsValue, {
            id: this.props.editInfo.id
          })
        }
        const { code } = await fetchTradeAdd(params)
        if (code) {
          this.props.handelModal(e)
        }
      }
    })
  };
  hideCancelModal = _ => {
    this.props.hideCancelModal()
  };
  render () {
    const { getFieldDecorator } = this.props.form
    const { carInfo } = this.state
    return (
      <BaseModal
        ModalTitle={ this.props.carTitle }
        ModalOk="添加"
        ModalVisible={ this.state.carShopModal }
        hideSuccessModal={ () => this.handelModal(true) }
        hideModal={ () => this.hideCancelModal() }
      >
        <Form layout={ 'vertical' }>
          <Row gutter={ 20 }>
            <Col span={ 12 }>
              <Form.Item label="商城名称">
                {getFieldDecorator('shopName', {
                  initialValue: carInfo.shopName,
                  ...carRule.shopName
                })(<Input />)}
              </Form.Item>
            </Col>
            <Col span={ 12 }>
              <Form.Item label="商城地址">
                {getFieldDecorator('shopAddress', {
                  initialValue: carInfo.shopAddress,
                  ...carRule.shopAddress
                })(<Input />)}
              </Form.Item>
            </Col>
            <Col span={ 12 }>
              <Form.Item label="状态">
                {getFieldDecorator('state', {
                  initialValue: carInfo.state,
                  ...carRule.state
                })(
                  <Select>
                    {Object.values(ToggleSelect).map(item => (
                      <Option { ...item } key={ item.value }>
                        {item.label}
                      </Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={ 12 }>
              <Form.Item label="商城负责人姓名">
                {getFieldDecorator('shopCharge', {
                  initialValue: carInfo.shopCharge,
                  ...carRule.shopCharge
                })(<Input />)}
              </Form.Item>
            </Col>
            <Col span={ 12 }>
              <Form.Item label="电话（账号）">
                {getFieldDecorator('telephone', {
                  initialValue: carInfo.telephone,
                  ...carRule.telephone
                })(<Input />)}
              </Form.Item>
            </Col>
            <Col span={ 12 }>
              <Form.Item label="密码">
                {getFieldDecorator('password', {
                  initialValue: carInfo.password,
                  ...carRule.password
                })(<Input.Password />)}
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </BaseModal>
    )
  }
}

export default Form.create({})(AddCarModal)
