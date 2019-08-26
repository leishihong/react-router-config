import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Row, Form, Col, Input, Icon, Modal, Button, Select } from 'antd'
import { BaseModal, BaseEditor } from '@/components/common'
import { fetchNewArticle } from '@/api/news'
import { articleRule } from './FormRule'
import { getGuageAll } from '@/utils/config'
const { Option } = Select
class ArticleModal extends Component {
  static propTypes = {
    form: PropTypes.object,
    editInfo: PropTypes.array,
    articleModal: PropTypes.bool,
    articleTitle: PropTypes.string,
    handelModal: PropTypes.func,
    hideCancelModal: PropTypes.func
  };
  constructor (props) {
    super(props)
    this.state = {
      guageAllList: [],
      articleInfo: {
        title: '',
        type: '',
        content: '',
        status: 1,
        id: 1
      }
    }
  }
  componentDidMount () {
    getGuageAll().then(res => {
      this.setState({
        guageAllList: res.data
      })
    })
    if (this.props.editInfo) {
      this.setState({
        articleInfo: this.props.editInfo
      })
    }
  }
  handelModal = e => {
    this.props.form.validateFieldsAndScroll(async (err, fieldsValue) => {
      if (!err) {
        if (!this.state.articleInfo.content) {
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
        const { code } = await fetchNewArticle(params)
        if (code) {
          this.props.handelModal(e)
        }
      }
    })
  };
  hideCancelModal = () => {
    this.props.hideCancelModal()
  };
  onEditorChange = content => {
    // const { getFieldsValue } = this.props.form
    // console.log(getFieldsValue(), 'fieldsValue')
    this.setState({
      articleInfo: {
        content,
        status: 1
      }
    })
  };
  render () {
    const { getFieldDecorator } = this.props.form
    const { articleInfo, guageAllList } = this.state
    return (
      <BaseModal
        ModalTitle={ this.props.articleTitle }
        ModalVisible={ this.props.articleModal }
        hideSuccessModal={ () => this.handelModal(true) }
        hideModal={ () => this.hideCancelModal() }
      >
        <Form layout={ 'vertical' }>
          <Row gutter={ 20 }>
            <Col span={ 8 }>
              <Form.Item label="文章标题">
                {getFieldDecorator('title', {
                  initialValue: articleInfo.title,
                  ...articleRule.title
                })(<Input />)}
              </Form.Item>
            </Col>
            <Col span={ 8 }>
              <Form.Item label="分类">
                {getFieldDecorator('type', {
                  initialValue: articleInfo.type,
                  ...articleRule.type
                })(
                  <Select>
                    {Object.values(guageAllList).map(item => (
                      <Option label={ item.gaugeName } value={ item.id }>
                        {item.gaugeName}
                      </Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={ 8 }>
              <Form.Item label="状态">
                {getFieldDecorator('status', {
                  initialValue: articleInfo.status,
                  ...articleRule.status
                })(
                  <Select>
                    <Option label="下架" value={ 0 }>
                      下架
                    </Option>
                    <Option label="上架" value={ 1 }>
                      上架
                    </Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={ 24 }>
              <Form.Item label="内容">
                {getFieldDecorator('content', {
                  initialValue: articleInfo.content
                })(
                  <BaseEditor
                    tinymceId={ new Date().getTime() }
                    onEditorChange={ this.onEditorChange }
                    content={ articleInfo.content }
                  />
                )}
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </BaseModal>
    )
  }
}

export default Form.create({})(ArticleModal)
