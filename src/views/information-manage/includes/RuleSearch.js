import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Row, Form, Col, Input, Button, Divider, Select } from 'antd'
import AddRuleModal from './AddRuleModal'
import { ValidSelect } from '@/utils/CommonSelect'
import { isEmpty } from '@/lib/utils'

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
    textAlign: 'left',
    marginTop: 4
  },
  reset: {
    marginRight: 6
  }
}

class RuleSearch extends PureComponent {
  static propTypes = {
    form: PropTypes.object,
    handleSearch: PropTypes.func,
    handelModal: PropTypes.func,
    ruleModal: PropTypes.func
  };
  constructor (props) {
    super(props)
    this.state = {
      ruleModal: false,
      searchInfo: {
        id: '',
        state: '',
        brand: ''
      },
      ruleTitle: ''
    }
  }
  componentDidUpdate (prevProps, prevState) {
    if (prevProps.ruleModal) prevProps.form.resetFields()
  }
  handelSearch = () => {
    const { getFieldsValue } = this.props.form
    this.props.handleSearch(isEmpty(getFieldsValue()))
  };
  handelResets = () => {
    this.props.handleSearch()
    setTimeout(() => {
      this.props.form.resetFields()
    }, 0)
  };
  handelRule = () => {
    this.setState({
      ruleModal: true,
      ruleTitle: '添加车规'
    })
  };
  hideCancelModal = () => {
    this.setState({
      ruleModal: false
    })
  };
  handelModal = e => {
    this.setState(
      {
        ruleModal: false
      },
      () => {
        this.props.handleSearch()
      }
    )
  };
  render () {
    const { getFieldDecorator } = this.props.form
    const { ruleModal, ruleTitle } = this.state
    return (
      <Fragment>
        <Form { ...formItemLayout } layout="inline" className="ant-search-form">
          <Row gutter={ 20 }>
            <Col span={ 6 }>
              <Form.Item label="ID">
                {getFieldDecorator('id', {
                  initialValue: ''
                })(<Input />)}
              </Form.Item>
            </Col>
            <Col span={ 6 }>
              <Form.Item label="关键字">
                {getFieldDecorator('gaugeName', {
                  initialValue: ''
                })(<Input />)}
              </Form.Item>
            </Col>
            <Col span={ 6 }>
              <Form.Item label="状态">
                {getFieldDecorator('state', {
                  initialValue: ''
                })(
                  <Select>
                    <Option value="" key="">
                      全部
                    </Option>
                    {Object.values(ValidSelect).map(item => {
                      return <Option { ...item }>{item.label}</Option>
                    })}
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={ 6 } style={ style.align }>
              <Button
                type="primary"
                style={ style.reset }
                onClick={ this.handelSearch }
              >
                搜索
              </Button>
              <Button style={ style.reset } onClick={ this.handelResets }>
                重置
              </Button>
              <Button type="primary" onClick={ this.handelRule }>
                添加
              </Button>
            </Col>
          </Row>
        </Form>
        {ruleModal && (
          <AddRuleModal
            { ...{ ruleModal, ruleTitle } }
            handelModal={ this.handelModal }
            hideCancelModal={ this.hideCancelModal }
          />
        )}
      </Fragment>
    )
  }
}
export default Form.create()(RuleSearch)
