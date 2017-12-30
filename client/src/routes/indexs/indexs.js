import React from 'react';
import { connect } from 'dva';
import './indexs.css';
import { Router, Route, Switch, routerRedux } from 'dva/router';

const Indexs = ({ dispatch }) => {


  function handleMall() {
    console.log(1);
    dispatch({
      type: 'indexs/gomall'
    });
  }

  return (
    <div className='indexs'>
      <div className='top'>显示信息</div>
      <div
        onClick={handleMall}
        className='indexs-main'>
        积分商城
      </div>
    </div>
  )
}

function mapStateToProps() {

}

export default connect()(Indexs);