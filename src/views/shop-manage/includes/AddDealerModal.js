import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { BaseModal } from '@/components/common'
import { Row, Col, Form, Input, Select } from 'antd'
import { dealerRule } from './FormRule'
import { fetchDistributorAdd } from '@/api/shop'
import { getAllTrade } from '@/utils/config'
import { ToggleSelect } from '@/utils/CommonSelect'
const { Option } = Select

export class AddDealerModal extends Component {
  static propTypes = {
    editInfo: PropTypes.array,
    form: PropTypes.object,
    dealerModal: PropTypes.bool,
    handelModal: PropTypes.func,
    hideCancelModal: PropTypes.func,
    dealTitle: PropTypes.string
  };
  constructor (props) {
    super(props)
    this.state = {
      dealerModal: this.props.dealerModal,
      dealerInfo: {
        distributor: '',
        tid: null,
        address: '',
        distributorName: '',
        telephone: null,
        state: 0,
        id: ''
      },
      tradeList: []
    }
  }
  componentDidMount () {
    getAllTrade().then(res => {
      this.setState({ tradeList: res })
    })
    if (this.props.editInfo) {
      // const tradeName = this.state.tradeList.filter(item =>
      //   item.label === editInfo.tradeName ? item.vaule : ''
      // )
      // console.log(tradeName, 'tradeName')
      this.setState({
        dealerInfo: this.props.editInfo
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
        const { code } = await fetchDistributorAdd(params)
        if (code) {
          this.props.handelModal(e)
        }
      }
    })
    // this.props.handelModal(type)
  };
  hideCancelModal = _ => {
    this.props.hideCancelModal()
  };
  render () {
    const { getFieldDecorator } = this.props.form
    const { dealerInfo, tradeList } = this.state
    return (
      <BaseModal
        ModalTitle={ this.props.dealTitle }
        ModalVisible={ this.state.dealerModal }
        hideSuccessModal={ () => this.handelModal(true) }
        hideModal={ () => this.hideCancelModal() }
      >
        <Form layout={ 'vertical' }>
          <Row gutter={ 20 }>
            <Col span={ 12 }>
              <Form.Item label="经销商名称">
                {getFieldDecorator('distributor', {
                  initialValue: dealerInfo.distributor,
                  ...dealerRule.distributor
                })(<Input />)}
              </Form.Item>
            </Col>
            <Col span={ 12 }>
              <Form.Item label="所属车城">
                {getFieldDecorator('tid', {
                  initialValue: dealerInfo.tid,
                  ...dealerRule.carType
                })(
                  <Select disabled={ this.props.editInfo }>
                    {Object.values(tradeList).map(item => (
                      <Option label={ item.cname } value={ item.id } key={ item.id }>
                        {item.cname}
                      </Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={ 12 }>
              <Form.Item label="状态">
                {getFieldDecorator('state', {
                  initialValue: dealerInfo.state,
                  ...dealerRule.status
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
              <Form.Item label="地址">
                {getFieldDecorator('address', {
                  initialValue: dealerInfo.address,
                  ...dealerRule.address
                })(<Input />)}
              </Form.Item>
            </Col>
            <Col span={ 12 }>
              <Form.Item label="经销商负责人姓名">
                {getFieldDecorator('distributorName', {
                  initialValue: dealerInfo.distributorName,
                  ...dealerRule.distributorName
                })(<Input />)}
              </Form.Item>
            </Col>
            <Col span={ 12 }>
              <Form.Item label="手机号">
                {getFieldDecorator('telephone', {
                  initialValue: dealerInfo.telephone,
                  ...dealerRule.phone
                })(<Input />)}
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </BaseModal>
    )
  }
}

export default Form.create({})(AddDealerModal)
