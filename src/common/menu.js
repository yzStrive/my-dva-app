import { isUrl } from "../utils/utils"

const menuData = [
  {
    name: "配送",
    icon: "table",
    parent:'list',
    path: "list",
    children: [
      {
        name: "list",
        path: "test-list"
      }
    ]
  },
  {
    name: "租车",
    icon: "table",
    parent: "list1",
    path: "list1",
    children: [
      {
        name: "list",
        path: "test-list"
      }
    ]
  },
  {
    name: "换车",
    icon: "table",
    parent: "list2",
    path: "list2",
    children: [
      {
        name: "list",
        path: "test-list"
      }
    ]
  },
  {
    name: "系统",
    icon: "table",
    parent: "list3",
    path: "list3",
    children: [
      {
        name: "list",
        path: "test-list"
      }
    ]
  }
]
function formatter(data, parentPath = "/") {
  return data.map(item => {
    let { path } = item
    if (!isUrl(path)) {
      path = parentPath + item.path
    }
    const result = {
      ...item,
      path
    }
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`)
    }
    return result
  })
}

export const getMenuData = () => formatter(menuData)
