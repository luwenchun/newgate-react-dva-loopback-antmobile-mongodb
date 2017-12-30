import * as myshopServer from '../../services/mall/myshopServer';
import { routerRedux } from 'dva/router';

export default {
  namespace: 'myshop',
  state: {

  },

  reducers: {

  },

  effects: {
    *linkadsRule({ paylaod }, { call, put }) {
      yield put(routerRedux.push('/adsrule'));
    }
  },

  subscriptions: {

  }
}