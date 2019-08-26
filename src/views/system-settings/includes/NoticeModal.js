import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { Row, Form, Col, Input, Modal, Checkbox, Select } from 'antd'
import { BaseModal, BaseEditor } from '@/components/common'
import { Editor } from '@tinymce/tinymce-react'
import { fetchSendMessage } from '@/api/system'
import { noticeRule } from './FromRule'
import { noticeSelect } from '@/utils/CommonSelect'
const optionsWithDisabled = [
  { label: '应用推送', value: 1 },
  { label: '短信通知', value: 2 }
]

class NoticeModal extends Component {
  static propTypes = {
    form: PropTypes.object,
    editInfo: PropTypes.array,
    noticeModal: PropTypes.bool,
    handelSuccessModal: PropTypes.func,
    hideCancelModal: PropTypes.func
  };
  constructor (props) {
    super(props)
    this.state = {
      noticeInfo: {
        title: '',
        content: '',
        around: '',
        type: 0
      }
    }
  }
  componentDidMount () {
    if (this.props.editInfo) {
      noticeSelect.map(item => {
        if (item.title === this.props.editInfo.type) {
          this.props.editInfo.type = item.value
        }
      })
      this.setState({
        noticeInfo: this.props.editInfo
      })
    }
  }

  handelModal = () => {
    this.props.form.validateFieldsAndScroll(async (err, fieldsValue) => {
      if (!err) {
        if (!this.state.noticeInfo.content) {
          Modal.confirm({
            title: '提示',
            content: '内容不能为空'
          })
          return false
        }
        const params = fieldsValue
        if (this.props.editInfo) {
          params.id = this.props.editInfo.id
        }
        const { code } = await fetchSendMessage(params)
        if (code) {
          this.props.handelSuccessModal()
        }
      }
    })
  };
  hideCancelModal = () => {
    this.props.hideCancelModal()
  };
  onEditorChange = content => {
    this.state.noticeInfo.content = content
    this.setState({
      noticeInfo: this.state.noticeInfo
    })
  };
  render () {
    const { getFieldDecorator } = this.props.form
    const { noticeInfo } = this.state
    return (
      <div>
        <BaseModal
          ModalTitle={ this.props.editInfo ? '编辑消息发送' : '消息发送' }
          ModalVisible={ this.props.noticeModal }
          hideSuccessModal={ () => this.handelModal(true) }
          hideModal={ () => this.hideCancelModal() }
        >
          <Form layout={ 'vertical' }>
            <Row gutter={ 20 }>
              <Col span={ 8 }>
                <Form.Item label="标题">
                  {getFieldDecorator('title', {
                    initialValue: noticeInfo.title,
                    ...noticeRule.title
                  })(<Input />)}
                </Form.Item>
              </Col>
              <Col span={ 8 }>
                <Form.Item label="发送范围">
                  {getFieldDecorator('around', {
                    initialValue: noticeInfo.around,
                    ...noticeRule.around
                  })(<Input />)}
                </Form.Item>
              </Col>
              <Col span={ 8 }>
                <Form.Item label="状态">
                  {getFieldDecorator('type', {
                    initialValue: noticeInfo.type,
                    ...noticeRule.type
                  })(
                    <Select>
                      <Option value={ 0 }>全部</Option>
                      <Option value={ 1 }>应用推送</Option>
                      <Option value={ 2 }>短信通知</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={ 24 }>
                <Form.Item label="内容">
                  {getFieldDecorator('content', {
                    initialValue: noticeInfo.content
                  })(
                    <BaseEditor
                      tinymceId={ new Date().getTime() }
                      content={ noticeInfo.content }
                      onEditorChange={ this.onEditorChange }
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Form>
          {/* <Editor value="lll" /> */}
        </BaseModal>
      </div>
    )
  }
}

export default Form.create({})(NoticeModal)
