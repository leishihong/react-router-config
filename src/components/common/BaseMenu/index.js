import React, { PureComponent } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { map } from 'lodash'
import { Menu, Icon } from 'antd'
import MenuConfig from '@/utils/MenuConfig.js'
import { PropTypes } from 'prop-types'
import './index.less'
const SubMenu = Menu.SubMenu

class MenuList extends PureComponent {
  static propTypes = {
    location: PropTypes.object,
    isCollapsed: PropTypes.bool
  };
  state = {
    currentKey: '',
    OpenKeys: [],
    rootSubMenuKeys: [],
    MenuNodeTree: [],
    isCollapsed: this.props.isCollapsed,
    parentKey: ''
  };
  componentWillMount () {
    const location = window.location.hash
    const localPath = location.split('#')[ 1 ]
    console.log(location.split('#'), '22')
    const strange = window.localStorage.getItem('currentKey')
    const rootSubMenuKeys = map(MenuConfig, item => item.id)
    this.setState({ rootSubMenuKeys })
    this.menuOpenKey(MenuConfig, strange)
    const MenuNodeTree = this.renderMenu(MenuConfig)
    this.setState({
      MenuNodeTree: MenuNodeTree
    })
  }
  componentWillReceiveProps (nextProps) {
    setTimeout(() => {
      window.sessionStorage.setItem('parentKey', nextProps.location.parentKey)
    }, 300)
  }

  // 设置默认展开
  menuOpenKey = (data, strange) => {
    const parentKey = window.sessionStorage.getItem('parentKey')
    map(data, item => {
      if (item.children && item.children.length > 0) {
        return this.menuOpenKey(item.children, strange)
      }
      if (item.url === this.props.location.pathname || item.url === parentKey) {
        this.setState(
          {
            OpenKeys: this.state.isCollapsed ? [] : [ String(item.parent) ],
            currentKey: String(item.id)
          },
          () => {
            return
          }
        )
      }
    })
  };
  // 切换展开方式
  handleClick = (item, key) => {
    const currentKey = item.key
    if (key === this.state.currentKey) {
      return false
    }
    window.localStorage.setItem('currentKey', currentKey)
    this.setState({
      currentKey
    })
  };

  // 递归遍历节点
  renderMenu = data => {
    return map(data, item => {
      // 判断是否存在(item.children
      if (item.children && item.children.length > 0) {
        return (
          <SubMenu
            title={
              <span>
                <Icon type={ item.iconSkin }></Icon>
                <span>{item.text}</span>
              </span>
            }
            key={ item.id }
          >
            {this.renderMenu(item.children)}
          </SubMenu>
        )
      }
      // 单个菜单
      return (
        <Menu.Item
          title={
            <span>
              <Icon type={ item.iconSkin }></Icon>
              <span>{item.text}</span>
            </span>
          }
          key={ item.id }
        >
          <NavLink to={ item.url }>
            <Icon type={ item.iconSkin }></Icon>
            <span>{item.text}</span>
          </NavLink>
        </Menu.Item>
      )
    })
  };

  render () {
    console.log(this.state, 'fff')
    const { currentKey, OpenKeys, MenuNodeTree } = this.state
    return (
      <Menu
        onClick={ this.handleClick }
        defaultSelectedKeys={ [ currentKey ] }
        defaultOpenKeys={ OpenKeys }
        mode="inline"
        style={ {
          height: 'calc(100vh - 66px)',
          borderRight: 0,
          overflow: 'auto',
          paddingBottom: '48px'
        } }
      >
        {MenuNodeTree}
      </Menu>
    )
  }
}
// export default withRouter(MenuList)
const mapStateToProps = ({ authList }) => {
  return {
    authList: authList.authList
  }
}

export default connect(
  mapStateToProps,
  ''
)(withRouter(MenuList))
