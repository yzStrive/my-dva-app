import React, { PureComponent } from "react"
import { Layout, Menu, Icon } from "antd"
import pathToRegexp from "path-to-regexp"
import { Link } from "dva/router"
import styles from "./index.less"
import { urlToList } from "../../utils/urlTool"
import {
  getPathByCode,
  getCodeByPath,
  getParentByCode,
  getParentsByCode
} from "../../utils/menu"

const { Sider } = Layout
const { SubMenu } = Menu

// Allow menu.js config icon as string or ReactNode
//   icon: 'setting',
//   icon: 'http://demo.com/icon.png',
//   icon: <Icon type="setting" />,
const getIcon = icon => {
  if (typeof icon === "string" && icon.indexOf("http") === 0) {
    return (
      <img
        src={icon}
        alt="icon"
        className={`${styles.icon} sider-menu-item-img`}
      />
    )
  }
  if (typeof icon === "string") {
    return <Icon type={icon} />
  }
  return icon
}

export default class SiderMenu extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      openKeys: this.getSelectedMenuKeys(props)
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname !== this.props.location.pathname) {
      this.setState({
        openKeys: this.getSelectedMenuKeys(nextProps)
      })
    }
  }
  /**
   * Convert pathname to openKeys(codes)
   * @param   props
   */
  getSelectedMenuKeys(props) {
    const { location: { pathname }, menuData } = props || this.props
    const code = getCodeByPath(menuData, pathname)
    const parents = getParentsByCode(menuData, code)
    return [...parents,code]
  }

  /**
   * 判断是否是http链接.返回 Link 或 a
   * Judge whether it is http link.return a or Link
   * @memberof SiderMenu
   */
  getMenuItemPath = item => {
    const itemPath = this.getPathByCode(item.code)
    const icon = getIcon(item.icon)
    const { target, name } = item
    // Is it a http link
    if (/^https?:\/\//.test(itemPath)) {
      return (
        <a href={itemPath} target={target}>
          {icon}
          <span>{name}</span>
        </a>
      )
    }
    return (
      <Link
        to={itemPath}
        target={target}
        replace={itemPath === this.props.location.pathname}
        onClick={
          this.props.isMobile
            ? () => {
                this.props.onCollapse(true)
              }
            : undefined
        }
      >
        {icon}
        <span>{name}</span>
      </Link>
    )
  }
  getPathByCode(code) {
    const { menuData } = this.props
    return getPathByCode(menuData, code)
  }
  /**
   * get SubMenu or Item
   */
  getSubMenuOrItem = item => {
    if (item.children && item.children.some(child => child.name)) {
      const childrenItems = this.getNavMenuItems(item.children)
      // 当无子菜单时就不展示菜单
      if (childrenItems && childrenItems.length > 0) {
        return (
          <SubMenu
            title={
              item.icon ? (
                <span>
                  {getIcon(item.icon)}
                  <span>{item.name}</span>
                </span>
              ) : (
                item.name
              )
            }
            key={item.code}
          >
            {childrenItems}
          </SubMenu>
        )
      }
      return null
    } else {
      return <Menu.Item key={item.code}>{this.getMenuItemPath(item)}</Menu.Item>
    }
  }
  /**
   * 获得菜单子节点
   * @memberof SiderMenu
   */
  getNavMenuItems = menusData => {
    if (!menusData) {
      return []
    }
    return menusData
      .filter(item => item.name && !item.hideInMenu)
      .map(item => {
        // make dom
        const ItemDom = this.getSubMenuOrItem(item)
        return ItemDom
      })
      .filter(item => item)
  }

  isMainMenu = (key, menus) => {
    return menus.some(item => key && (item.key === key || item.code === key))
  }
  handleOpenChange = (openKeys, menus) => {
    const lastOpenKey = openKeys[openKeys.length - 1]
    const moreThanOne =
      openKeys.filter(openKey => this.isMainMenu(openKey, menus)).length > 1
    this.setState({
      openKeys: moreThanOne ? [lastOpenKey] : [...openKeys]
    })
  }
  render() {
    const { logo, collapsed, onCollapse, menuData } = this.props
    const { openKeys } = this.state
    // Don't show popup menu when it is been collapsed
    const menuProps = collapsed
      ? {}
      : {
          openKeys
        }
    // if pathname can't match, use the nearest parent's key
    let selectedKeys = this.getSelectedMenuKeys()
    if (!selectedKeys.length) {
      selectedKeys = [openKeys[openKeys.length - 1]]
    }
    return (
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        breakpoint="lg"
        onCollapse={onCollapse}
        width={256}
        className={styles.sider}
      >
        <Menu
          key="Menu"
          theme="dark"
          mode="inline"
          {...menuProps}
          onOpenChange={openKeys => this.handleOpenChange(openKeys, menuData)}
          selectedKeys={selectedKeys}
          style={{ padding: "16px 0", width: "100%" }}
        >
          {this.getNavMenuItems(menuData)}
        </Menu>
      </Sider>
    )
  }
}
