const firstLevel = "firstMenuTree"
const sencondary = "secondaryMenuTree"
export const getSecondaryMenu = () => {
  const result = sessionStorage.getItem(sencondary) || "[]"
  return JSON.parse(result)
}
export const setSecondaryMenu = menu => {
  const newMenu = handleTree(menu)
  return sessionStorage.setItem(sencondary, JSON.stringify(newMenu || []))
}
export const getFirstLevelMenu = () => {
  const result = sessionStorage.getItem(firstLevel) || "[]"
  return JSON.parse(result)
}
export const setFirstLevelMenu = menu => {
  const newMenu = handleFirstTree(menu)
  return sessionStorage.setItem(firstLevel, JSON.stringify(newMenu || []))
}

export const updateMenus = type => {
  const menus = getSecondaryMenu()
  const mapMenus = menus.map(item => {
    return {
      name: item.name,
      parent: ""
    }
  })
  menus.forEach(item => {
    if (item.menuScope !== type) {
      item.hideInMenu = true
    }
  })
}

const handleTree = trees => {
  return trees.map(item => {
    const path = item.menuUrl ? item.menuUrl : `/${item.menuCode}`
    const result = {
      path,
      name: item.menuName,
      icon: item.menuIcon,
      parent: item.menuScope
    }
    if (item.children) {
      result.children = handleTree(item.children)
    }
    return result
  })
}
const handleFirstTree = trees=>{
  return trees.map(item=>{
    let {name} = item
    return {
      name,
      path:`/${item.scope}`,
    }
  })
}
