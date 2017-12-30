import { routerRedux } from 'dva/router';
import {
  fetch_cart,
  fetch_product,
  addproduct_cart,
  dele_product_incart,
  get_cartcount,
edit_cartcount} from "../../services/mall/cart"
import { Toast } from 'antd-mobile';

export default {
  namespace: 'cart',
  state: {
    click_addcart: "false",
    cartlist: [],   // 购物车的商品列表
    add_productid: "false",
    cart_num: null,  //购物车的商品总数量
    cart_price:null  //购物车全部商品总价
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/cart') {      // 路由匹配加载数据
          dispatch({ type: "fetch_cart" })
        }
        if (location.pathname === '/product_detail') {
          dispatch({ type: "fetch_cartcount" })    // 路由匹配加载数据
        }
      })
    }
  },
  effects: {
    *fetch_cart({ payload }, { call, put, select }) {   //获取购物车商品列表并计算总价
      const cart_data = yield call(fetch_cart)
      let sum=0
         for(let i=0;i<cart_data.data.length;i++){
        let quantity=cart_data.data[i].quantity
        sum+=cart_data.data[i].mallProduct.price*quantity     // 全部商品的总价=每个商品的总价相加(单个商品总价=商品价格*数量)
yield put({ type: "showcart", payload: [cart_data.data,sum] })
      }

    },
    *getid({ payload: id }, { call, put, select }) {   //点击加入购物车
      function success_addcart() {
        Toast.success("加入购物车成功", 1);
      }
      const datalist = yield call(addproduct_cart, id)

      if(datalist.data){
      yield put({type:"fetch_cartcount"})
      success_addcart()
      }
    },
    *fetch_cartcount({ payload}, { call, put, select }){   //获取购物车商品数量
      const cartdata=yield call(get_cartcount)
      yield put({type:"showcart_num",payload:cartdata.data.count})
    },
    *dele_incart({ payload: cart_id }, { call, put, select }){    //删除购物车商品
      yield call(dele_product_incart,cart_id)
        yield put({type:"fetch_cart"})

    },
    *add_editincart({ payload: [list,index] }, { call, put, select }){    //点击+ 显示商品数量并显示单个商品总价和全部商品总价
      list.quantity=list.quantity+1
      list.mallProduct.price=list.mallProduct.price*list.quantity
      console.log(list.mallProduct.price)
      const data=yield call(edit_cartcount,list.id,list.quantity)
      if(data.data){
        yield put({type:"fetch_cart"})
      }

    },
    *subtract_editincart({ payload: [list,index] }, { call, put, select }){    //点击- 显示商品数量并显示单个商品总价和全部商品总价
      if(list.quantity<2){
        list.quantity=1
      }
      else{list.quantity=list.quantity-1}
      const data=yield call(edit_cartcount,list.id,list.quantity)
      if(data.data){
        yield put({type:"fetch_cart"})
      }

    }
  },
  reducers: {
    showcart(state, { payload: [cart_data,all_price]}) {   //获取购物车商品列表并计算总价
      return {
        ...state,
        click_addcart: "true",
        cartlist: cart_data,
        cart_price:all_price
      }
    },
    show_productinfo(state, { payload: product_data }) {  //获取商品详情
      return {
        ...state,
        product_info: product_data
      }
    },
    showcart_num(state,{payload:count}) {  //获取购物车商品数量
      return {
        ...state,
        click_addcart: "true",
        add_productid: "true",
        cart_num: count
      }
    }
  }
}
