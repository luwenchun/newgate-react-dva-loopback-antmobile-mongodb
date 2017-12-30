import React from 'react';
import { Router, Route, Switch, Redirect } from 'dva/router';
import Log_in from './routes/log-in/log-in';
import LogSuccess from './routes/user_center/usercenter';
//主页
import Homepage from './routes/homepage/homepage';
import Userinfo from './routes/user_center/userinfo';
import Nomatch from "./routes/404/404"
import Mall from './routes/mall/mainMall/mainMall';
import AdsRule from './routes/mall/adsRule/adsRule';

//商城
import Detail_Insurance from './routes/mall/product_details/detail';
import Add_cart from './routes/mall/cart/add_cart';
import AdsEdit from './routes/mall/adsRule/adsEdit';

import Productlist from "./routes/mall/product_list/product_list"
function RouterConfig({ history }) {

  return (
    <Router history={history}  >
      <Switch>
        <Route path="/" exact component={Log_in} />
        <Route path="/user_center" exact component={LogSuccess} />
        {/* 主页 */}
        <Route path="/homepage" component={Homepage}></Route>
        <Route path="/user_center/userinfo" exact component={Userinfo} />
        <Route path="/mall" component={Mall} />
        <Route path="/adsrule" component={AdsRule} />
        <Route path="/adsedit" exact component={AdsEdit} />



        {/*商品详情-保险*/}
        <Route path="/product_detail" exact component={Detail_Insurance} />
        <Route path="/mall" component={Mall} />
        {/*购物车*/}
        <Route path="/cart" exact component={Add_cart} />


        {/*商品列表*/}
        <Route path="/product_list" exact component={Productlist} />
        <Route component={Nomatch} />

      </Switch>
    </Router>
  );
}

export default RouterConfig;
