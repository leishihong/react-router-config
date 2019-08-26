import React, { Component, Fragment } from 'react'
import { Form, Row, Col, Input, Button, Select } from 'antd'
import { PropTypes } from 'prop-types'
import AddDealerModal from './AddDealerModal'
import { isEmpty } from '@/lib/utils'
import { getAllTrade } from '@/utils/config'
import { ToggleSelect } from '@/utils/CommonSelect'
const { Option } = Select

export class DealerSearch extends Component {
  static propTypes = {
    form: PropTypes.object,
    dealer: PropTypes.bool,
    handleSearch: PropTypes.func
  };
  constructor (props) {
    super(props)
    this.state = {
      dealer: false,
      dealTitle: '',
      tradeList: []
    }
  }
  componentDidMount () {
    getAllTrade().then(res => {
      this.setState({ tradeList: res })
    })
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevProps.dealer) prevProps.form.resetFields()
  }

  handelModal = type => {
    this.setState(
      {
        dealer: false
      },
      () => {
        this.props.handleSearch()
      }
    )
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
  render () {
    const { getFieldDecorator } = this.props.form
    const { dealer, tradeList, dealTitle } = this.state
    const formItemLayout = {
      labelCol: {
        xs: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 16 }
      }
    }
    return (
      <Fragment>
        <Form { ...formItemLayout } layout="inline" className="ant-search-form">
          <Row gutter={ 10 }>
            <Col span={ 6 }>
              <Form.Item label="ID">
                {getFieldDecorator('id', { initialValue: null })(<Input />)}
              </Form.Item>
            </Col>
            <Col span={ 6 }>
              <Form.Item label="车城">
                {getFieldDecorator('tid', {
                  initialValue: ''
                })(
                  <Select>
                    <Option value="" key="">
                      全部
                    </Option>
                    {Object.values(tradeList).map(item => (
                      <Option label={ item.cname } value={ item.id } key={ item.id }>
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
                    dealer: true,
                    dealTitle: '添加商城'
                  })
                }
              >
                添加
              </Button>
            </Col>
          </Row>
        </Form>
        {dealer && (
          <AddDealerModal
            dealerModal={ dealer }
            dealTitle={ dealTitle }
            handelModal={ type => this.handelModal(type) }
            hideCancelModal={ _ =>
              this.setState({
                dealer: false
              })
            }
          />
        )}
      </Fragment>
    )
  }
}

export default Form.create({})(DealerSearch)
