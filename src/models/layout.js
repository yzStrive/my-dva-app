import {
  getSecondaryMenu,
  updateMenusHiddenProp,
  getCurrentScope,
  setCurrentScope
} from "../utils/menu"
import { routerRedux } from "dva/router"
const menuDatas = getSecondaryMenu()
const currentScope = getCurrentScope()
export default {
  namespace: "layout",

  state: {
    collapsed: false,
    menuData: menuDatas,
    currentScope: currentScope
  },
  effects: {
    *updateMenuData({ payload }, { put }) {
      const { currentScope, path } = payload
      const lastScope = getCurrentScope()
      if (lastScope !== currentScope) {
        yield updateMenusHiddenProp(currentScope)
        yield setCurrentScope(currentScope)
        const menuData = getSecondaryMenu()
        yield put({
          type: "updateMenu",
          payload: { menuData, currentScope }
        })
        yield put(routerRedux.push(path))
      }
    }
  },

  reducers: {
    changeLayoutCollapsed(state, { payload }) {
      return {
        ...state,
        collapsed: payload
      }
    },
    updateMenu(state, { payload }) {
      return {
        ...state,
        ...payload
      }
    }
  }
}
