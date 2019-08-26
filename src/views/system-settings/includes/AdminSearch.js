import React, { PureComponent, Fragment } from 'react'
import { Form, Row, Col, Input, Button, Select } from 'antd'
import { PropTypes } from 'prop-types'
import { isEmpty } from '@/lib/utils'
import AddAdminModal from './AddAdminModal'
import { ToggleSelect } from '@/utils/CommonSelect'
import { getRuleSelectList } from '@/utils/config'
const { Option } = Select

export class AdminSearch extends PureComponent {
  static propTypes = {
    form: PropTypes.object,
    adminModal: PropTypes.bool,
    handleSearch: PropTypes.func
  };
  constructor (props) {
    super(props)
    this.state = {
      adminModal: false,
      adminTitle: '',
      ruleList: []
    }
  }
  componentDidMount () {
    getRuleSelectList().then(res => {
      this.setState({
        ruleList: res.data
      })
    })
  }

  handelAddAdmin = () => {
    this.setState({ adminModal: true, adminTitle: '添加管理员' })
  };
  componentDidUpdate (prevProps, prevState) {
    if (prevProps.adminModal) prevProps.form.resetFields()
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
  handelSuccessModal = () => {
    this.setState(
      {
        adminModal: false
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
    const { adminModal, adminTitle, ruleList } = this.state
    return (
      <Fragment>
        <Form { ...formItemLayout } layout="inline" className="ant-search-form">
          <Row gutter={ 10 }>
            <Col span={ 6 }>
              <Form.Item label="姓名">
                {getFieldDecorator('username')(<Input />)}
              </Form.Item>
            </Col>
            <Col span={ 6 }>
              <Form.Item label="账号">
                {getFieldDecorator('account')(<Input />)}
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
            <Col span={ 6 }>
              <Form.Item label="权限">
                {getFieldDecorator('sid', {
                  initialValue: ''
                })(
                  <Select>
                    <Option value="" key="">
                      全部
                    </Option>
                    {/* ruleList */}
                    {Object.values(ruleList).map(item => (
                      <Option
                        label={ item.shiroName }
                        value={ item.id }
                        key={ item.id }
                      >
                        {item.shiroName}
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
              <Button style={ { marginLeft: 6 } } onClick={ this.handleReset }>
                重置
              </Button>
              <Button
                type="primary"
                style={ { marginLeft: 6 } }
                onClick={ this.handelAddAdmin }
              >
                添加
              </Button>
            </Col>
          </Row>
        </Form>
        {adminModal && (
          <AddAdminModal
            { ...{ adminModal, adminTitle } }
            handelSuccessModal={ this.handelSuccessModal }
            hideCancelModal={ () =>
              this.setState({
                adminModal: false
              })
            }
          />
        )}
      </Fragment>
    )
  }
}

export default Form.create({})(AdminSearch)
