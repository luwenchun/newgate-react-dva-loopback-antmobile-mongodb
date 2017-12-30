import * as homeServer from '../services/homepage.js';
import { routerRedux } from 'dva/router';

export default {
  namespace: 'homepage',
  state: {

  },

  reducers: {

  },

  effects: {
    *changeIndex({payload}, { call, put }) {
      yield put(routerRedux.push('/homepage/indexs'));
    },
    *changeCalendar({payload}, { call, put }) {
      yield put(routerRedux.push('/homepage/calendar'));
    },
    *changeInfo({payload}, { call, put }) {
      yield put(routerRedux.push('/homepage/info'));
    },
    *changeMy({payload}, { call, put }) {
      yield put(routerRedux.push('/homepage/my'));
    }
    

  },

  subscriptions: {

  }
}