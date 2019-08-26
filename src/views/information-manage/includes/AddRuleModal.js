import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { Row, Form, Col, Input, Select, InputNumber } from 'antd'
import { BaseModal } from '@/components/common'
import { vehicleRule } from './FormRule'
import { fetchGaugeAdd } from '@/api/info'
import { ValidSelect } from '@/utils/CommonSelect'
const { Option } = Select

class AddRuleModal extends Component {
  static propTypes = {
    form: PropTypes.object,
    editInfo: PropTypes.array,
    ruleModal: PropTypes.bool,
    ruleTitle: PropTypes.string,
    handelModal: PropTypes.func,
    hideCancelModal: PropTypes.func
  };
  constructor (props) {
    super(props)
    this.state = {
      ruleInfo: {
        id: '',
        gaugeName: '',
        state: 1,
        sortNum: ''
      }
    }
  }
  componentDidMount () {
    if (this.props.editInfo) {
      this.setState({
        ruleInfo: Object.assign({}, this.props.editInfo)
      })
    }
  }
  handelModal = () => {
    this.props.form.validateFieldsAndScroll(async (err, fieldsValue) => {
      if (!err) {
        let params = fieldsValue
        if (this.props.editInfo) {
          params = Object.assign(fieldsValue, {
            id: this.props.editInfo.id
          })
        }
        const { code } = await fetchGaugeAdd(params)
        if (code) {
          this.props.handelModal()
        }
      }
    })
  };
  hideCancelModal = () => {
    this.props.hideCancelModal()
  };

  render () {
    const { getFieldDecorator } = this.props.form
    const { ruleInfo } = this.state
    return (
      <div>
        <BaseModal
          ModalTitle={ this.props.ruleTitle }
          ModalVisible={ this.props.ruleModal }
          hideSuccessModal={ () => this.handelModal(true) }
          hideModal={ () => this.hideCancelModal() }
        >
          <Form layout={ 'vertical' }>
            <Row gutter={ 20 }>
              <Col span={ 8 }>
                <Form.Item label="车规名称">
                  {getFieldDecorator('gaugeName', {
                    initialValue: ruleInfo.gaugeName,
                    ...vehicleRule.gaugeName
                  })(<Input />)}
                </Form.Item>
              </Col>
              <Col span={ 8 }>
                <Form.Item label="排序编号">
                  {getFieldDecorator('sortNum', {
                    initialValue: ruleInfo.sortNum,
                    ...vehicleRule.sortNum
                  })(<InputNumber style={ { width: '100%' } } min={ 0 } />)}
                </Form.Item>
              </Col>
              <Col span={ 8 }>
                <Form.Item label="状态">
                  {getFieldDecorator('state', {
                    initialValue: ruleInfo.state,
                    ...vehicleRule.state
                  })(
                    <Select>
                      {Object.values(ValidSelect).map(item => (
                        <Option { ...item } key={ item.value }>
                          {item.label}
                        </Option>
                      ))}
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </BaseModal>
      </div>
    )
  }
}

export default Form.create({})(AddRuleModal)
