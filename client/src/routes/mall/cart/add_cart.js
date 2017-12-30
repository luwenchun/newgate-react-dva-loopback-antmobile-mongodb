import React from 'react';
import { connect } from 'dva';
import { NavBar, Icon,Checkbox,Button} from 'antd-mobile';
import '../product_details/detail.css';
import './add_cart.css';
import pic from "../../../assets/product.jpg"

function Add_cart({cart,dispatch}){
function dele(cart_id){   // 删除购物车商品
dispatch({type:"cart/dele_incart",payload:cart_id})
}

function edit(list,index){//  增加购物车商品数量
  dispatch({type:"cart/add_editincart",payload:[list,index]})
}
function subtract(list,index){// 减少购物车商品数量
  dispatch({type:"cart/subtract_editincart",payload:[list,index]})
}

const AgreeItem = Checkbox.AgreeItem
const btn=<div className="all_check"><AgreeItem  >全选</AgreeItem></div>
const Cart_productlist=cart.cartlist.map((list,index)=>{
  console.log(list)
  return <div className="product_list"  key={index}>
              <div className="content_list"><AgreeItem  ></AgreeItem></div>
              <div className="img_product content_list"><img src={list.mallProduct.imageUrl} /></div>
              <div className="content_list text_content">
                    <p className="product_tit"  >{list.mallProduct.name}</p>
                    <div className="content_action">
                    <span className="price" >¥ {list.mallProduct.price*list.quantity}</span>
           <div className="action">
                  <div className="btn_list">
                      <p className="dele_btn" onClick={()=>subtract(list,index)}>-</p>
                      <p className="num">{list.quantity}</p>
                        <p  className="add_btn" onClick={()=>edit(list,index) }>+</p>
                        </div>
                        <p className="dele_product" onClick={()=>dele(list.id)}>删除</p>
                      </div>
                    </div>
              </div>
             </div>

})
return (
  <div>
  <div className="nav">
  <NavBar
      mode="light"
      icon={<Icon type="left" />}
    >购物车</NavBar>
    </div>
<div style={{padding:"0  0 63px 0"}}>
{btn}
{Cart_productlist }
</div>
      <div className="btn_account">
      <div className="btn_warp">
      <span className="text_price">总计：<b className="all_price">¥{cart.cart_price}</b></span>
      <Button type="primary" className="current_btn">去结算</Button>
      </div>
      </div>
      </div>
)
}

function mapStateToProps(state){
  return { cart:state.cart }
}
export default connect(mapStateToProps)(Add_cart)
