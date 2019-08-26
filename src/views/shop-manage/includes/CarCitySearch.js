import React, { PureComponent, Fragment } from 'react'
import { Form, Row, Col, Input, Button, Select } from 'antd'
import AddCarModal from './AddCarModal'
import { PropTypes } from 'prop-types'
import { isEmpty } from '@/lib/utils'
import { ToggleSelect } from '@/utils/CommonSelect'
const { Option } = Select

class CarCitySearch extends PureComponent {
  static propTypes = {
    form: PropTypes.object,
    carShopModal: PropTypes.bool,
    handelSearch: PropTypes.func
  };
  constructor (props) {
    super(props)
    this.state = {
      carShopModal: false,
      carTitle: '',
      searchInfo: { id: null, shopBName: '', state: null }
    }
  }
  handleAddCar = () => {
    this.setState({
      carShopModal: true
    })
  };
  componentDidUpdate (prevProps, prevState) {
    if (prevProps.carShopModal) prevProps.form.resetFields()
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
        carShopModal: false
      })
    }
  };

  render () {
    const { getFieldDecorator } = this.props.form
    const { searchInfo, carTitle } = this.state
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
              <Form.Item label="关键字">
                {getFieldDecorator('shopName')(<Input />)}
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
                    carShopModal: true,
                    carTitle: '添加商城'
                  })
                }
              >
                添加
              </Button>
            </Col>
          </Row>
        </Form>
        {this.state.carShopModal && (
          <AddCarModal
            carTitle={ carTitle }
            carShopModal={ this.state.carShopModal }
            handelModal={ type => this.handelModal(type) }
            hideCancelModal={ _ =>
              this.setState({
                carShopModal: false
              })
            }
          />
        )}
      </Fragment>
    )
  }
}

export default Form.create({})(CarCitySearch)
