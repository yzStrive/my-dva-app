import { routerRedux } from 'dva/router';
import { fakeAccountLogin } from '../services/api';
import { getFirstLevelMenu,getSecondaryMenu} from '../services/global'
import * as menuHelper from '../utils/menu'
export default {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(fakeAccountLogin, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      // Login successfully
      if (response.status === 'ok') {
        //handle menu tree
        const firstResponse = yield call(getFirstLevelMenu)
        menuHelper.setFirstLevelMenu(firstResponse)

        const sencondaryResponse = yield call(getSecondaryMenu)
        console.log(sencondaryResponse)
        const secondaryMenu = menuHelper.handleTree(sencondaryResponse)
        menuHelper.setSecondaryMenu(secondaryMenu)

        menuHelper.updateMenusHiddenProp(menuHelper.getFirstLevelMenu()[0].scope)
        // push url
        yield put(routerRedux.push('/'));
      }
    },
    *logout(_, { put, select }) {
      try {
        // get location pathname
        const urlParams = new URL(window.location.href);
        const pathname = yield select(state => state.routing.location.pathname);
        // add the parameters in the url
        urlParams.searchParams.set('redirect', pathname);
        window.history.replaceState(null, 'login', urlParams.href);
      } finally {
        yield put({
          type: 'changeLoginStatus',
          payload: {
            status: false,
            currentAuthority: 'guest',
          },
        });
        yield put(routerRedux.push('/user/login'));
      }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    }
  },
};
