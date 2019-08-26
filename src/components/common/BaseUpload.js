import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Upload, Icon, Modal, notification } from 'antd'

function getBase64 (file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}

function beforeUpload (file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
  const videoTypeCheck = /(.mp4)$/.test(file.type)
  const videoCheck = /video/.test(file.type)

  if (!isJpgOrPng) {
    notification.error({
      message: '提示',
      description: 'You can only upload JPG/PNG file!',
      duration: 2
    })
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    notification.error({
      message: '提示',
      description: 'Image must smaller than 2MB!',
      duration: 2
    })
  }
  return isJpgOrPng && isLt2M && checkImageWH(file)
}
function checkImageWH (file) {
  return new Promise((resolve, reject) => {})
}
class BaseUpload extends Component {
  static propTypes = {
    multipleLimit: PropTypes.bool,
    acceptType: PropTypes.string
  };
  static defaultProps = {
    multipleLimit: false,
    acceptType: '.jpeg,.png,.jpg',
    actionUrl: 'http://39.100.153.51:80/api/uploadService/save'
  };
  constructor (props) {
    super(props)
    this.state = {
      previewVisible: false,
      previewImage: '',
      fileList: [
        {
          uid: '-1',
          name: 'image.png',
          status: 'done',
          url:
            'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
        },
        {
          uid: '-2',
          name: 'image.png',
          status: 'done',
          url:
            'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
        },
        {
          uid: '-3',
          name: 'image.png',
          status: 'done',
          url:
            'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
        },
        {
          uid: '-4',
          name: 'image.png',
          status: 'done',
          url:
            'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
        },
        {
          uid: '-5',
          name: 'image.png',
          status: 'done',
          url:
            'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
        }
      ]
    }
  }
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
    const { previewVisible, previewImage, fileList } = this.state
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    )
    const { acceptType, multipleLimit, actionUrl } = this.props
    return (
      <div className="clearfix">
        <Upload
          action={ actionUrl }
          beforeUpload={ beforeUpload }
          listType="picture-card"
          name="file"
          accept={ acceptType }
          multiple={ multipleLimit }
          fileList={ fileList }
          onPreview={ this.handlePreview }
          onChange={ this.handleChange }
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
        <Modal
          visible={ previewVisible }
          footer={ null }
          onCancel={ this.handleCancel }
        >
          <img alt="example" style={ { width: '100%' } } src={ previewImage } />
        </Modal>
      </div>
    )
  }
}

export default BaseUpload
