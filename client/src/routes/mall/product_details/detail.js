import React from 'react';
import { connect } from 'dva';
import {Link} from 'dva/router';
import { NavBar, Icon,Tabs, WhiteSpace, Badge,Button,Picker,List} from 'antd-mobile';
import './detail.css';
import pic from "../../../assets/timg.jpg"

function Detail_Insurance({product,cart,dispatch}){
  const tabs = [
  { title: <Badge >保险详情</Badge> },
  { title: <Badge >投保须知</Badge> },
  { title: <Badge >理赔流程</Badge> },
];
const data = [
    {
      value: '春',
    },
    {
      value: '夏',
    },
];

function get_productid(){
  dispatch({
    type:"cart/getid",
    payload:product.product_info.id
  })
}
if(cart.cart_num==0){
  cart.add_productid="false"
}
function get_cartinfo(){
  dispatch({type:"product/fetch_cart"})
}
return (
  <div >
  <div className="nav">
  <NavBar
      mode="light"
      icon={<Icon type="left" />}
    >积分商城</NavBar>
    </div>
    <p className="content_warp">{product.product_info.name}</p>
    <p style={{
				width:"70%"
				,height:"70%",
				marginTop: 0,
				marginBottom: 0, 
				marginLeft: "auto",
				 marginRight: "auto"
				}}>
			<img 
			   style={{ 
					 marginTop: 0,
					  marginBottom: 0, 
					  marginLeft: "auto",
						marginRight: "auto" }}
						 src={product.product_info.imageUrl} /></p>
    <Tabs tabs={tabs}
      initialPage={1}
      onChange={(tab, index) => { console.log('onChange', index, tab); }}
      onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
    >
    <div className="content_tab" style={{padding:"0 0 63px 0"}}>
  <div className="table">
 <ul>
<li><p className="table_tit current_tit">保障范围</p><p className="tit_content">保障额度</p></li>
<li>
<p className="table_tit tit_list">意外伤害保障</p>
<div className="tit_content">
<Picker data={data} cols={1} className="forss" title="请选择">
          <List.Item arrow="horizontal"></List.Item>
        </Picker></div></li>
<li>
<p className="table_tit  tit_list">员工门诊及住院保障</p>
<div className="tit_content">
<Picker data={data} cols={1} className="forss" title="请选择">
        <List.Item arrow="horizontal"></List.Item>
        </Picker></div>
</li>
<li>
<p className="table_tit  tit_list">40种重大疾病保障</p>
<div className="tit_content">
<Picker data={data} cols={1} className="forss" title="请选择">
          <List.Item arrow="horizontal"></List.Item>
        </Picker></div>
</li>
 </ul>
  </div>
      </div>
      <div  className=" content_tab" >
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit
      amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis
      dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget.
      dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget.
      </div>
      <div  className="content_tab" >
      有流程图
      不同保险的理赔产品可能流程不同
      </div>
    </Tabs>
    <div className="content_btn">
    <p className="left_integral">
    <span>价格：</span>
    <span className="integral_text">¥{product.product_info.price}</span>
    </p>
<Button type="primary" className="current_btn" onClick={get_productid}>加入购物车</Button>
    <div className="btn_fixed">
   <Link to="/cart"><span onClick={get_cartinfo}>购物车</span></Link>
    {cart.add_productid=="false"?null:<span className="cart_num">{cart.cart_num}</span>}
    </div>
    </div>
  </div>
)
}
function mapStateToProps(state){
  return{
    cart:state.cart,
  product:state.product}
}
export default connect(mapStateToProps)(Detail_Insurance)
