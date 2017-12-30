import React from 'react';
import { connect } from 'dva';
import { Route } from 'dva/router';
import { NavBar, Icon, SearchBar } from 'antd-mobile';
import './mainMall.css';
import Shop from '../shop/shop';
import Shopcart from '../shopcart/shopcart';
import Yetshop from '../yetshop/yetshop';
import Myshop from '../myshop/myshop';

const MainMall = ({ dispatch }) => {

  function linkShop() {
    dispatch({
      type: 'mainmall/linkShop'
    });
  }
  function linkShopcart() {
    dispatch({
      type: 'mainmall/linkShopcart'
    });
  }
  function linkYetshop() {
    dispatch({
      type: 'mainmall/linkYetshop'
    });
  }
  function linkMyshop() {
    dispatch({
      type: 'mainmall/linkMyshop'
    });
  }

  return (
    <div className='mall'>
      <div className='mall-nav'>
        <div className='mall-navInfo'>
          <NavBar
            mode="light"
            icon={<Icon type="left" />}
            onLeftClick={() => console.log('onLeftClick')}
          >积分商城</NavBar>
        </div>
      </div>
      
      <div className='mall-main'>
        <Route path='/mall/shop' component={ Shop }></Route>
        <Route path='/mall/shopcart' component={ Shopcart }></Route>
        <Route path='/mall/yetshop' component={ Yetshop }></Route>
        <Route path='/mall/myshop' component={ Myshop }></Route>
      </div>
      {/* 尾部 */}
      <div className='mall-btmNav'>
        <ul>
          <li>
            <a
              onClick={linkShop} 
              href="javascript:void(0);">商城</a>
          </li>
          <li>
            <a
              onClick={linkShopcart} 
              href="javascript:void(0);">购物车</a>
          </li>
          <li>
            <a
              onClick={linkYetshop} 
              href="javascript:void(0);">已购</a>
          </li>
          <li>
            <a
              onClick={linkMyshop} 
              href="javascript:void(0);">我的</a>
          </li>
        </ul>
      </div>
    </div>
  )
}

function mapStateToProps(state) {

}

export default connect()(MainMall);

