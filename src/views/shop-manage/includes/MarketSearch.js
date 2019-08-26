import React, { Component, Fragment } from 'react'
import { Form, Row, Col, Input, Button, Select } from 'antd'
import { PropTypes } from 'prop-types'
import AddMarketModal from './AddMarketModal'
import { isEmpty } from '@/lib/utils'
import { ValidSelect } from '@/utils/CommonSelect'
const { Option } = Select

class MarketSearch extends Component {
  static propTypes = {
    form: PropTypes.object,
    marketModal: PropTypes.bool,
    handleSearch: PropTypes.func
  };
  constructor (props) {
    super(props)
    this.state = {
      marketModal: false,
      markTitle: ''
    }
  }
  componentDidUpdate (prevProps, prevState) {
    if (prevProps.marketModal) prevProps.form.resetFields()
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
    this.setState(
      {
        marketModal: false
      },
      () => {
        this.props.handleSearch()
      }
    )
  };
  render () {
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: {
        xs: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 16 }
      }
    }

    const { marketModal, markTitle } = this.state

    return (
      <Fragment>
        <Form { ...formItemLayout } layout="inline" className="ant-search-form">
          <Row gutter={ 10 }>
            <Col span={ 6 }>
              <Form.Item label="ID">
                {getFieldDecorator('id')(<Input />)}
              </Form.Item>
            </Col>
            <Col span={ 6 }>
              <Form.Item label="关键字">
                {getFieldDecorator('distributor')(<Input />)}
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
                    marketModal: true,
                    markTitle: '添加业务员'
                  })
                }
              >
                添加
              </Button>
            </Col>
          </Row>
        </Form>
        {marketModal && (
          <AddMarketModal
            { ...{ marketModal, markTitle } }
            handelModal={ this.handelModal }
            hideCancelModal={ () =>
              this.setState({
                marketModal: false
              })
            }
          />
        )}
      </Fragment>
    )
  }
}

export default Form.create({})(MarketSearch)
