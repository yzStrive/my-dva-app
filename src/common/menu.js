import { isUrl } from "../utils/utils"
import { getSecondaryMenu, getFirstLevelMenu } from "../utils/menu"
function formatter(data) {
  return data.map(item => {
    const result = {
      ...item
    }
    if (item.children) {
      result.children = formatter(item.children)
    }
    return result
  })
}

export const getMenuData = () => formatter(getSecondaryMenu())
export const getFirstMenuData = () => getFirstLevelMenu()
