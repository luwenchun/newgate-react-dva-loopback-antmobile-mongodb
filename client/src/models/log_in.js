import { postlog, getdata } from "../services/login"
import { routerRedux } from 'dva/router';
import { storageTokenKey, start_date, overtime, user_id } from "../utils/constant"
import { Toast } from 'antd-mobile';

export default {
  namespace: 'log_in',

  state: {
    type: "text",
    uservalue: null,  // 手机/用户名输入框的值
    pswvalue: null  // 密码输入框的值
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/user_center' || location.pathname === '/cart') {
          dispatch({ type: "checktoken" })        // 路由匹配检查token
        }
      })
    }
  },

  effects: {
    *fetch_login({ payload: [postlist, uservalue, pswvalue] }, { call, put, select }) {  //  点击登录按钮
      function failuser() {
        Toast.fail('手机/用户名不能为空', 1);
      }
      function failpsw() {
        Toast.fail('密码不能为空', 1);
      }
      function fail_fetch() {
        Toast.fail('手机或密码错误', 1);
      }
      if (!uservalue) {
        failuser()
        return false
      }
      if (!pswvalue ) {
        failpsw()
        return false
      }
      const logdata = yield call(postlog, postlist)   // 获取登录成功的返回数据
      const time_now = logdata.data.created   // 获取刚开始登录成功的时间
      const start_time = new Date().getTime()
      const total_time = logdata.data.ttl     // 获取超时的时间限制（毫秒）
      const login_id = logdata.data.userId  // 获取当前用户ID
      console.log(logdata)
      if (logdata.data) {
        window.localStorage.setItem(storageTokenKey, logdata.data.id)  // 本地保存 token
        window.localStorage.setItem(start_date, time_now)  // 本地保存 登录成功的时间
        window.localStorage.setItem(overtime, total_time)  // 本地保存 超时的时间限制（毫秒）
        window.localStorage.setItem(user_id, login_id)
        yield put(routerRedux.push('/user_center'))
      }
      else {
        fail_fetch()
      }
    },
    *logout({ payload }, { call, put, select }) {     //退出登录
      window.localStorage.removeItem(storageTokenKey)
      window.localStorage.removeItem(start_date)
      window.localStorage.removeItem(overtime)
      window.localStorage.removeItem(user_id)
      yield put(routerRedux.push('/'))
    },
    *checktoken({ payload }, { call, put }) {        //检查token和超时，没有token或者已经超时则跳转到登录页面
      function login_again() {
        Toast.fail('已超时，请您重新登录',3);
      }
      const token = window.localStorage.getItem(storageTokenKey)
      const logdate = window.localStorage.getItem(start_date)         // 获取登录成功的具体时间
      const logout_time = window.localStorage.getItem(overtime)    // 获取超时的时间限制（毫秒）
      const start_time = new Date(logdate).getTime()
      const current_time = new Date().getTime()
      console.log(current_time - start_time)
      if ( current_time - start_time >logout_time)   // 时间间隔大于超时的时间限制 跳转到登录页面
      {
        login_again()
       setTimeout( yield put(routerRedux.push('/')),3000) 
      }
    },
  },

  reducers: {
    userchange(state, { payload: inputvalue }) {    // 改变用户名输入框的value
      return { ...state, uservalue: inputvalue }
    },
    pswchange(state, { payload: inputvalue }) {   //改变密码输入框的value
      return { ...state, pswvalue: inputvalue }
    }
  }
}
