import { testProxy} from '../services/api'
export default {
  namespace: "list",
  state: {
    list: []
  },
  effects: {
    *fetchUser({ payload }, { call, put }) {
      const response = yield call(testProxy);
      yield put({
        type: 'queryList',
        payload: Array.isArray(response)?response:[]
      });
    },
  },
  reducers: {
    queryList(state,action){
      return {
        ...state,
        list:action.payload
      }
    }
  }
}
