import React from 'react';
import { connect } from 'dva';
import './homepage.css';
import { SearchBar, TabBar, Tabs, WhiteSpace  } from 'antd-mobile';
import { Router, Route, Switch } from 'dva/router';

import Indexs from '../indexs/indexs';
import Calendar from '../calendar/calendar';
import Info from '../info/info';
import My from '../my/my';
const Homepage = ({ match, dispatch }) => {

  // 点击搜索框 显示下拉内容
  let search;
  function onFocus() {
    // 1. 获取元素
    // 2. js改变style的值
    search.classList.add('current');
  }

  function onBlur() {
    // 1. js回复到原来的高度
    search.classList.remove('current');
  }


  // 点击+ 弹出遮罩层
  let adds,shade;
  function onClickAdds() {
    shade.style.display = 'block';
  }
  function onClickShade() {
    shade.style.display = 'none';
  }

  // ----------------- router change ---------------------
  function changeIndexs({ children }) {
    //点击切换路由
    dispatch({
      type: "homepage/changeIndex"
    })
  }
  function changeCalendar() {
    // 点击切换到日历calendar
    dispatch({
      type: 'homepage/changeCalendar'
    })
  }
  function changeInfo() {
    // 点击切换到消息 info
    dispatch({
      type: 'homepage/changeInfo'
    })
  }
  function changeMy() {
    // 点击切换到消息 info
    dispatch({
      type: 'homepage/changeMy'
    })
  }

  return (
    <div className='homepage'>
      <div className='nav'>
        <div
          ref={(div) => search = div}
          className='nav-info clearfix'>
          <i className='iconfont left'>&#xe69e;</i>
          <i className='iconfont right'>&#xe60b;</i>
          <div className='search'>
            <SearchBar
              placeholder="搜索"
              onFocus={onFocus}
              onBlur={onBlur} />
          </div>
        </div>
      </div>
      <div className='main'>
        {/* 首页 */}
        <Route path='/homepage/indexs' component={Indexs}></Route>
        {/* 日历 */}
        <Route path='/homepage/calendar' component={Calendar}></Route>
        {/* 消息 */}
        <Route path='/homepage/info' component={Info}></Route>
        {/* 我的 */}
        <Route path='/homepage/my' component={My}></Route>
      </div>
      <div className='nav-bottom'>
        <div className='nav-btm'>
          <ul>
            <li onClick={changeIndexs}><i className='iconfont'>&#xe62a;</i><p>首页</p></li>
            <li onClick={changeCalendar}><i className='iconfont'>&#xe621;</i><p>日历</p></li>
            <li>
              <div
                ref={ (div) => adds = div }
                onClick={ onClickAdds }
                className='add'>+</div>
            </li>
            <li onClick={changeInfo}><i className='iconfont'>&#xe501;</i><p>消息</p></li>
            <li onClick={changeMy}><i className='iconfont'>&#xe608;</i><p>我的</p></li>
          </ul>
        </div>
      </div>
      {/* 遮罩层内容 */}
      <div 
        onClick={ onClickShade }
        ref={ (div) => shade = div }
        className='shade'>
        <div className='addInfo'>
          <ul>
            <li>预约体检</li>
            <li>加班</li>
            <li>请假</li>
            <li>医疗理赔</li>
            <li>打卡</li>
            <li>开具证明</li>
            <li>日常报销</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    ...state
  }
}

export default connect()(Homepage);