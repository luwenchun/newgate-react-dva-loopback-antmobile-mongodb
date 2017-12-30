import * as indexServices from '../services/indexs';
import { routerRedux } from 'dva/router';

export default {
  namespace: 'indexs',
  state: {

  },

  reducers: {

  },

  effects: {
    *gomall({ payload }, { call, put }) {
      console.log(2);
      yield put(routerRedux.push('/mall'));
    }
  },

  subscriptions: {

  }
}