import React, { Component } from 'react';
import { connect } from 'dva';
import { Button, List, InputItem, Toast } from 'antd-mobile';


class Son extends Component{
    constructor(){
        super()
    }
    render(){
        return(
            <div>请输入邮箱：
                <div>
                <InputItem
 style={{backgroundColor:"#e6e6e6"}}
                //  onChange={this.props.handle("子组件")}
                 placeholder="请输入登录密码"
                 > 
                 </InputItem >
                 </div>
                </div>
        )
    }
}
export default Son