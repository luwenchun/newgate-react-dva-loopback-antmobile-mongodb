import React from 'react';
import { connect } from 'dva';
import { Route } from 'dva/router';
import './myshop.css';

const MyShop = ({ dispatch }) => {

  function handleAds() {
    dispatch({
      type: 'myshop/linkadsRule'
    });
  }

  return (
    <div className='myshop'>
      <div
        className='myshop-ads'
        onClick={handleAds}>地址管理</div>
    </div>
  )
}

function mapStateToProps() {

}

export default connect()(MyShop);
