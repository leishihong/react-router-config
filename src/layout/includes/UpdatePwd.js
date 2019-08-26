import React, { PureComponent } from 'react'
import { PropTypes } from 'prop-types'
import { withRouter } from 'react-router-dom'
import { Form, Input } from 'antd'
import { connect } from 'react-redux'
import { BaseModal } from '@/components/common'
import { fetchLoginPwd } from '@/api/login'
import cookies from 'js-cookie'

class UpdatePwd extends PureComponent {
  static propTypes = {
    form: PropTypes.object,
    setAuth: PropTypes.func,
    history: PropTypes.bool,
    updatePwdModal: PropTypes.bool,
    handelModal: PropTypes.func,
    hidModal: PropTypes.func
  };
  constructor (props) {
    super(props)
    this.state = {
      pwd: 222
    }
  }

  handelModal = () => {
    this.props.form.validateFieldsAndScroll(async (err, fieldsValue) => {
      if (!err) {
        const params = {
          password: fieldsValue.password,
          newPassword: fieldsValue.newPassword
        }
        const { code } = await fetchLoginPwd(params)
        if (code) {
          cookies.remove('tokenUid')
          this.props.setAuth()
          this.props.history.push('/login')
        }
      }
    })
  };

  render () {
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: {
        xs: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 16 }
      }
    }
    const { updatePwdModal } = this.props
    const validateToNextPassword = (rule, value, callback) => {
      const form = this.props.form
      if (value && this.confirmDirty) {
        form.validateFields([ 'conPassword' ], { force: true })
      }
      callback()
    }
    const compareToFirstPassword = (rule, value, callback) => {
      const form = this.props.form
      if (value && value !== form.getFieldValue('newPassword')) {
        callback('两次密码输入不一致，请重新输入')
      } else {
        callback()
      }
    }
    return (
      <BaseModal
        ModalTitle={ '修改密码' }
        ModalVisible={ updatePwdModal }
        hideSuccessModal={ () => this.handelModal() }
        hideModal={ this.props.hidModal }
      >
        <Form layout={ 'horizontal' } { ...formItemLayout }>
          <Form.Item label="旧密码">
            {getFieldDecorator('password', {
              initialValue: '',
              rules: [
                {
                  required: true,
                  message: '旧密码不能为空'
                }
              ]
            })(<Input.Password />)}
          </Form.Item>
          <Form.Item label="新密码">
            {getFieldDecorator('newPassword', {
              initialValue: '',
              rules: [
                {
                  required: true,
                  message: '新密码不能为空'
                }
              ]
            })(<Input.Password />)}
          </Form.Item>
          <Form.Item label="确认新密码">
            {getFieldDecorator('assignPwd', {
              initialValue: '',
              rules: [
                {
                  required: true,
                  message: '新密码不能为空'
                },
                { validator: compareToFirstPassword }
              ]
            })(<Input.Password />)}
          </Form.Item>
        </Form>
      </BaseModal>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setAuth: () => {
      dispatch({ type: 'LOG_OUT', payload: [] })
    }
  }
}
export default connect(
  '',
  mapDispatchToProps
)(withRouter(Form.create({})(UpdatePwd)))

// export default Form.create({})(UpdatePwd)
