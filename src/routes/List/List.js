import React, { Component } from "react"
import { connect } from "dva"

@connect(({list})=>({
  list,
  // loading:loading.models.list
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
      return <li key={index}>{item.name+'-'+(Date.now()+index)}</li>
    })
    return <div><ul>{lis}</ul></div>
  }
}
