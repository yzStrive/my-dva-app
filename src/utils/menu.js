const firstLevel = "firstMenuTree"
const sencondary = "secondaryMenuTree"
const currentScope = "currentScope"
export const getCurrentScope = ()=>{
  return sessionStorage.getItem(currentScope)
}
export const setCurrentScope = (scope)=>{
  sessionStorage.setItem(currentScope,scope)
}
export const getSecondaryMenu = () => {
  const result = sessionStorage.getItem(sencondary) || "[]"
  return JSON.parse(result)
}
export const setSecondaryMenu = menu => {
  sessionStorage.setItem(sencondary, JSON.stringify(menu || []))
}
export const getFirstLevelMenu = () => {
  const result = sessionStorage.getItem(firstLevel) || "[]"
  return JSON.parse(result)
}
export const setFirstLevelMenu = menu => {
  const newMenu = handleFirstTree(menu)
  sessionStorage.setItem(firstLevel, JSON.stringify(newMenu || []))
}
/**
 * 根据当前类型更新菜单的隐藏属性
 * @param {string} type
 */
export const updateMenusHiddenProp = type => {
  const menus = getSecondaryMenu()
  menus.forEach(item => {
    if (item.parent !== type) {
      item.hideInMenu = true
    } else {
      item.hideInMenu = false
    }
  })
  setSecondaryMenu(menus)
}
/**／
 * 转换树结构
 * @param {array} trees
 */
export const handleTree = trees => {
  return trees.map(item => {
    // const path = item.menuUrl ? item.menuUrl : `/${item.menuCode}`
    const parent = item.upMenuCode ? item.upMenuCode : item.menuScope
    const result = {
      parent,
      name: item.menuName,
      icon: item.menuIcon,
      code: item.menuCode
    }
    if (item.children.length > 0) {
      result.children = handleTree(item.children)
    } else {
      result.path = item.menuUrl
    }
    return result
  })
}
/**
 * 转换一级菜单树
 * @param {array} trees
 */
export const handleFirstTree = trees => {
  return trees.map(item => {
    let { name, scope } = item
    return {
      name,
      scope,
      path: `/${scope}`
    }
  })
}

/**
 *
 * @param {array} menus
 */
export const getPaths = menus => {
  let paths = []
  menus.forEach(item => {
    if (item.path) {
      paths.push(item.path)
    } else {
      if (item.children) {
        paths = [...paths, ...getPaths(item.children)]
      }
    }
  })
  return paths
}
/**
 *
 * @param {array} menus
 * @param {code} code
 */
export function getPathByCode(menus, code) {
  let path
  const inner = (menus, code) => {
    if (path) return path
    let len = menus.length
    for (let i = 0; i < len; i++) {
      let item = menus[i]
      if (item.code === code) {
        path = item.path
        break
      } else {
        if (item.children) {
          path = inner(item.children, code)
        }
      }
    }
    return path
  }
  return inner(menus,code)
}
/**
 *根据url获取对应菜单的code
 * @param {array} menus  菜单数组
 * @param {string} path  路径
 */
export function getCodeByPath(menus, path){
  let code
  const inner = (menus, path) => {
    if (code) return code
    let len = menus.length
    for (let i = 0; i < len; i++) {
      let item = menus[i]
      if (path.indexOf(item.path) !== -1) {
        code = item.code
        break
      } else {
        if (item.children) {
          code = inner(item.children, path)
        }
      }
    }
    return code
  }
  return inner(menus,path)
}
/**
 * 根据code获取parent
 * @param {array} menus
 * @param {string} code
 */
export const getParentByCode = (menus, code) => {
  let parent
  const inner = (menus, code) => {
    if (parent) return parent
    let len = menus.length
    for (let i = 0; i < len; i++) {
      let item = menus[i]
      if (item.code === code) {
        parent = item.parent
        break
      } else {
        if (item.children) {
          parent = inner(item.children, code)
        }
      }
    }
    return parent
  }
  return inner(menus,code)
}
/**
 * 根据code获取parents
 * @param {array} menus
 * @param {string} initCode
 */
export const getParentsByCode = (menus, initCode) => {
  let parents = []
  const parent = getParentByCode(menus, initCode)
  //有父级才继续找
  if (parent) {
    parents.push(parent)
    parents = [...parents, ...getParentsByCode(menus, parent)]
  }
  return parents
}
