import React from 'react';
import { connect } from 'dva';
import './log_in.css';
import { Button, List, InputItem, Toast } from 'antd-mobile';
import Father from "../log-in/father"

function Log_in({ log_in, dispatch }) {
  function inputuser(value) {    // 改变用户名输入框的value
    dispatch({
      type: "log_in/userchange",
      payload: value
    })
  }

  function inputpsw(value) {   // 改变密码输入框的value
    dispatch({
      type: "log_in/pswchange",
      payload: value
    })
  }

  function btnpost() {           // 点击登录按钮调用model中的effects方法
    dispatch({
      type: "log_in/fetch_login",
      payload: [inputlist, log_in.uservalue, log_in.pswvalue]
    })
  }
  const inputlist =   //  点击登录按钮后发送的用户名和密码
    {
      "email": log_in.uservalue,
      "password": log_in.pswvalue
    }
  return (
    <div className="content">
      <h1 className="tit">登录</h1>
      <div className="list_content">
        <List  style={{border:"none"}} >
          <InputItem
            type={log_in.type}
            value={log_in.uservalue}
            onChange={inputuser}
            placeholder="手机号/用户名"
            clear
            moneyKeyboardAlign="left"
          ></InputItem>
          <InputItem
            onChange={inputpsw}
            value={log_in.pswvalue}
            placeholder="请输入登录密码"
            clear
          ></InputItem>
        </List>
      </div>
      <p className="btn"><Button type="primary" onClick={btnpost}>开始试用</Button></p>
      <p className="code">手机发送验证码登录</p>
      <Father />
    </div>
  )
}
function mapStateToProps(state) {
  return { log_in: state.log_in }
}
export default connect(mapStateToProps)(Log_in)
