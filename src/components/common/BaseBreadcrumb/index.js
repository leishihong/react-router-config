import React, { PureComponent, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Breadcrumb, Icon } from 'antd'
import routesConfig from '@/router/modules'
import { PropTypes } from 'prop-types'

class BaseBreadcrumb extends PureComponent {
  static propTypes = {
    location: PropTypes.object
  };
  constructor (props) {
    super(props)

    this._breadcrumbList = []
    // this.updateTitle(this.props)
    this.renderBreadcrumbList(routesConfig, this.props)
  }
  state = {
    pathname: this.props.location.pathname
  };
  componentWillReceiveProps (nextProps, nextContext) {
    if (nextProps.location.pathname !== this.props.location.pathname) {
      this._breadcrumbList = []
      this.renderBreadcrumbList(routesConfig, nextProps)
    }
  }
  routerB = data => {
    data.map(item => {
      if (item.childRoutes) {
        this.routerB(item.childRoutes)
      }
      if (item.path === '/layout/shop/car-city') {
        this._breadcrumbList.push({
          title: item.meta.title,
          icon: item.icon
        })
        console.log(item, 'route.parentKey')
      }
    })
  };
  renderBreadcrumbList = (routes, props) => {
    for (const route of routes) {
      if (route.path === props.location.pathname) {
        if (route.parentKey) {
          const parentItem = routesConfig.find(r => r.path === route.parentKey)
          if (parentItem) {
            this._breadcrumbList.push({
              title: parentItem.meta.title,
              icon: parentItem.icon
            })
          }
        }
        this._breadcrumbList.push({
          title: route.meta.title,
          path: route.path,
          icon: route.icon
        })
      } else if (route.childRoutes && route.childRoutes.length > 0) {
        this.renderBreadcrumbList(route.childRoutes, props)
      }
    }
  };

  render () {
    const styleBreadcrumb = {
      background: '#fff',
      fontSize: 16,
      paddingLeft: 20,
      paddingTop: 10,
      paddingBottom: 10,
      marginBottom: 20
    }
    const breadcrumbLink = {
      color: '#999'
    }
    return (
      <Breadcrumb style={ styleBreadcrumb }>
        {location.pathname !== '/layout/dashboard' && (
          <Breadcrumb.Item>
            <Link to="/layout/dashboard" className="breadcrumb-link">
              <span style={ breadcrumbLink }>首页</span>
            </Link>
          </Breadcrumb.Item>
        )}
        {this._breadcrumbList.map(item => {
          return (
            <Breadcrumb.Item key={ item.path }>
              {item.path ? (
                <Link to={ item.path } className="breadcrumb-link">
                  {item.icon && <Icon type={ item.icon } />}
                  <span>{item.title}</span>
                </Link>
              ) : (
                <Fragment>
                  {item.icon && <Icon type={ item.icon } />}
                  <span style={ breadcrumbLink }>{item.title}</span>
                </Fragment>
              )}
            </Breadcrumb.Item>
          )
        })}
      </Breadcrumb>
    )
  }
}
export default BaseBreadcrumb
