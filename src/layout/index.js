import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { BaseTop } from './includes'
import { withRouter } from 'react-router-dom'
import { Layout } from 'antd'
import { connect } from 'react-redux'
import { BaseMenu, BaseBreadcrumb } from '@/components/common'
import Routes from '@/router'
import './layout.less'

const { Header, Sider } = Layout

const preFix = 'ant-layout-components'

export class Root extends Component {
  static propTypes = {
    isCollapsed: PropTypes.bool,
    increment: PropTypes.func
  };
  state = {
    fixLeft: 0
  };
  componentDidMount () {
    this.setState({ fixLeft: this.props.isCollapsed ? 80 : 200 })
  }
  onCollapse = collapsed => {
    this.setState({ fixLeft: collapsed ? 80 : 200 }, () => {
      this.props.increment(!collapsed)
    })
  };

  render () {
    const mainContent = {
      minHeight: window.innerHeight - 158
    }
    return (
      <div className={ `${ preFix }` }>
        <Header className={ `${ preFix }-fixedHeader` }>
          <BaseTop></BaseTop>
        </Header>
        <Sider
          width={ 200 }
          style={ { background: '#fff' } }
          collapsible
          collapsed={ this.props.isCollapsed }
          onCollapse={ this.onCollapse }
          className={ `${ preFix }-slider` }
        >
          <BaseMenu isCollapsed={ this.props.isCollapsed } />
        </Sider>
        <section
          className={ `${ preFix }-wrapper` }
          style={ {
            left: this.state.fixLeft
          } }
        >
          <BaseBreadcrumb { ...this.props } />
          {/* <Breadcrumb className={ `${ preFix }-wrapper-breadcrumb` }>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb> */}
          <div className={ `${ preFix }-wrapper-main-content` } style={ mainContent }>
            <Routes />
          </div>
        </section>
      </div>
      // <BaseTop />
    )
  }
}

const mapStateToProps = ({ collapsed }) => {
  return { isCollapsed: collapsed.isCollapsed }
}
const mapDispatchToProps = dispatch => {
  return {
    increment: params => {
      dispatch({ type: 'SET_COLLAPSED', isCollapsed: !params })
    }
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Root))
