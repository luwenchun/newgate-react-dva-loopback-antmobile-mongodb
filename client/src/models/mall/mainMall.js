import * as mallServer from '../../services/mall/mainMall';
import { routerRedux } from 'dva/router';

export default {
  namespace: 'mainmall',
  state: {

  },

  reducers: {

  },

  effects: {
    // 跳转到商城
    *linkShop({ payload }, { call, put }) {
      yield put(routerRedux.push('/mall/shop'));
    },
    // 跳转到购物车    
    *linkShopcart({ payload }, { call, put }) {
      yield put(routerRedux.push('/mall/shopcart'));
    },
    // 跳转到已购买   
    *linkYetshop({ payload }, { call, put }) {
      yield put(routerRedux.push('/mall/yetshop'));
    },
    // 跳转到我的    
    *linkMyshop({ payload }, { call, put }) {
      yield put(routerRedux.push('/mall/myshop'));
    }
  },

  subscriptions: {

  }
}