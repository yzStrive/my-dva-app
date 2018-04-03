import React, { Component } from "react"
import { routerRedux, Route, Switch } from "dva/router"
import { connect } from "dva"
import { Input } from "antd"
import PageHeaderLayout from "../../layouts/PageHeaderLayout"
import { getRoutes } from "../../utils/utils"

@connect(({list,loading})=>({
  list,
  loading:loading.models.list
}))
export default class SearchList extends Component {
  componentDidMount(){
    this.props.dispatch({
      type:'list/fetchUser',
      payload:{
        count:5
      }
    })
  }
  render() {
    const {list:{ list }} = this.props
    const lis = list.map((item,index)=>{
      return <li key={index}>{item.name}</li>
    })
    return <div><ul>{lis}</ul></div>
  }
}
