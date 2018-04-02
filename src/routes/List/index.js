import React, { Component } from "react"
import { routerRedux, Route, Switch } from "dva/router"
import { connect } from "dva"
import { Input } from "antd"
import PageHeaderLayout from "../../layouts/PageHeaderLayout"
import { getRoutes } from "../../utils/utils"

export default class SearchList extends Component {
  render() {
    return <h1>List Index</h1>
  }
}
