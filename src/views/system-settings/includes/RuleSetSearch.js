import React, { Component, Fragment } from 'react'
import { PropTypes } from 'prop-types'
import { Form, Row, Col, Button, Select } from 'antd'
import AddRuleSetModal from './AddRuleSetModal'
import { isEmpty } from '@/lib/utils'
import { ToggleSelect } from '@/utils/CommonSelect'
const { Option } = Select
const formItemLayout = {
  labelCol: {
    xs: { span: 6 }
  },
  wrapperCol: {
    xs: { span: 16 }
  }
}

class RuleSetSearch extends Component {
  static propTypes = {
    form: PropTypes.object,
    ruleSetModal: PropTypes.bool,
    handleSearch: PropTypes.func
  };
  constructor (props) {
    super(props)
    this.state = {
      ruleSetModal: false
    }
  }
  componentDidUpdate (prevProps, prevState) {
    if (prevProps.ruleSetModal) prevProps.form.resetFields()
  }
  handleSearch = () => {
    const { getFieldsValue } = this.props.form
    this.props.handleSearch(isEmpty(getFieldsValue()))
  };
  handleReset = () => {
    this.props.handleSearch()
    setTimeout(() => {
      this.props.form.resetFields()
    }, 0)
  };
  handelModal = () => {
    this.setState({
      ruleSetModal: false
    })
  };
  render () {
    const { getFieldDecorator } = this.props.form
    const { ruleSetModal } = this.state
    return (
      <Fragment>
        <Form { ...formItemLayout } layout="inline" className="ant-search-form">
          <Row gutter={ 10 }>
            <Col span={ 6 }>
              <Form.Item label="状态">
                {getFieldDecorator('state', {
                  initialValue: ''
                })(
                  <Select>
                    <Option value="" key="">
                      全部
                    </Option>
                    {Object.values(ToggleSelect).map(item => (
                      <Option { ...item } key={ item.value }>
                        {item.label}
                      </Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={ 6 } style={ { textAlign: 'left', marginTop: 4 } }>
              <Button type="primary" onClick={ this.handleSearch }>
                搜索
              </Button>
              <Button style={ { marginLeft: 6 } } onClick={ this.handleReset }>
                重置
              </Button>
              <Button
                type="primary"
                style={ { marginLeft: 6 } }
                onClick={ () =>
                  this.setState({
                    ruleSetModal: true
                  })
                }
              >
                添加
              </Button>
            </Col>
          </Row>
        </Form>
        {ruleSetModal && (
          <AddRuleSetModal
            { ...{ ruleSetModal } }
            handelModal={ this.handelModal }
            hideCancelModal={ () =>
              this.setState({
                ruleSetModal: false
              })
            }
          />
        )}
      </Fragment>
    )
  }
}

export default Form.create({})(RuleSetSearch)
