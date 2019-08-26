import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Row, Form, Col, Input, Button, Divider, Select } from 'antd'
import SeriesModal from './SeriesModal'
import { isEmpty } from '@/lib/utils'
import { ValidSelect } from '@/utils/CommonSelect'
import { getBrandSelectAll } from '@/utils/config'
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
    textAlign: 'right'
  },
  reset: {
    marginRight: 6
  }
}

class SeriesSearch extends Component {
  static propTypes = {
    form: PropTypes.object,
    seriesModal: PropTypes.bool,
    handelSearch: PropTypes.func
  };
  constructor (props) {
    super(props)
    this.state = {
      searchInfo: [],
      brandList: [],
      seriesModal: false,
      seriesTitle: ''
    }
  }
  componentDidUpdate (prevProps, prevState) {
    if (prevProps.seriesModal) prevProps.form.resetFields()
  }
  componentDidMount () {
    getBrandSelectAll().then(res => {
      console.log(res)
      this.setState({
        brandList: res
      })
    })
  }
  handelSearch = () => {
    const { getFieldsValue } = this.props.form
    this.props.handelSearch(isEmpty(getFieldsValue()))
  };
  handelSeries = () => {
    this.setState({
      seriesModal: true,
      seriesTitle: '添加车系'
    })
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
        seriesModal: false
      },
      () => {
        this.props.handelSearch()
      }
    )
  };
  render () {
    const { getFieldDecorator } = this.props.form
    const { searchInfo, seriesModal, brandList, seriesTitle } = this.state
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
                {getFieldDecorator('aKeyword')(<Input />)}
              </Form.Item>
            </Col>
            <Col span={ 6 }>
              <Form.Item label="品牌名称">
                {getFieldDecorator('bid', { initialValue: '' })(
                  <Select>
                    <Option value="" key="">
                      全部
                    </Option>
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
              <Form.Item label="状态">
                {getFieldDecorator('aState', { initialValue: '' })(
                  <Select>
                    <Option value="" key="">
                      全部
                    </Option>
                    {Object.values(ValidSelect).map(item => (
                      <Option { ...item }>{item.label}</Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={ 24 } style={ style.align }>
              <Button
                type="primary"
                style={ style.reset }
                onClick={ this.handelSearch }
              >
                搜索
              </Button>
              <Button style={ style.reset } onCLick={ this.handleReset }>
                重置
              </Button>
              <Button type="primary" onClick={ this.handelSeries }>
                添加
              </Button>
            </Col>
          </Row>
        </Form>
        {seriesModal && (
          <SeriesModal
            { ...{ seriesModal, seriesTitle } }
            handelModal={ this.handelModal }
            hideCancelModal={ () =>
              this.setState({
                seriesModal: false
              })
            }
          />
        )}
      </Fragment>
    )
  }
}

export default Form.create()(SeriesSearch)
