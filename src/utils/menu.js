const firstLevel = "firstMenuTree"
const sencondary = "secondaryMenuTree"
export const getSecondaryMenu = () => {
  const result = sessionStorage.getItem(sencondary) || '[]'
  return JSON.parse(result)
}
export const setSecondaryMenu = menu => {
  // const newMenu = handleTree(menu)
  console.log(menu)
  return sessionStorage.setItem(sencondary, JSON.stringify(menu || []))
}
export const getFirstLevelMenu = () => {
  const result = sessionStorage.getItem(firstLevel) || "[]"
  return JSON.parse(result)
}
export const setFirstLevelMenu = menu => {
  const newMenu = handleFirstTree(menu)
  return sessionStorage.setItem(firstLevel, JSON.stringify(newMenu || []))
}

export const updateMenusHiddenProp = (type) => {
  const menus = getSecondaryMenu()
  const parent = type.split('/').filter(i=>i)[0]
  menus.forEach(item => {
    if (item.parent !== type) {
      item.hideInMenu = true
    }else{
      item.hideInMenu = false
    }
  })
  setSecondaryMenu(menus)
}

export const handleTree = trees => {
  return trees.map(item => {
    // const path = item.menuUrl ? item.menuUrl : `/${item.menuCode}`
    const parent = item.upMenuCode?item.upMenuCode:item.menuScope
    const result = {
      parent,
      name: item.menuName,
      icon: item.menuIcon,
      code: item.menuCode
    }
    if (item.children.length>0) {
      result.children = handleTree(item.children)
    }else{
      result.path = item.menuUrl
    }
    return result
  })
}
export const handleFirstTree = trees=>{
  return trees.map(item=>{
    let {name,scope} = item
    return {
      name,
      scope,
      path:`/${scope}`,
    }
  })
}

export const handleList = ()=>{

}

