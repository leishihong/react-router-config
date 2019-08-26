import React, { Component } from 'react'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import map from 'lodash/map'
import DocumentTitle from 'react-document-title'
import qs from 'query-string'
import routes from './modules'
// import renderRoutes from './renderRoutes'
import NotFound from '@/views/NotFound'
import { PropTypes } from 'prop-types'
import Main from '.././Main'
import Camera from '../views//shop-manage/Camera'
import cookies from 'js-cookie'

const isLogin = cookies.get('tokenUid') ? true : false // 如果登陆之后可以利用redux修改该值
const authPath = '/login' // 默认未登录的时候返回的页面，可以自行设置

require('promise.prototype.finally').shim()

class RouterApi extends Component {
  static propTypes = {
    router: PropTypes.object,
    location: PropTypes.object,
    history: PropTypes.object,
    authList: PropTypes.object
  };
  componentDidMount () {
    console.log(this.props.authList)
  }

  renderRoute = (r, extraProps = {}, switchProps = {}) =>
    !r.requiresAuth || isLogin || r.path === authPath ? (
      <Route
        key={ r.key }
        exact={ r.exact }
        path={ r.path }
        render={ props => {
          const { search } = props.location
          if (r.parentKey) {
            props.location.parentKey = r.parentKey
          }
          props.location.title = r.meta.title
          props.location.searchParams = qs.parse(search)
          return (
            <DocumentTitle title={ `${ r.meta.title }-畅游汽车后台管理系统` }>
              <Main>
                {/* <Route path={ r.path } component={ r.component } { ...props } r={ r } /> */}
                <r.component { ...props } r={ r } />
              </Main>
            </DocumentTitle>
          )
        } }
      />
    ) : (
      <Redirect
        key={ r.path }
        to={ {
          pathname: authPath,
          state: { from: this.props.location }
        } }
      />
    );
  /**
   * Recursive routing
   * 递归路由
   * @param routes
   * @returns {*}
   */
  mapRoutes = routeList => {
    return map(routeList, r => {
      if (r.childRoutes && r.childRoutes.length > 0) {
        return this.mapRoutes(r.childRoutes)
      } else {
        return this.renderRoute(r)
      }
    })
  };
  render () {
    return (
      <Switch location={ this.props.location }>
        {/* {renderRoutes(routes, isLogin, authPath)} */}
        {this.mapRoutes(routes)}
        {/* <Route
          path="/layout/shop/car-city"
          render={ () => {
            return (
              <Main>
                <Route
                  path="/layout/shop/car-city/camera"
                  component={ Camera }
                ></Route>
              </Main>
            )
          } }
        /> */}
        {/* <Route
          path="*"
          render={ () => (
            <Redirect to="/notFound" component={ NotFound }></Redirect>
          ) }
        /> */}
        <Route component={ NotFound } />
      </Switch>
    )
  }
}

const mapStateToProps = ({ authList }) => {
  return {
    authList: authList.authList
  }
}

export default connect(
  mapStateToProps,
  ''
)(withRouter(RouterApi))
