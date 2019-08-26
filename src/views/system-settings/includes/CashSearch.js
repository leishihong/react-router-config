import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Row, Form, Col, Button, Select } from 'antd'
import { isEmpty } from '@/lib/utils'
import AddCashModal from './AddCashModal'

const { Option } = Select
const formItemLayout = {
  labelCol: {
    xs: { span: 6 }
  },
  wrapperCol: {
    xs: { span: 16 }
  }
}
const style = {
  align: {
    textAlign: 'left'
  },
  reset: {
    marginRight: 6,
    marginTop: 4
  }
}
class CashSearch extends PureComponent {
  static propTypes = {
    form: PropTypes.object,
    cashModal: PropTypes.bool,
    handelSearch: PropTypes.func
  };
  constructor (props) {
    super(props)
    this.state = {
      cashModal: false,
      cashTitle: ''
    }
  }
  componentDidUpdate (prevProps, prevState) {
    if (prevProps.cashModal) prevProps.form.resetFields()
  }
  handelSearch = () => {
    const { getFieldsValue } = this.props.form
    this.props.handelSearch(isEmpty(getFieldsValue()))
  };
  handelAddCash = () => {
    this.setState({
      cashModal: true,
      cashTitle: '添加保证金'
    })
  };
  handleReset = () => {
    this.props.handelSearch()
    setTimeout(() => {
      this.props.form.resetFields()
    }, 0)
  };
  handelModal = () => {
    this.setState({
      cashModal: false
    })
  };
  render () {
    const { cashModal, cashTitle } = this.state
    const { getFieldDecorator } = this.props.form
    return (
      <Fragment>
        <Form { ...formItemLayout } layout="inline" className="ant-search-form">
          <Row gutter={ 20 }>
            <Col span={ 8 }>
              <Form.Item label="状态">
                {getFieldDecorator('id', { initialValue: '' })(
                  <Select>
                    <Option label="" value="">
                      全部
                    </Option>
                    <Option label="开启" value={ 0 }>
                      开启
                    </Option>
                    <Option label="关闭" value={ 1 }>
                      关闭
                    </Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={ 16 } style={ style.align }>
              <Button
                type="primary"
                style={ style.reset }
                onClick={ this.handelSearch }
              >
                搜索
              </Button>
              <Button style={ style.reset } onClick={ this.handleReset }>
                重置
              </Button>
              <Button
                type="primary"
                style={ style.reset }
                onClick={ this.handelAddCash }
              >
                添加
              </Button>
            </Col>
          </Row>
        </Form>
        {cashModal && (
          <AddCashModal
            cashModal={ cashModal }
            cashTitle={ cashTitle }
            handelSuccessModal={ this.handelSuccessModal }
            hideCancelModal={ this.handelModal }
          />
        )}
      </Fragment>
    )
  }
}

export default Form.create({})(CashSearch)
