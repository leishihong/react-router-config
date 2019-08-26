import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { BaseModal } from '@/components/common'
import { Row, Col, Form, Input, Select, Button, Icon, Modal } from 'antd'
import { cashRule } from './FromRule'
import { fetchDepositAdd, fetchDepositEdit } from '@/api/system'
import './cash.less'
const id = 0

class AddCashModal extends PureComponent {
  static propTypes = {
    form: PropTypes.object,
    editInfo: PropTypes.array,
    cashModal: PropTypes.bool,
    cashTitle: PropTypes.bool,
    handelSuccessModal: PropTypes.func,
    hideCancelModal: PropTypes.func
  };
  constructor (props) {
    super(props)
    this.state = {
      cashInfo: {
        name: '',
        state: '',
        list: [
          { aroundStart: 0, aroundEnd: '23', aroundDollar: '2223' },
          { aroundStart: '23', aroundEnd: '213', aroundDollar: '123' },
          { aroundStart: '213', aroundEnd: '23', aroundDollar: '23' }
        ]
      },
      formList: [
        {
          aroundStart: 0,
          aroundDollar: '',
          aroundEnd: null
        }
      ]
    }
  }
  componentDidMount () {
    if (this.props.editInfo) {
      this.setState({
        cashInfo: this.props.editInfo
      })
    }
  }

  handelSuccess = e => {
    console.log(this.state)
    this.props.form.validateFieldsAndScroll(async (err, fieldsValue) => {
      if (!err) {
        if (this.props.editInfo) {
          const params = fieldsValue
          params.id = this.props.editInfo.id
          const { code } = await fetchDepositEdit(fieldsValue)
          if (code) {
            this.props.handelSuccessModal(e)
          }
        } else {
          const { code } = await fetchDepositAdd(fieldsValue)
          if (code) {
            this.props.handelSuccessModal(e)
          }
        }
      }
    })
  };
  remove = (ele, ind) => {
    console.log(ind, 'll')
    var formList = [ ...this.state.formList ]
    formList.splice(ind, 1)
    this.setState({
      formList
    })
  };

  add = (ele, index) => {
    if (!ele.aroundEnd) {
      Modal.confirm({
        title: '提示',
        content: '请填入结束范围'
      })
      return false
    } else if (!ele.aroundDollar) {
      Modal.confirm({
        title: '提示',
        content: '请填入保证金'
      })
      return false
    }
    const formList = this.state.formList.concat([
      {
        aroundStart: this.state.formList[ index ].aroundEnd,
        aroundDollar: '',
        aroundEnd: null
      }
    ])
    this.setState({
      formList
    })
  };
  handelAround = (event, ele, ind) => {
    const { value } = event.target
    ele.aroundEnd = value
    this.state.formList[ ind ] = ele
    const formList = this.state.formList
    this.setState({
      formList
    })
  };
  handelAroundDollar = (event, ele, ind) => {
    const { value } = event.target
    ele.aroundDollar = value
    this.state.formList[ ind ] = ele
    const formList = this.state.formList
    this.setState({
      formList
    })
  };
  render () {
    const { formList, cashInfo } = this.state
    const { getFieldDecorator } = this.props.form

    return (
      <BaseModal
        ModalWidth={ 1200 }
        ModalTitle={ this.props.cashTitle }
        ModalVisible={ this.props.cashModal }
        hideSuccessModal={ this.handelSuccess }
        hideModal={ () => this.props.hideCancelModal() }
      >
        <Form layout={ 'vertical' }>
          <Row gutter={ 20 }>
            <Col span={ 8 }>
              <Form.Item label="保证金组名称">
                {getFieldDecorator('name', {
                  initialValue: cashInfo.name,
                  ...cashRule.name
                })(<Input />)}
              </Form.Item>
            </Col>
            <Col span={ 8 }>
              <Form.Item label="状态">
                {getFieldDecorator('state', {
                  initialValue: cashInfo.state,
                  ...cashRule.state
                })(
                  <Select>
                    <Option value={ 0 }>开启</Option>
                    <Option value={ 1 }>禁用</Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
            {/* <Col span={ 8 }>
              <Form.Item>
                <Button
                  type="primary"
                  style={ { marginTop: 28 } }
                  onClick={ this.add }
                >
                  <Icon type="plus" /> 增加范围
                </Button>
              </Form.Item>
            </Col> */}
          </Row>
          {/* <Row gutter={ 20 } className="cash">
            {formItems}
          </Row> */}
          <Row gutter={ 20 } className="cash">
            {formList && formList.length > 0 ?
              formList.map((ele, index) => (
                <Col>
                  <Col span={ 16 } style={ { marginBottom: 20 } }>
                    <Col span={ 12 }>
                      <Input
                          defaultValue={ ele.aroundStart }
                          addonBefore="范围"
                          addonAfter="元"
                          disabled
                          style={ { width: '94%' } }
                        />
                    </Col>
                    <Col span={ 12 }>
                      <Input
                          min={ 0 }
                          defaultValue={ ele.aroundEnd }
                          onChange={ e => this.handelAround(e, ele, index) }
                          addonAfter="元"
                          placeholder="∞"
                          style={ { width: '94%' } }
                        />
                    </Col>
                  </Col>
                  <Col span={ 6 } style={ { marginBottom: 20 } }>
                    <Input
                        addonBefore="保证金"
                        addonAfter="元"
                        defaultValue={ ele.aroundDollar }
                        onChange={ e => this.handelAroundDollar(e, ele, index) }
                        style={ { width: '92%' } }
                      />
                  </Col>
                  <Col span={ 2 } style={ { marginTop: 4 } }>
                    {index === formList.length - 1 ? (
                      <Fragment>
                        <Button
                            shape="circle"
                            size="small"
                            icon="plus"
                            type="primary"
                            onClick={ () => this.add(ele, index) }
                          />
                        {index !== 0 ? (
                          <Button
                              shape="circle"
                              size="small"
                              icon="minus"
                              style={ { marginLeft: 4 } }
                              onClick={ () => this.remove(ele, index) }
                            />
                          ) : null}
                      </Fragment>
                      ) : null}
                  </Col>
                </Col>
                )) :
              null}
          </Row>
        </Form>
      </BaseModal>
    )
  }
}

export default Form.create({})(AddCashModal)
