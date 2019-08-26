import React, { Component } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import history from '@/lib/history'

import App from '@/App'
import RouterConfig from './index.js/index.js' // 解决低版本浏览器不支持 promise finally 问题
import PropTypes from 'prop-types'

require('promise.prototype.finally').shim()

/**
 * forceRefresh: bool
 * 作用：当浏览器不支持 HTML5 的 history API 时强制刷新页面。
 */
const supportsHistory = 'pushState' in window.history
/**
 * getUserConfirmation: func
 * 作用：导航到此页面前执行的函数，默认使用 window.confirm
 * 使用场景：当需要用户进入页面前执行什么操作时可用，不过一般用到的不多。
 */
const getConfirmation = (message, callback) => {
  console.log(message, 'message')
  // if (localStorage.getItem('token')) {
  //   message.push('/login');
  // }
  if (message.location.pathname === '/') {
    message.push('/dashboard')
  } else {
    message.push(message.location.pathname)
  }
}

class RootRouter extends Component {
  render () {
    return (
      <Router
        history={ history }
        basename="/"
        getUserConfirmation={ getConfirmation(history, 'yourCallBack') }
        forceRefresh={ !supportsHistory }
      >
        {/* 路由入口 */}
        <App isLogin={ true }>
          <RouterConfig />
        </App>
      </Router>
    )
  }
}

export default RootRouter
