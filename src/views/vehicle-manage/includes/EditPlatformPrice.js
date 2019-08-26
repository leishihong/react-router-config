import React, { PureComponent, Fragment } from 'react'
import { PropTypes } from 'prop-types'
import moment from 'moment'
import { Row, Col, Radio, Form, Input, Select, DatePicker } from 'antd'
import { BaseModal } from '@/components/common'
import { fetchCarEditPlatformPrice } from '@/api/vehicle'

class EditPlatformPrice extends PureComponent {
  static propTypes = {
    form: PropTypes.object,
    platformModal: PropTypes.bool,
    handelModal: PropTypes.func,
    hideCancelModal: PropTypes.func,
    editInfo: PropTypes.array,
    completeTitle: PropTypes.string
  };
  constructor (props) {
    super(props)
    this.state = {
      platformInfo: { type: 1, price: '' }
    }
  }
  handelModal = () => {
    this.props.form.validateFieldsAndScroll(async (err, fieldsValue) => {
      if (!err) {
        const { code } = await fetchCarEditPlatformPrice(fieldsValue)
        if (code) {
          this.props.handelModal()
        }
      }
    })
  };
  hideCancelModal = _ => {
    this.props.hideCancelModal()
  };
  render () {
    const optionsType = [
      {
        label: '价格',
        value: 1
      },
      {
        label: '点数',
        value: 2
      }
    ]
    const { getFieldDecorator } = this.props.form
    const { platformInfo } = this.state
    return (
      <Fragment>
        <BaseModal
          ModalTitle="统一上调价格"
          ModalVisible={ this.props.platformModal }
          hideSuccessModal={ () => this.handelModal(true) }
          hideModal={ () => this.hideCancelModal() }
        >
          <Form layout={ 'vertical' }>
            <Form.Item label="类型">
              {getFieldDecorator('type', {
                initialValue: platformInfo.price
              })(<Radio.Group options={ optionsType } />)}
            </Form.Item>
            <Form.Item label="数值">
              {getFieldDecorator('price', {
                initialValue: platformInfo.price,
                rules: [
                  {
                    required: true,
                    message: '价格不能为空'
                  }
                ]
              })(<Input addonAfter="万元/点数" />)}
            </Form.Item>
          </Form>
        </BaseModal>
      </Fragment>
    )
  }
}

export default Form.create({})(EditPlatformPrice)
