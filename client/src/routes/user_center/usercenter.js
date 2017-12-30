import React from 'react';
import { connect } from 'dva';
import { Button } from 'antd-mobile';
import {Link} from 'dva/router';
import '../log-in/log_in.css';
import './usercenter.css';

function LogSuccess({ log_in, dispatch }) {
  function clicklogou() {
    dispatch({
      type: "log_in/logout"
    })
  }
  return (
  <div className="content">
 <div className="userlist">
 <p className="success_tit">Kevin</p>
 <div className="userinfo_list">
<p>营销中心·销售部·上海大客户组</p>
<p>上海飞黄腾达有限公司</p>
 </div>
 </div>
 {/* <div className="content_more">
 <span>点击添加更多应用</span>
 </div> */}
 <Link to="/product_list"><div className="gotoshopping">去购物</div></Link>
 <Link to="/adsrule"><div className="gotoshopping">管理收货地址</div></Link>
{  /*<div className="my_content">
<p><Button  type="ghost" size ="small" onClick={()=>dispatch({type:"log_in/fetch_id"})}>我的用户名是：</Button></p>
 </div> */}
 <p><Button  type="primary" onClick={clicklogou}>退出</Button></p>
</div>)
}
function mapStateToProps(state) {
  return { log_in: state.log_in }
}
export default connect(mapStateToProps)(LogSuccess)
