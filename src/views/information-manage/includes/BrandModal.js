import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import {
  Row,
  Form,
  Col,
  Input,
  Upload,
  Icon,
  Modal,
  Button,
  Select,
  InputNumber
} from 'antd'
import { BaseModal } from '@/components/common'
import { fetchBrandAdd } from '@/api/info'
import { ValidSelect, initialSelect } from '@/utils/CommonSelect'
import { brandRule } from './FormRule'
function getBase64 (file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}

class BrandModal extends Component {
  static propTypes = {
    form: PropTypes.object,
    brandModal: PropTypes.bool,
    brandTitle: PropTypes.string,
    handelModal: PropTypes.func,
    hideCancelModal: PropTypes.func,
    editInfo: PropTypes.array
  };
  constructor (props) {
    super(props)
    this.state = {
      previewVisible: false,
      previewImage: '',
      fileList: [],
      brandInfo: {
        bCname: '',
        bEname: '',
        bImage: '',
        bBrandKeyword: '',
        bAcronym: '',
        sortNum: '',
        bState: 1
      }
    }
  }
  componentDidMount () {
    if (this.props.editInfo) {
      this.setState({
        brandInfo: this.props.editInfo
      })
    }
  }
  handelModal = () => {
    this.props.form.validateFieldsAndScroll(async (err, fieldsValue) => {
      if (!err) {
        let params = fieldsValue
        if (this.props.editInfo) {
          params = Object.assign(fieldsValue, {
            id: this.props.editInfo.id
          })
        }
        const { code } = await fetchBrandAdd(params)
        if (code) {
          this.props.handelModal()
        }
      }
    })
  };
  hideCancelModal = () => {
    this.props.hideCancelModal()
  };
  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj)
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true
    })
  };

  handleChange = ({ fileList }) => this.setState({ fileList });

  render () {
    const { getFieldDecorator } = this.props.form
    const { fileList, brandInfo } = this.state
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    )
    return (
      <div>
        <BaseModal
          ModalTitle={ this.props.brandTitle }
          ModalVisible={ this.props.brandModal }
          hideSuccessModal={ () => this.handelModal(true) }
          hideModal={ () => this.hideCancelModal() }
        >
          <Form layout={ 'vertical' }>
            <Row gutter={ 20 }>
              <Col span={ 8 }>
                <Form.Item label="搜索关键字">
                  {getFieldDecorator('bBrandKeyword', {
                    initialValue: brandInfo.bBrandKeyword,
                    ...brandRule.bBrandKeyword
                  })(<Input />)}
                </Form.Item>
              </Col>
              <Col span={ 8 }>
                <Form.Item label="品牌（英文）">
                  {getFieldDecorator('bEname', {
                    initialValue: brandInfo.bEname,
                    ...brandRule.bEname
                  })(<Input type="textarea" />)}
                </Form.Item>
              </Col>
              <Col span={ 8 }>
                <Form.Item label="品牌（中文）">
                  {getFieldDecorator('bCname', {
                    initialValue: brandInfo.bCname,
                    ...brandRule.bCname
                  })(<Input type="textarea" />)}
                </Form.Item>
              </Col>
              <Col span={ 8 }>
                <Form.Item label="首字母">
                  {getFieldDecorator('bAcronym', {
                    initialValue: brandInfo.bAcronym,
                    ...brandRule.bAcronym
                  })(
                    <Select>
                      {Object.values(initialSelect).map(item => (
                        <Option label={ item } value={ item } key={ item }>
                          {item}
                        </Option>
                      ))}
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={ 8 }>
                <Form.Item label="排序编号">
                  {getFieldDecorator('sortNum', {
                    initialValue: brandInfo.sortNum,
                    ...brandRule.sortNum
                  })(<InputNumber style={ { width: '100%' } } min={ 0 } />)}
                </Form.Item>
              </Col>
              <Col span={ 8 }>
                <Form.Item label="状态">
                  {getFieldDecorator('bState', {
                    initialValue: brandInfo.bState,
                    ...brandRule.bState
                  })(
                    <Select>
                      {Object.values(ValidSelect).map(item => (
                        <Option { ...item } key={ item.value }>
                          {item.label}
                        </Option>
                      ))}
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={ 24 }>
                <Form.Item label="图片">
                  {getFieldDecorator('bImage', {
                    initialValue: brandInfo.bImage,
                    ...brandRule.bImage
                  })(
                    <Input />
                    // <Upload
                    //   action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    //   listType="picture-card"
                    //   fileList={ fileList }
                    //   onPreview={ this.handlePreview }
                    //   onChange={ this.handleChange }
                    // >
                    //   {fileList.length >= 8 ? null : uploadButton}
                    // </Upload>
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </BaseModal>
      </div>
    )
  }
}

export default Form.create({})(BrandModal)
