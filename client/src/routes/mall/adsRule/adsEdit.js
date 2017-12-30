import React from 'react';
import { connect } from 'dva';
import { NavBar, Icon, ListView, List, InputItem, Picker, WhiteSpace, TextareaItem, Button, Switch } from 'antd-mobile';
import './adsEdit.css';
import * as localName from '../../../utils/constant';
import { createForm } from 'rc-form';

import arrayTreeFilter from 'array-tree-filter';
import { district, provinceLite as province } from 'antd-mobile-demo-data';


let AdsEdit = ({ form, location, editdata, dispatch }) => {
  const { getFieldProps } = form;// 滑动按钮

  function backAdsrule() { // 跳转到adsrule
    dispatch({
      type: 'adsrule/backAdsrule'
    });
  }

  function nameChange(e) {
    dispatch({
      type: 'adsrule/infochange',
      payload: e
    });
  }
  function phoneChange(e) {
    dispatch({
      type: 'adsrule/phonechange',
      payload: e
    });
  }
  function detailAddressChange(e) { // 设置详细地址
    dispatch({
      type: 'adsrule/detailAddressChange',
      payload: e
    });
  }

  // 设置是否为默认地址
  function isDefault(e) {
  }

  function onPickerChange(e) { // 设置地区
  }

  function pickerChange(e) {
    // console.log(e);//["340000", "340500", "340506"]
    dispatch({
      type: 'adsrule/pickerchange',
      payload: e
    });
  }

  function onSubmit() { // 提交保存
    
    {
      location.query ?
      dispatch({
        type: 'adsrule/add',
        payload: editdata
      }) :
      dispatch({
        type: 'adsrule/update',
        payload: editdata
      })
    }
  }

  // 点击删除
  function adsDeleted() {
    dispatch({
      type: 'adsrule/del',
      payload: {
        type: 'edit',
        id: editdata.id
      }
    });
  }

  return (
    <div className='adsEdit'>
      <div className='ads-head'>
        <div className='ads-headinfo'>
          <NavBar
            mode="light"
            icon={<Icon type="left" />}
            onLeftClick={backAdsrule}
            rightContent={[
              <span key="0" onClick={onSubmit}>保存</span>
            ]}
          >{location.query ? '添加新地址' : "编辑地址"}</NavBar>
        </div>

      </div>
      <List>
        <InputItem
          onChange={nameChange}
          clear
          placeholder="姓名"
          value={ editdata.recipient }
        >收货人</InputItem>

        <InputItem
          onChange={phoneChange}
          type="phone"
          placeholder="186 1234 ****"
          value={ editdata.mobile }
        >联系电话</InputItem>

        <List style={{ backgroundColor: 'white' }} className="picker-list">
          <Picker extra="请选择(可选)"
            data={district}
            title="Areas"
            {...getFieldProps('district', {
              initialValue: [editdata.province, editdata.city, editdata.distinct],
            }) }
            value={[editdata.province, editdata.city, editdata.distinct]}
            onChange={ pickerChange }
            onOk={e => console.log('ok', e)}
            onPickerChange={onPickerChange}
            onDismiss={e => console.log('dismiss', e)}
          >
            <List.Item arrow="horizontal">所在地区</List.Item>
          </Picker>
        </List>

        <TextareaItem
          placeholder="请输入详细地址"
          data-seed="logId"
          autoHeight
          count={100}
          onChange={detailAddressChange}
          value={ editdata.detailAddress }
        />
        {location.query ?
          <List.Item
            extra={<Switch
              {...getFieldProps('Switch1', {
                initialValue: false,
                valuePropName: 'checked',
              }) }
              onClick={isDefault}
            />}
          >设为默认</List.Item>
          : null}

      </List>
      <WhiteSpace />
      {location.query ? null : <Button onClick={ adsDeleted }>删除地址</Button>}

    </div>
  )
}

AdsEdit = createForm()(AdsEdit);
function mapStateToProps(state) {
  return {
    editdata: state.adsrule.editdata || []
  }
}

export default connect(mapStateToProps)(AdsEdit);