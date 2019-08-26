import React, { PureComponent } from 'react'
import { Modal } from 'antd'
import PropTypes from 'prop-types'

class BaseModal extends PureComponent {
  static propTypes = {
    ModalTitle: PropTypes.string,
    ModalVisible: PropTypes.bool,
    ModalWidth: PropTypes.number,
    children: PropTypes.array,
    ModalOk: PropTypes.string,
    hideSuccessModal: PropTypes.func,
    hideModal: PropTypes.func
  };
  static defaultProps = {
    ModalVisible: false,
    ModalWidth: 900,
    ModalOk: '确认'
  };
  constructor (props) {
    super(props)

    this.state = {}
  }
  hideModal = () => {
    this.props.hideModal('hideModal')
  };
  hideSuccessModal = () => {
    this.props.hideSuccessModal('hideSuccessModal')
  };

  render () {
    const {
      ModalTitle,
      ModalOk,
      ModalVisible,
      ModalWidth,
      children
    } = this.props
    return (
      <Modal
        title={ ModalTitle }
        width={ ModalWidth }
        visible={ ModalVisible }
        onOk={ this.hideSuccessModal }
        maskClosable={ false }
        onCancel={ this.hideModal }
        destroyOnClose={ true }
        okText={ ModalOk }
        cancelText="取消"
      >
        {children}
      </Modal>
    )
  }
}

export default BaseModal
