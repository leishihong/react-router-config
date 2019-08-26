import React, { PureComponent } from 'react'
import { Form, Row, Col, Input, Button, Icon, DatePicker, Select } from 'antd'
import { PropTypes } from 'prop-types'
import { isEmpty } from '@/lib/utils'
import { stradeSelect } from '@/utils/CommonSelect'
import { fetchDistributorAll, fetchYeWu } from '@/api/common'
// const { RangePicker } = DatePicker
const { Option } = Select

export class OrderRecordSearch extends PureComponent {
  static propTypes = {
    form: PropTypes.array,
    handleSearch: PropTypes
  };
  constructor (props) {
    super(props)
    this.state = {
      expand: false,
      disList: [],
      yeWu: []
    }
  }
  componentDidMount () {
    this.distributorAll()
    this.fetchYeWu()
  }
  distributorAll = async () => {
    const { code, results } = await fetchDistributorAll()
    if (code) {
      this.setState({
        disList: results
      })
    }
  };
  fetchYeWu = async () => {
    const { code, results } = await fetchYeWu()
    if (code) {
      this.setState({
        yeWu: results
      })
    }
  };
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
  onChange (date, dateString) {
    console.log(date, dateString)
  }

  render () {
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: {
        xs: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 16 }
      }
    }
    const { disList, yeWu } = this.state
    return (
      <div>
        <Form { ...formItemLayout } layout="inline" className="ant-search-form">
          <Row gutter={ 10 }>
            <Col span={ 6 }>
              <Form.Item label="ID">
                {getFieldDecorator('id')(<Input />)}
              </Form.Item>
            </Col>
            <Col span={ 6 }>
              <Form.Item label="买家信息">
                {getFieldDecorator('buyMessage')(<Input />)}
              </Form.Item>
            </Col>
            <Col span={ 6 }>
              <Form.Item label="卖家信息">
                {getFieldDecorator('saleMessage')(<Input />)}
              </Form.Item>
            </Col>
            {/* <Col span={ 6 }>
              <Form.Item label="创建时间">
                {getFieldDecorator('id')(
                  <RangePicker onChange={ this.onChange } />
                )}
              </Form.Item>
            </Col> */}
            <Col span={ 6 }>
              <Form.Item label="下单状态">
                {getFieldDecorator('state', {
                  initialValue: ''
                })(
                  <Select>
                    <Option value="" key="">
                      全部
                    </Option>
                    <Option value={ 0 }>待支付</Option>
                    <Option value={ 1 }>成功</Option>
                    <Option value={ -1 }>失败</Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={ 6 }>
              <Form.Item label="平台/车城">
                {getFieldDecorator('isTrade', { initialValue: '' })(
                  <Select onChange={ this.onChange }>
                    <Option value="">全部</Option>
                    {Object.values(stradeSelect).map(item => (
                      <Option { ...item } key={ item.value }>
                        {item.label}
                      </Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={ 6 }>
              <Form.Item label="经销商">
                {getFieldDecorator('did', { initialValue: '' })(
                  <Select onChange={ this.onChange }>
                    <Option label="" value="">
                      全部
                    </Option>
                    {Object.values(disList).map(item => (
                      <Option label={ item.cname } { ...item } key={ item.id }>
                        {item.cname}
                      </Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={ 6 }>
              <Form.Item label="业务员">
                {getFieldDecorator('sid', { initialValue: '' })(
                  <Select onChange={ this.onChange }>
                    <Option label="" value="">
                      全部
                    </Option>
                    {Object.values(yeWu).map(item => (
                      <Option label={ item.cname } { ...item } key={ item.id }>
                        {item.cname}
                      </Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={ 24 } style={ { textAlign: 'right' } }>
              <Button type="primary" onClick={ this.handleSearch }>
                搜索
              </Button>
              <Button style={ { marginLeft: 8 } } onClick={ this.handleReset }>
                重置
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    )
  }
}

export default Form.create({})(OrderRecordSearch)
