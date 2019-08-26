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
  InputNumber,
  Select
} from 'antd'
import { BaseModal } from '@/components/common'
import { getBrandSelectAll } from '@/utils/config'
import { seriesRule } from './FormRule'
import { ValidSelect } from '@/utils/CommonSelect'
import { fetchAuditAdd, fetchAuditEdit } from '@/api/info'

function getBase64 (file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}

class SeriesModal extends Component {
  static propTypes = {
    form: PropTypes.object,
    editInfo: PropTypes.array,
    seriesModal: PropTypes.bool,
    seriesTitle: PropTypes.string,
    handelModal: PropTypes.func,
    hideCancelModal: PropTypes.func
  };
  constructor (props) {
    super(props)
    this.state = {
      previewVisible: false,
      previewImage: '',
      fileList: [],
      brandList: [],
      seriesInfo: {
        id: '',
        bid: '',
        aCname: '',
        aEname: '',
        aAppImage: '',
        aKeyword: '',
        aState: 1,
        sortNum: ''
      }
    }
  }
  componentDidMount () {
    getBrandSelectAll().then(res => {
      this.setState({
        brandList: res
      })
    })
    if (this.props.editInfo) {
      this.setState({
        seriesInfo: this.props.editInfo
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
        if (this.props.editInfo) {
          // fetchAuditEdit
          const { code } = await fetchAuditEdit(params)
          if (code) {
            this.props.handelModal()
          }
        } else {
          const { code } = await fetchAuditAdd(params)
          if (code) {
            this.props.handelModal()
          }
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
    const { fileList, brandList, seriesInfo } = this.state
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    )
    return (
      <div>
        <BaseModal
          ModalTitle={ this.props.seriesTitle }
          ModalVisible={ this.props.seriesModal }
          hideSuccessModal={ () => this.handelModal(true) }
          hideModal={ () => this.hideCancelModal() }
        >
          <Form layout={ 'vertical' }>
            <Row gutter={ 20 }>
              <Col span={ 8 }>
                <Form.Item label="搜索关键字">
                  {getFieldDecorator('aKeyword', {
                    initialValue: seriesInfo.aKeyword,
                    ...seriesRule.aKeyword
                  })(<Input />)}
                </Form.Item>
              </Col>
              <Col span={ 8 }>
                <Form.Item label="品牌">
                  {getFieldDecorator('bid', {
                    initialValue: seriesInfo.bid,
                    ...seriesRule.bid
                  })(
                    <Select>
                      {Object.values(brandList).map(item => (
                        <Option label={ item.cname } value={ item.id }>
                          {item.cname}
                        </Option>
                      ))}
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={ 8 }>
                <Form.Item label="车系（英文）">
                  {getFieldDecorator('aEname', {
                    initialValue: seriesInfo.aEname,
                    ...seriesRule.aEname
                  })(<Input type="textarea" />)}
                </Form.Item>
              </Col>
              <Col span={ 8 }>
                <Form.Item label="车系（中文）">
                  {getFieldDecorator('aCname', {
                    initialValue: seriesInfo.aCname,
                    ...seriesRule.aCname
                  })(<Input type="textarea" />)}
                </Form.Item>
              </Col>

              <Col span={ 8 }>
                <Form.Item label="排序编号">
                  {getFieldDecorator('sortNum', {
                    initialValue: seriesInfo.sortNum,
                    ...seriesRule.sortNum
                  })(<InputNumber style={ { width: '100%' } } min={ 0 } />)}
                </Form.Item>
              </Col>
              <Col span={ 8 }>
                <Form.Item label="状态">
                  {getFieldDecorator('aState', {
                    initialValue: seriesInfo.aState,
                    ...seriesRule.aState
                  })(
                    <Select>
                      {Object.values(ValidSelect).map(item => (
                        <Option { ...item }>{item.label}</Option>
                      ))}
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={ 24 }>
                <Form.Item label="APP图片">
                  {getFieldDecorator('aAppImage', {
                    initialValue: seriesInfo.aAppImage,
                    ...seriesRule.aAppImage
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

export default Form.create({})(SeriesModal)
