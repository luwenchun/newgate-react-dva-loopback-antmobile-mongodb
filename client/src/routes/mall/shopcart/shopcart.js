import React from 'react';
import { connect } from 'dva';
import { Route } from 'dva/router';
import './shopcart.css'
import { ListView } from 'antd-mobile';

const ShopCart = () => {

  return (
    <div>ShopCart</div>
  )
}

function mapStateToProps() {

}

export default connect()(ShopCart);
