import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Row, Form, Col, Input, Button, Divider, Select } from 'antd'
import { isEmpty } from '@/lib/utils'
import ArticleModal from './ArticleModal'
import { ValidSelect } from '@/utils/CommonSelect'
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
class HotSearch extends PureComponent {
  static propTypes = {
    form: PropTypes.object,
    articleModal: PropTypes.bool,
    handelSearch: PropTypes.func
  };
  constructor (props) {
    super(props)
    this.state = {
      articleModal: false
    }
  }
  handelArticle = () => {
    this.setState({
      articleModal: true,
      articleTitle: '发布文章'
    })
  };
  componentDidUpdate (prevProps, prevState) {
    if (prevProps.articleModal) prevProps.form.resetFields()
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
        articleModal: false
      },
      () => {
        this.props.handelSearch()
      }
    )
  };
  render () {
    const { getFieldDecorator } = this.props.form
    const { articleModal, articleTitle } = this.state
    return (
      <Fragment>
        <Form { ...formItemLayout } layout="inline" className="ant-search-form">
          <Row gutter={ 20 }>
            <Col span={ 6 }>
              <Form.Item label="ID">
                {getFieldDecorator('id')(<Input />)}
              </Form.Item>
            </Col>
            <Col span={ 6 }>
              <Form.Item label="关键字">
                {getFieldDecorator('title')(<Input />)}
              </Form.Item>
            </Col>
            <Col span={ 6 }>
              <Form.Item label="状态">
                {getFieldDecorator('id', { initialValue: '' })(
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
            <Col span={ 6 } style={ style.align }>
              <Button
                type="primary"
                style={ style.reset }
                onClick={ this.handelSearch }
              >
                搜索
              </Button>
              <Button style={ style.reset } onClick={ this.handleReset }>
                重置
              </Button>
              <Button type="primary" onClick={ this.handelArticle }>
                发布文章
              </Button>
            </Col>
          </Row>
        </Form>
        {articleModal && (
          <ArticleModal
            { ...{ articleModal, articleTitle } }
            handelModal={ this.handelModal }
            hideCancelModal={ () =>
              this.setState({
                articleModal: false
              })
            }
          />
        )}
      </Fragment>
    )
  }
}

export default Form.create({})(HotSearch)
