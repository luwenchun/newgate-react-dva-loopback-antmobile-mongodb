import { get_productlist,get_productinfo}  from "../../services/mall/product_list"
import { routerRedux } from 'dva/router';
export default {

	namespace: 'product',

	state: {
	  list:[ ],
    product_info:
    {
      name: null,
      price: null
    },
	},
  effects: {
 *fetch_product_list({payload},{call,put,select}){
   const product_data=yield call(get_productlist)
   yield put({type:"get_product_list",payload:product_data.data})
 },
 *fetch_current_productinfo({payload:id},{call,put,select}){
   const currentdata=yield call(get_productinfo,id)
   if(currentdata.data){
     yield put({type:"show_current_productinfo",payload:currentdata.data})
   }
yield put(routerRedux.push('/product_detail'));
 }
	},
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/product_list') {
          dispatch({ type: "fetch_product_list" })              // 路由匹配检查token
        }
      })
    }
  },
	reducers: {
    get_product_list(state,{payload:productdata}){
      return {
        list:productdata
      }
    },
    show_current_productinfo(state,{payload:data}){
      return {
        ...state,
        product_info:data
      }
    }
  }

}
