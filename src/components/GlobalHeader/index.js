import React, { PureComponent } from "react"
import { Menu, Icon, Spin, Tag, Dropdown, Avatar, Divider } from "antd"
import moment from "moment"
import groupBy from "lodash/groupBy"
import Debounce from "lodash-decorators/debounce"
import { Link } from "dva/router"
import styles from "./index.less"
import {  getFirstLevelMenu } from '../../utils/menu'
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
    const { currentUser, onMenuClick } = this.props
    const leftMenuDatas = getFirstLevelMenu()
    const leftMenu = leftMenuDatas.map((item, index) => (
      <Menu.Item key={item.path}>
        <Icon />
        {item.name}
      </Menu.Item>
    ))
    return (
      <Menu
        onClick={onMenuClick}
        style={{ background: "#232f34",color:"#fff" }}
        mode="horizontal"
      >
        {leftMenu}
      </Menu>
    )
  }
}
