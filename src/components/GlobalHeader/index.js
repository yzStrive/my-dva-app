import React, { PureComponent } from "react"
import { Menu, Icon, Spin, Tag, Dropdown, Avatar, Divider } from "antd"
import moment from "moment"
import groupBy from "lodash/groupBy"
import Debounce from "lodash-decorators/debounce"
import { Link } from "dva/router"
import styles from "./index.less"
import {
  getFirstLevelMenu,
  getPathByCode,
  getCodeByPath,
  getParentByCode,
  getParentsByCode
} from "../../utils/menu"

const firstMenuDatas = getFirstLevelMenu()
export default class GlobalHeader extends PureComponent {
  componentWillUnmount() {
    this.triggerResizeEvent.cancel()
  }
  /* eslint-disable*/
  @Debounce(600)
  triggerResizeEvent() {
    const event = document.createEvent("HTMLEvents")
    event.initEvent("resize", true, false)
    window.dispatchEvent(event)
  }
  render() {
    const { currentUser, onMenuClick,currentScope } = this.props
    const navMenu = firstMenuDatas.map((item, index) => (
      <Menu.Item key={item.scope}>
        <Icon />
        {item.name}
      </Menu.Item>
    ))
    return (
      <Menu
        onClick={onMenuClick}
        style={{ background: "#232f34",color:"#fff" }}
        mode="horizontal"
        selectedKeys={[currentScope]}
      >
        {navMenu}
      </Menu>
    )
  }
}
