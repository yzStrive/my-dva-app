import React from "react"
import PropTypes from "prop-types"
import { Layout, message,Menu } from "antd"
import DocumentTitle from "react-document-title"
import { connect } from "dva"
import { Route, Redirect, Switch, routerRedux } from "dva/router"
import { ContainerQuery } from "react-container-query"
import classNames from "classnames"
import { enquireScreen } from "enquire-js"
import GlobalHeader from "../components/GlobalHeader"
import SiderMenu from "../components/SiderMenu"
import NotFound from "../routes/Exception/404"
import { getRoutes } from "../utils/utils"
import { getMenuData } from "../common/menu"
import logo from "../assets/logo.svg"

const { Content, Header } = Layout

/**
 * 根据菜单取得重定向地址.
 */
const redirectData = []
const getRedirect = item => {
  if (item && item.children) {
    if (item.children[0] && item.children[0].path) {
      redirectData.push({
        from: `${item.path}`,
        to: `${item.children[0].path}`
      })
      item.children.forEach(children => {
        getRedirect(children)
      })
    }
  }
}
getMenuData().forEach(getRedirect)

/**
 * 获取面包屑映射
 * @param {Object} menuData 菜单配置
 * @param {Object} routerData 路由配置
 */
const getBreadcrumbNameMap = (menuData, routerData) => {
  const result = {}
  const childResult = {}
  for (const i of menuData) {
    if (!routerData[i.path]) {
      result[i.path] = i
    }
    if (i.children) {
      Object.assign(childResult, getBreadcrumbNameMap(i.children, routerData))
    }
  }
  return Object.assign({}, routerData, result, childResult)
}

const query = {
  "screen-xs": {
    maxWidth: 575
  },
  "screen-sm": {
    minWidth: 576,
    maxWidth: 767
  },
  "screen-md": {
    minWidth: 768,
    maxWidth: 991
  },
  "screen-lg": {
    minWidth: 992,
    maxWidth: 1199
  },
  "screen-xl": {
    minWidth: 1200
  }
}

let isMobile
enquireScreen(b => {
  isMobile = b
})
@connect(({ user }) => ({
  currentUser: user.currentUser
}))
export default class BasicLayout extends React.PureComponent {
  static childContextTypes = {
    location: PropTypes.object,
    breadcrumbNameMap: PropTypes.object
  }
  state = {
    isMobile
  }
  getChildContext() {
    const { location, routerData } = this.props
    return {
      location,
      breadcrumbNameMap: getBreadcrumbNameMap(getMenuData(), routerData)
    }
  }
  componentDidMount() {
    enquireScreen(mobile => {
      this.setState({
        isMobile: mobile
      })
    })
    this.props.dispatch({
      type: "user/fetchCurrent"
    })
  }
  getPageTitle() {
    const { routerData, location } = this.props
    const { pathname } = location
    let title = "Ant Design"
    if (routerData[pathname] && routerData[pathname].name) {
      title = `${routerData[pathname].name} - Ant Design`
    }
    return title
  }
  getBashRedirect = () => {
    // According to the url parameter to redirect
    // 这里是重定向的,重定向到 url 的 redirect 参数所示地址
    const urlParams = new URL(window.location.href)

    const redirect = urlParams.searchParams.get("redirect")
    // Remove the parameters in the url
    if (redirect) {
      urlParams.searchParams.delete("redirect")
      window.history.replaceState(null, "redirect", urlParams.href)
    } else {
      const { routerData } = this.props
      // get the first authorized route path in routerData
      const authorizedPath = Object.keys(routerData).find(
        item => item && item !== "/"
      )
      return authorizedPath
    }
    return redirect
  }
  handleMenuCollapse = collapsed => {
    this.props.dispatch({
      type: "global/changeLayoutCollapsed",
      payload: collapsed
    })
  }
  handleNoticeClear = type => {
    message.success(`清空了${type}`)
    this.props.dispatch({
      type: "global/clearNotices",
      payload: type
    })
  }
  handleMenuClick = ({ key }) => {
    this.props.dispatch(routerRedux.push(key))
  }
  handleNoticeVisibleChange = visible => {
    if (visible) {
      this.props.dispatch({
        type: "global/fetchNotices"
      })
    }
  }
  render() {
    const {
      currentUser,
      collapsed,
      fetchingNotices,
      notices,
      routerData,
      match,
      location
    } = this.props
    const bashRedirect = this.getBashRedirect()
    const layout = (
      <Layout>
          <GlobalHeader
          logo={logo}
          currentUser={currentUser}
          onMenuClick={this.handleMenuClick} />
        <Layout>
          <SiderMenu
            menuData={getMenuData()}
            collapsed={collapsed}
            location={location}
            isMobile={this.state.isMobile}
            onCollapse={this.handleMenuCollapse}
          />
          <Layout>
            <Content style={{ margin: "24px 24px 0", height: "100%" }}>
              <Switch>
                {redirectData.map(item => (
                  <Redirect key={item.from} exact from={item.from} to={item.to} />
                ))}
                {getRoutes(match.path, routerData).map(item => (
                  <Route
                    key={item.key}
                    path={item.path}
                    component={item.component}
                    exact={item.exact}
                  />
                ))}
                <Redirect exact from="/" to={bashRedirect} />
                <Route render={NotFound} />
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    )

    return (
      <DocumentTitle title={this.getPageTitle()}>
        <ContainerQuery query={query}>
          {params => <div className={classNames(params)}>{layout}</div>}
        </ContainerQuery>
      </DocumentTitle>
    )
  }
}
