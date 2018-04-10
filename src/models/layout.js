import {getSecondaryMenu,updateMenusHiddenProp} from '../utils/menu'
import { routerRedux } from 'dva/router'
const defaultMenuData = getSecondaryMenu()
export default {
  namespace: "layout",

  state: {
    collapsed: false,
    menuData:defaultMenuData
  },

  effects: {
    *updateMenuData({scope,key},{put}){
      updateMenusHiddenProp(scope)
      const menuData = getSecondaryMenu()
      yield put({
        type:"updateMenu",
        payload:menuData
      })
      yield put(routerRedux.push(key))
    }

  },

  reducers: {
    changeLayoutCollapsed(state, { payload }) {
      return {
        ...state,
        collapsed: payload
      }
    },
    updateMenu(state,{payload}){
      return {
        ...state,
        menuData:payload
      }
    }
  },
}
