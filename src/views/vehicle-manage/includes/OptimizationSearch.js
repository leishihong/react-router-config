import React, { PureComponent, Fragment } from 'react'
import { Form, Row, Col, Input, Button, Select, DatePicker } from 'antd'
import AddOptimizationModal from './AddOptimizationModal'
import { PropTypes } from 'prop-types'
import { isEmpty } from '@/lib/utils'
import {
  ToggleSelect,
  statusSelect,
  salesStates,
  ValidSelect,
  stradeSelect
} from '@/utils/CommonSelect'
import {
  getBrandSelectAll,
  getAuditSelectAll,
  getGaugeSelectAll,
  getGuageAll,
  getDistSelectAll,
  getYeWuSelect
} from '@/utils/config'
const { Option } = Select
const { RangePicker } = DatePicker

const formItemLayout = {
  labelCol: {
    xs: { span: 6 }
  },
  wrapperCol: {
    xs: { span: 16 }
  }
}

class OptimizationSearch extends PureComponent {
  static propTypes = {
    form: PropTypes.object,
    completeModal: PropTypes.bool,
    handelSearch: PropTypes.func
  };
  constructor (props) {
    super(props)
    this.state = {
      brandList: [],
      gaugeList: [],
      auditList: [],
      guageAllList: [],
      disList: [],
      yeWuList: [],
      completeModal: false,
      searchInfo: { id: null, shopBName: '', state: null }
    }
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
    getGuageAll().then(res => {
      this.setState({
        guageAllList: res.data
      })
    })
    getDistSelectAll().then(res => {
      this.setState({
        disList: res
      })
    })
    getYeWuSelect().then(res => {
      this.setState({
        yeWuList: res
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
  handelModal = type => {
    console.log(2323)
    if (type) {
      this.setState({
        completeModal: false
      })
    }
  };

  render () {
    const { getFieldDecorator } = this.props.form
    const {
      searchInfo,
      completeTitle,
      brandList,
      auditList,
      gaugeList,
      guageAllList,
      disList,
      yeWuList
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
                {getFieldDecorator('id')(<Input />)}
              </Form.Item>
            </Col>
            <Col span={ 6 }>
              <Form.Item label="品牌名">
                {getFieldDecorator('bid', { initialValue: '' })(
                  <Select>
                    <Object label="" value="">
                      全部
                    </Object>
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
                {getFieldDecorator('aid', { initialValue: '' })(
                  <Select>
                    <Object label="" value="">
                      {' '}
                      全部
                    </Object>
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
                {getFieldDecorator('vid', { initialValue: '' })(
                  <Select>
                    <Object label="" value="">
                      {' '}
                      全部
                    </Object>
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
              <Form.Item label="车规">
                {getFieldDecorator('gid', { initialValue: '' })(
                  <Select>
                    <Object label="" value="">
                      {' '}
                      全部
                    </Object>
                    {Object.values(guageAllList).map(item => (
                      <Option label={ item.gaugeName } value={ item.id }>
                        {item.gaugeName}
                      </Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={ 6 }>
              <Form.Item label="优选车源">
                {getFieldDecorator('isGreat', { initialValue: '' })(
                  <Select>
                    <Object label="" value="">
                      全部
                    </Object>
                    {Object.values(statusSelect).map(item => (
                      <Option { ...item }>{item.label}</Option>
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
            {/* <Col span={ 6 }>
              <Form.Item label="平台/车城">
                {getFieldDecorator('isTrade', { initialValue: '' })(
                  <Select>
                    <Object label="" value="">
                      全部
                    </Object>
                    {Object.values(stradeSelect).map(item => (
                      <Option { ...item } key={ item.value }>
                        {item.label}
                      </Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
            </Col> */}
            {/* <Col span={ 6 }>
              <Form.Item label="经销商">
                {getFieldDecorator('distributor', { initialValue: '' })(
                  <Select>
                    <Object label="" value="">
                      全部
                    </Object>
                    {Object.values(disList).map(item => (
                      <Option label={ item.cname } value={ item.id }>
                        {item.cname}
                      </Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
            </Col> */}
            {/* <Col span={ 6 }>
              <Form.Item label="业务员">
                {getFieldDecorator('salesman', { initialValue: '' })(
                  <Select>
                    <Object label="" value="">
                      全部
                    </Object>
                    {Object.values(auditList).map(item => (
                      <Option label={ item.cname } value={ item.id }>
                        {item.cname}
                      </Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
            </Col> */}
            <Col span={ 6 }>
              <Form.Item label="售卖状态">
                {getFieldDecorator('salesState', { initialValue: '' })(
                  <Select>
                    <Object label="" value="">
                      全部
                    </Object>
                    {Object.values(salesStates).map(item => (
                      <Option { ...item }>{item.label}</Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
            </Col>
            {/* <Col span={ 6 }>
              <Form.Item label="展厅">
                {getFieldDecorator('shopName')(<Input />)}
              </Form.Item>
            </Col> */}
            <Col span={ 6 }>
              <Form.Item label="环保公开">
                {getFieldDecorator('isOpen', { initialValue: '' })(
                  <Select>
                    <Object label="" value="">
                      全部
                    </Object>
                    {Object.values(statusSelect).map(item => (
                      <Option { ...item }>{item.label}</Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={ 8 }>
              <Form.Item label="创建时间">
                {getFieldDecorator('dateRecord')(<RangePicker />)}
              </Form.Item>
            </Col>
            <Col span={ 4 } style={ { textAlign: 'left', marginTop: 4 } }>
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

export default Form.create({})(OptimizationSearch)
