import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Form, Row, Col, Input, Button, Select } from 'antd'
import { isEmpty } from '@/lib/utils'
import { ConductSelect } from '@/utils/CommonSelect'
const { Option } = Select
const formItemLayout = {
  labelCol: {
    xs: { span: 6 }
  },
  wrapperCol: {
    xs: { span: 16 }
  }
}

class AuditSearch extends PureComponent {
  static propTypes = {
    form: PropTypes.object,
    addMarket: PropTypes.bool,
    handelSearch: PropTypes.func
  };
  handelSearch = () => {
    const { getFieldsValue } = this.props.form
    this.props.handelSearch(isEmpty(getFieldsValue()))
  };
  handleReset = () => {
    this.props.handelSearch()
    setTimeout(() => {
      this.props.form.resetFields()
    }, 0)
  };
  render () {
    const { getFieldDecorator } = this.props.form
    return (
      <Fragment>
        <Form
          { ...formItemLayout }
          layout="inline"
          className="ant-search-form"
          onSubmit={ this.handleSearch }
        >
          <Row gutter={ 10 }>
            <Col span={ 6 }>
              <Form.Item label="处理情况">
                {getFieldDecorator('state', {
                  initialValue: ''
                })(
                  <Select>
                    <Option value="" key="">
                      全部
                    </Option>
                    {Object.values(ConductSelect).map(item => (
                      <Option { ...item } key={ item.value }>
                        {item.label}
                      </Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={ 6 } style={ { textAlign: 'left', marginTop: 4 } }>
              <Button type="primary" onClick={ this.handelSearch }>
                搜索
              </Button>
              <Button style={ { marginLeft: 6 } } onClick={ this.handleReset }>
                重置
              </Button>
            </Col>
          </Row>
        </Form>
      </Fragment>
    )
  }
}
export default Form.create({})(AuditSearch)
