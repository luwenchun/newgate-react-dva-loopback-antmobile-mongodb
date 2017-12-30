import * as adsRuleServer from '../../services/mall/adsRuleServer';
import * as localName from '../../utils/constant';
import { routerRedux } from 'dva/router';
import { Toast } from 'antd-mobile';
export default {
  namespace: 'adsrule',
  state: {
    adsdata: [],
    editdata: {
      "recipient": "",
      "province": "",
      "city": "",
      "distinct": "无",
      "detailAddress": "",
      "mobile": "",
      "phone": "",
      "email": "",
      "ails": "1",//  city+收件人
      "isDefault": false,
    },
    adslenght: 0
  },

  reducers: {
    adsInitial(state, { payload: data }) {
      return {
        ...state,
        adsdata: data
      }
    },
    // 获取一条数据
    editdata(state, { payload: data }) {
      return {
        ...state,
        editdata: data
      }
    },

    // form 表单
    infochange(state, { payload: data }) { //修改收件人
      const editdata = { ...state.editdata, recipient: data };
      return {
        ...state,
        editdata
      }
    },
    phonechange(state, { payload: data }) { // 修改手机
      const editdata = { ...state.editdata, mobile: data };
      return {
        ...state,
        editdata
      }
    },
    detailAddressChange(state, { payload: data }) {// 修改地址
      const editdata = { ...state.editdata, detailAddress: data };
      return {
        ...state,
        editdata
      }
    },
    pickerchange(state, { payload: data }) { // 修改地区
      const editdata = {
        ...state.editdata,
        "province": data[0],
        "city": data[1],
        "distinct": data[2],
      };
      return {
        ...state,
        editdata
      }
    },

    resetValue(state, { payload }) { // 重置数据
      return {
        ...state,
        editdata: {
          "recipient": "",
          "province": "",
          "city": "",
          "distinct": "",
          "detailAddress": "",
          "mobile": "",
          "phone": "",
          "email": "",
          "ails": "1",//  city+收件人
          "isDefault": false,
          "clientMallInfoId": ''
        }
      }
    }

  },

  effects: {
    *loaddata({ payload }, { call, put }) {
      let data = yield call(adsRuleServer.loaddatalist);
      // 判断是否只有一条数据 默认设置为默认数据
      if (data.data.length == 1) {
        let id = data.data[0].id;
        yield call(adsRuleServer.onedefault, id);
        yield put({
          type: 'adsInitial',
          payload: data.data
        });
      }

      yield put({
        type: 'adsInitial',
        payload: data.data
      });
    },
    // 跳转到新增地址页面
    *addAddress({ payload }, { call, put }) {
      yield put(routerRedux.push({
        pathname: '/adsedit',
        query: {
          page: 2
        }
      }));
    },
    // 返回路由
    *backAdsrule({ payload }, { call, put }) {
      yield put(routerRedux.push('/adsrule'));
    },
    // 判断当超过10条数据就警告用户

    // 新增地址
    *add({ payload: data }, { call, put, select }) {
      let d = yield select(state => state.adsrule.editdata);
      d.ails = d.city + d.recipient;
      // 判断是否满十条数据 满了就提示用户
      let dataLen = yield call(adsRuleServer.loaddatalist);
      if (dataLen.data.length >= 10) return Toast.info('收货地址不能超过十条');
      // 判断
      if (!d.recipient) return Toast.info('收件人不能为空');
      if (!d.province) return Toast.info('省份不能为空');
      if (!d.city) return Toast.info('城市不能为空');
      if (!d.detailAddress) return Toast.info('详细地址不能为空');
      if (!d.mobile) return Toast.info('手机号不能为空');
      d.distinct = d.distinct ? d.distinct : '无';
      let datas = yield call(adsRuleServer.add, d);

      // 恢复默认
      yield put({
        type: 'resetValue'
      });
      yield put(routerRedux.push('/adsrule'));
    },

    // 跳转显示编辑单条数据
    *edit({ payload: id }, { call, put }) {
    
      let data = yield call(adsRuleServer.edit, id);
      console.log (data)
      yield put({
        type: 'editdata',
        payload: data.data
      });
      yield put(routerRedux.push('/adsedit'));
    },

    // 更新地址
    *update({ payload: s }, { call, put, select }) {
      let d = yield select(state => state.adsrule.editdata);
      d.ails = d.city + d.recipient;
      // 判断
      if (!d.recipient) return Toast.info('收件人不能为空');
      if (!d.province) return Toast.info('省份不能为空');
      if (!d.city) return Toast.info('城市不能为空');
      if (!d.detailAddress) return Toast.info('详细地址不能为空');
      if (!d.mobile) return Toast.info('手机号不能为空');
      d.distinct = d.distinct ? d.distinct : '无';

      let data = yield call(adsRuleServer.editvalue, d);
      // 恢复默认
      yield put({
        type: 'resetValue'
      });
      yield put(routerRedux.push('/adsrule'));
    },
    // 删除地址
    *del({ payload: id }, { call, put, select }) {
      yield call(adsRuleServer.del, id.id);
      if (id.type == 'edit') {
        yield put(routerRedux.push('/adsrule'));
      }
      if (id.type == 'list') {
        yield put({
          type: 'loaddata'
        });
      }

    }

  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname == '/adsrule') {
          dispatch({ type: 'loaddata' });
        } else if (location.pathname == '/adsedit') {
          // dispatch({ type: 'adsedit' });
        }
      });
    }
  }
}