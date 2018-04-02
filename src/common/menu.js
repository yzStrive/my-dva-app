import { isUrl } from "../utils/utils"

const menuData = [
  {
    name: "列表页",
    icon: "table",
    path: "list",
    children: [
      {
        name:'list首页',
        path:'index'
      },
    ]
  },

]
const formatter = (data, parentPath = "/", parentAuthority) => {
  return data.map(item => {
    let { path } = item
    if (!isUrl(path)) {
      path = parentPath + item.parentPath
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority
    }
    if (item.children) {
      result.children = formatter(
        item.children,
        `${parentPath}${item.path}/`,
        item.authority
      )
    }
    return result
  })
}

export const getMenuData = ()=>formatter(menuData)
