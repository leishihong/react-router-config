import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import '@/style/index.less'
import history from '@/lib/history'

class App extends Component {
  static propTypes = {
    children: PropTypes.object,
    location: PropTypes.object,
    isLogin: PropTypes.bool,
    history: PropTypes.object
  };
  componentDidMount () {
    if (!this.props.isLogin) {
      setTimeout(() => {
        this.props.history.push('/login')
      }, 300)
    }
    if (this.props.isLogin && this.props.location.pathname === '/login') {
      setTimeout(() => {
        this.props.history.push('/')
      }, 300)
    }
    console.log(this.props, 'login')
  }

  componentDidUpdate () {
    if (!this.props.isLogin) {
      setTimeout(() => {
        this.props.history.push('/login')
      }, 300)
    }
  }
  render () {
    return this.props.children
  }
}

export default withRouter(App)
