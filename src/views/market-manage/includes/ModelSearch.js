import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Form, Row, Col, Input, Button, Select } from 'antd'
import { isEmpty } from '@/lib/utils'
import { ValidSelect } from '@/utils/CommonSelect'
import {
  getBrandSelectAll,
  getAuditSelectAll,
  getGaugeSelectAll
} from '@/utils/config'
import AddModalMarket from './AddModalMarket'
const { Option } = Select
const formItemLayout = {
  labelCol: {
    xs: { span: 6 }
  },
  wrapperCol: {
    xs: { span: 16 }
  }
}

export class MarketModelSearch extends PureComponent {
  static propTypes = {
    form: PropTypes.object,
    addMarket: PropTypes.bool,
    handelSearch: PropTypes.func
  };
  constructor (props) {
    super(props)
    this.state = {
      addMarket: false,
      MarketTitle: '',
      brandList: [],
      gaugeList: [],
      auditList: [],
      searchInfo: { id: null, shopBName: '', state: null }
    }
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevProps.addMarket) prevProps.form.resetFields()
  }
  componentDidMount () {
    getBrandSelectAll().then(res => {
      this.setState({
        brandList: res
      })
    })
    getAuditSelectAll().then(res => {
      this.setState({
        auditList: res
      })
    })
    getGaugeSelectAll().then(res => {
      this.setState({
        gaugeList: res
      })
    })
  }
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
  handelModal = () => {
    this.setState(
      {
        addMarket: false
      },
      () => {
        this.props.handelSearch()
      }
    )
  };

  render () {
    const { getFieldDecorator } = this.props.form
    const {
      addMarket,
      brandList,
      auditList,
      gaugeList,
      MarketTitle
    } = this.state
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
              <Form.Item label="ID">
                {getFieldDecorator('id', { initialValue: null })(<Input />)}
              </Form.Item>
            </Col>
            <Col span={ 6 }>
              <Form.Item label="品牌名">
                {getFieldDecorator('bid', { initialValue: '' })(
                  <Select>
                    <Option value="" key="">
                      全部
                    </Option>
                    {Object.values(brandList).map(item => (
                      <Option label={ item.cname } value={ item.id }>
                        {item.cname}
                      </Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={ 6 }>
              <Form.Item label="车系名">
                {getFieldDecorator('vid', { initialValue: '' })(
                  <Select>
                    <Option value="" key="">
                      全部
                    </Option>
                    {Object.values(auditList).map(item => (
                      <Option label={ item.cname } value={ item.id }>
                        {item.cname}
                      </Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={ 6 }>
              <Form.Item label="车型名">
                {getFieldDecorator('aid', { initialValue: '' })(
                  <Select>
                    <Option value="" key="">
                      全部
                    </Option>
                    {Object.values(gaugeList).map(item => (
                      <Option label={ item.cname } value={ item.id }>
                        {item.cname}
                      </Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={ 6 }>
              <Form.Item label="创建者">
                {getFieldDecorator('createPerson')(<Input />)}
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
                    {Object.values(ValidSelect).map(item => (
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
              <Button
                type="primary"
                style={ { marginLeft: 6 } }
                onClick={ () =>
                  this.setState({
                    addMarket: true,
                    MarketTitle: '添加车辆'
                  })
                }
              >
                添加
              </Button>
            </Col>
          </Row>
        </Form>
        {addMarket && (
          <AddModalMarket
            MarketModal={ addMarket }
            MarketTitle={ MarketTitle }
            handelModal={ this.handelModal }
            hideCancelModal={ () =>
              this.setState({
                addMarket: false
              })
            }
          />
        )}
      </Fragment>
    )
  }
}

export default Form.create({})(MarketModelSearch)
