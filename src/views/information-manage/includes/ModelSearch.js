import React, { Component, Fragment } from 'react'
import { Form, Row, Col, Input, Button, Select } from 'antd'
import AddModelModal from './AddModelModal'
import { PropTypes } from 'prop-types'
import { isEmpty } from '@/lib/utils'
import { ValidSelect } from '@/utils/CommonSelect'
import {
  getBrandSelectAll,
  getAuditSelectAll,
  getGaugeSelectAll
} from '@/utils/config'
const { Option } = Select
const formItemLayout = {
  labelCol: {
    xs: { span: 6 }
  },
  wrapperCol: {
    xs: { span: 16 }
  }
}

class ModelSearch extends Component {
  static propTypes = {
    form: PropTypes.object,
    modelModal: PropTypes.bool,
    handelSearch: PropTypes.func
  };
  constructor (props) {
    super(props)
    this.state = {
      searchInfo: [],
      brandList: [],
      gaugeList: [],
      auditList: [],
      modelModal: false,
      modelTitle: ''
    }
  }
  componentDidUpdate (prevProps, prevState) {
    if (prevProps.modelModal) prevProps.form.resetFields()
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
        modelModal: false
      },
      () => {
        this.props.handelSearch()
      }
    )
  };
  render () {
    const { getFieldDecorator } = this.props.form
    const { searchInfo, brandList, auditList, gaugeList } = this.state
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
                {getFieldDecorator('id', { initialValue: '' })(<Input />)}
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
                      <Option label={ item.cname } value={ item.id } key={ item.id }>
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
                    <Option value="" key="">
                      全部
                    </Option>
                    {Object.values(auditList).map(item => (
                      <Option label={ item.cname } value={ item.id }  key={ item.id }>
                        {item.cname}
                      </Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={ 6 }>
              <Form.Item label="车型名">
                {getFieldDecorator('vTypeCname', { initialValue: '' })(
                  <Input />
                )}
              </Form.Item>
            </Col>
            <Col span={ 6 }>
              <Form.Item label="车型类型">
                {getFieldDecorator('vType', { initialValue: '' })(
                  <Select>
                    <Option value="" key="">
                      全部
                    </Option>
                    {Object.values(gaugeList).map(item => (
                      <Option label={ item.cname } value={ item.id }  key={ item.id }>
                        {item.cname}
                      </Option>
                    ))}
                  </Select>
                )}
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
                    modelModal: true,
                    modelTitle: '添加车型'
                  })
                }
              >
                添加
              </Button>
            </Col>
          </Row>
        </Form>
        {this.state.modelModal && (
          <AddModelModal
            modelTitle={ this.state.modelTitle }
            modelModal={ this.state.modelModal }
            handelModal={ type => this.handelModal(type) }
            hideCancelModal={ _ =>
              this.setState({
                modelModal: false
              })
            }
          />
        )}
      </Fragment>
    )
  }
}

export default Form.create({})(ModelSearch)
