import React from 'react'
import { Button, Modal, Icon, Upload, message } from 'antd'
import PropTypes from 'prop-types'
// import styles from './index.less';

const Dragger = Upload.Dragger

class UploadImage extends React.Component {
  static propTypes = {
    imageSuccessCBK: PropTypes.func
  };
  static defaultProps = {};
  constructor (props) {
    super(props)
    this.state = {
      visible: false,
      listObj: {}
    }
  }

  /**
   * 显示弹框
   *
   *  */
  showModal = () => {
    this.setState({
      visible: true
    })
  };

  /**
   * 确认
   *
   *  */
  handleOk = e => {
    const { imageSuccessCBK } = this.props
    const { listObj } = this.state
    const imagesFileArr = Object.keys(listObj).map(v => listObj[ v ])
    imageSuccessCBK(imagesFileArr)
    this.setState({
      visible: false,
      listObj: {},
      Uploading: false
    })
  };

  handleCancel = e => {
    this.setState({
      visible: false,
      listObj: {}
    })
  };
  render () {
    const { loading } = this.props
    const { visible, listObj, Uploading } = this.state
    const props = {
      name: 'file',
      multiple: true,
      action: '//jsonplaceholder.typicode.com/posts/',
      listType: 'picture',
      onChange: info => {
        const uid = info.file.uid
        const objKeyArr = Object.keys(listObj)
        const status = info.file.status
        if (status !== 'uploading') {
          console.log(info.file, info.fileList)
        }
        if (status === 'done') {
          //已成功上传
          this.setState({
            Uploading: false
          })
          for (let i = 0, len = objKeyArr.length; i < len; i++) {
            if (listObj[ objKeyArr[ i ] ].uid === uid) {
              listObj[ objKeyArr[ i ] ].url = info.file.thumbUrl
              listObj[ objKeyArr[ i ] ].hasSuccess = true
              message.success(`${ info.file.name } file uploaded successfully.`)
              return
            }
          }
        } else if (status === 'error') {
          this.setState({
            Uploading: false
          })
          message.error(`${ info.file.name } file upload failed.`)
        }
        if (status === 'removed') {
          //移除上传的
          for (let i = 0, len = objKeyArr.length; i < len; i++) {
            if (listObj[ objKeyArr[ i ] ].uid === uid) {
              delete listObj[ objKeyArr[ i ] ]
              message.success(`${ info.file.name } file removed successfully.`)
              return
            }
          }
        }
      },
      beforeUpload: file => {
        this.setState({
          Uploading: true
        })
        const _self = this
        const _URL = window.URL || window.webkitURL
        const fileName = file.uid
        listObj[ fileName ] = {}
        return new Promise((resolve, reject) => {
          const img = new Image()
          img.src = _URL.createObjectURL(file)
          img.onload = function () {
            listObj[ fileName ] = {
              hasSuccess: false,
              uid: file.uid,
              width: this.width,
              height: this.height
            }
            _self.setState({
              listObj
            })
          }
          resolve(true)
        })
      }
    }

    return (
      <div>
        <Button
          style={ { marginTop: 0 } }
          type="primary"
          shape="round"
          icon="upload"
          onClick={ () => {
            this.showModal()
          } }
        >
          上传
        </Button>
        {visible ? (
          <Modal
            title="上传图片"
            visible={ visible }
            onCancel={ this.handleCancel }
            footer={ [
              <div key="1">
                <Button
                  onClick={ () => this.handleCancel() }
                  loading={ !!Uploading }
                >
                  取消
                </Button>
                <Button
                  type="primary"
                  style={ { marginLeft: 8 } }
                  onClick={ () => this.handleOk() }
                  loading={ !!Uploading }
                >
                  确定
                </Button>
              </div>
            ] }
          >
            <Dragger { ...props }>
              <p className="ant-upload-drag-icon">
                <Icon type="inbox" />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
              <p className="ant-upload-hint">
                Support for a single or bulk upload. Strictly prohibit from
                uploading company data or other band files
              </p>
            </Dragger>
          </Modal>
        ) : null}
      </div>
    )
  }
}

export default UploadImage
