import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import DocumentTitle from 'react-document-title'
import { Row, Col, Form, Icon, Input, Button } from 'antd'
import './index.less'
import $ from 'jquery'
import { fetchCode, fetchLogin, fetchUserAuthList } from '@/api/login'
import { initialSelect } from '@/utils/CommonSelect'
import fetchJsonp from 'fetch-jsonp'
import cookies from 'js-cookie'
import history from '@/lib/history'

export class Login extends Component {
  static propTypes = {
    form: PropTypes.object,
    setLoginUserInfo: PropTypes.func,
    getAuth: PropTypes.func,
    history: PropTypes.object
  };
  constructor (props) {
    super(props)
    this.state = {
      userLogin: {
        username: '',
        password: '',
        validateCode: '',
        imgCode: ''
      }
    }
  }

  componentDidMount () {
    this.initCode()
  }

  initCode = async () => {
    const { code, results } = await fetchCode()
    if (code) {
      this.setState({
        userLogin: {
          imgCode: results
        }
      })
    }
  };
  onKeyup = e => {
    if (e.keyCode === 13) {
      this.handleSubmit()
    }
  };
  handleSubmit = () => {
    // cookies.set('tokenUid', 2)
    // setTimeout(() => {
    //   this.props.history.push('/layout/dashboard')
    //   window.location.reload()
    // }, 300)
    this.props.getAuth(232)
    this.props.form.validateFieldsAndScroll(async (err, fieldsValue) => {
      if (!err) {
        // fetchLogin(fieldsValue).then(res => {
        //   console.log(res)
        // })
        // fetchJsonp('http://47.105.60.116:8002/api/user/login', {
        //   method: 'POST',
        //   mode: 'no-cors', //可以在这设置跨域
        //   headers: {
        //     'Content-Type': 'application/json;charset=utf-8'
        //   },
        //   body: fieldsValue
        // })
        //   .then(response => response.json())
        //   .then(json => {
        //     console.log('parsed json', json)
        //   })
        //   .catch(ex => {
        //     console.log('parsing failed', ex)
        //   })
        // $.ajax({
        //   url: 'http://47.105.60.116:8002/api/user/login', //用作跨域的url
        //   body: fieldsValue,
        //   dataType: 'jsonp', //jsonp类型
        //   jsonp: 'callbacks', //测试项目一中的返回函数名
        //   success: data => {
        //     console.log(data)
        //   }
        // })
        const { code, results } = await fetchLogin(fieldsValue)
        if (code) {
          // 设置6小时
          const inFifteenMinutes = new Date(
            new Date().getTime() + 6 * 60 * 60 * 1000
          )
          this.props.setLoginUserInfo(results)
          cookies.set('tokenUid', results.id, { expires: inFifteenMinutes })
          await this.initAuthList()
        } else {
          this.setState(
            {
              userLogin: {
                validateCode: ''
              }
            },
            () => {
              this.initCode()
            }
          )
        }
      }
    })
  };
  initAuthList = async () => {
    const { code, results } = await fetchUserAuthList()
    if (code) {
      this.props.getAuth(results)
      setTimeout(() => {
        this.props.history.push('/layout/dashboard')
        window.location.reload()
      }, 300)
    }
  };
  render () {
    const { getFieldDecorator } = this.props.form
    const { userLogin } = this.state
    const formItemLayout = {
      labelCol: {
        xs: { span: 4 }
      },
      wrapperCol: {
        xs: { span: 20 }
      }
    }

    return (
      <DocumentTitle title="登录-畅游汽车后台管理系统">
        <div className="HorizontalLoginForm">
          <div className="form-box">
            <div className="form-logo"></div>
            <Form>
              <Form.Item>
                {getFieldDecorator('username', {
                  initialValiue: userLogin.username,
                  rules: [ { required: true, message: '账号不能为空' } ]
                })(
                  <Input
                    size="large"
                    prefix={
                      <Icon type="user" style={ { color: 'rgba(0,0,0,.25)' } } />
                    }
                    placeholder="请输入账号"
                  />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('password', {
                  initialValiue: userLogin.password,
                  rules: [ { required: true, message: '密码不能为空' } ]
                })(
                  <Input.Password
                    size="large"
                    prefix={
                      <Icon type="lock" style={ { color: 'rgba(0,0,0,.25)' } } />
                    }
                    placeholder="请输入密码"
                  />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('validateCode', {
                  initialValiue: userLogin.validateCode,
                  rules: [ { required: true, message: '验证码不能为空' } ]
                })(
                  <Row gutter={ 8 }>
                    <Col span={ 16 }>
                      <Input
                        size="large"
                        placeholder="请输入验证码"
                        onKeyUp={ this.onKeyup }
                      />
                    </Col>
                    <Col span={ 8 }>
                      <Button
                        size="large"
                        className="code-btn"
                        onClick={ this.initCode }
                      >
                        <img src={ userLogin.imgCode } />
                      </Button>
                    </Col>
                    <Col span={ 24 }>点击图片刷新验证码</Col>
                  </Row>
                )}
              </Form.Item>
              {/* <Form.Item></Form.Item> */}
            </Form>
            <Button
              size="large"
              type="primary"
              className="login-btn"
              onClick={ this.handleSubmit }
            >
              登录
            </Button>
          </div>
        </div>
      </DocumentTitle>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAuth: params => {
      dispatch({ type: 'GET_AUTH_LIST', payload: params })
    },
    setLoginUserInfo: params => {
      dispatch({ type: 'SET_LOGIN_USER_INFO', payload: params })
    }
  }
}
export default connect(
  '',
  mapDispatchToProps
)(Form.create({ name: 'login' })(withRouter(Login)))
