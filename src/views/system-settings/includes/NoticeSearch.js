import React, { PureComponent, Fragment } from 'react'
import { Form, Row, Col, Input, Button, Select, DatePicker } from 'antd'
import { PropTypes } from 'prop-types'
import { isEmpty } from '@/lib/utils'
import NoticeModal from './NoticeModal'
const { Option } = Select
const formItemLayout = {
  labelCol: {
    xs: { span: 6 }
  },
  wrapperCol: {
    xs: { span: 16 }
  }
}
const style = {
  align: {
    textAlign: 'left',
    marginTop: 4
  },
  reset: {
    marginRight: 6
  }
}

class NoticeSearch extends PureComponent {
  static propTypes = {
    form: PropTypes.object,
    noticeModal: PropTypes.bool,
    handleSearch: PropTypes.func
  };
  constructor (props) {
    super(props)
    this.state = {
      noticeModal: false,
      adminTitle: ''
    }
  }
  handelAddAdmin = () => {
    this.setState({ noticeModal: true, adminTitle: '添加管理员' })
  };
  componentDidUpdate (prevProps, prevState) {
    if (prevProps.noticeModal) prevProps.form.resetFields()
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
        noticeModal: false
      },
      () => {
        this.props.handleSearch()
      }
    )
  };
  handelNoticeModal = () => {
    this.setState({
      noticeModal: true
    })
  };
  render () {
    const { getFieldDecorator } = this.props.form
    const { noticeModal } = this.state
    return (
      <Fragment>
        <Form { ...formItemLayout } layout="inline" className="ant-search-form">
          <Row gutter={ 20 }>
            <Col span={ 6 }>
              <Form.Item label="操作时间">
                {getFieldDecorator('date', {})(<DatePicker />)}
              </Form.Item>
            </Col>
            <Col span={ 6 }>
              <Form.Item label="标题">
                {getFieldDecorator('title', {})(<Input />)}
              </Form.Item>
            </Col>
            <Col span={ 6 }>
              <Form.Item label="发送方式">
                {getFieldDecorator('type', { initialValue: '' })(
                  <Select>
                    <Option value="" key="">
                      全部
                    </Option>
                    <Option value={ 1 }>应用推送</Option>
                    <Option value={ 2 }>短信通知</Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={ 6 } style={ style.align }>
              <Button
                type="primary"
                onClick={ this.handleSearch }
                style={ style.reset }
              >
                搜索
              </Button>
              <Button style={ { marginLeft: 6 } } onClick={ this.handleReset }>
                重置
              </Button>
              <Button
                type="primary"
                style={ { marginLeft: 6 } }
                onClick={ this.handelNoticeModal }
              >
                消息发送
              </Button>
            </Col>
          </Row>
        </Form>
        {noticeModal && (
          <NoticeModal
            { ...{ noticeModal } }
            handelSuccessModal={ this.handelSuccessModal }
            hideCancelModal={ () =>
              this.setState({
                noticeModal: false
              })
            }
          />
        )}
      </Fragment>
    )
  }
}

export default Form.create({})(NoticeSearch)
