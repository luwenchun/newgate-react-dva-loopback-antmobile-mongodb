import React, { Component } from 'react';
import { connect } from 'dva';
import { Button, List, InputItem, Toast } from 'antd-mobile';
import Son from "../log-in/son"

class Father extends Component{
 constructor(props){
     super(props)
     this.state={
         email:null
     }
 }
 handleEmail(e){
     this.setState({
         email:e.target.value
     })
 }
 render(){
     return(
         <div>
             用户邮箱：{this.state.email}
               <Son handle={(a)=>alert(a)} />
         </div>
     )
 }
}
export default Father