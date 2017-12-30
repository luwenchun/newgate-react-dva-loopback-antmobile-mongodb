import React from 'react';
import { connect } from 'dva';
import {Link} from 'dva/router';
import { NavBar, Icon, ListView, Toast } from 'antd-mobile';
import './adsRule.css';

const AdsRule = ({ adsdata, dispatch }) => {
  console.log(adsdata)
  // 设置默认路由
  function defaultAds(e) {
    // console.log(e.target.checked);
    // dispatch({
    //   type: 'adsrule/defautlAds',
    // });
  }
 

  // 点击编辑跳转
  function onEdit(id) {
    return function () {
      dispatch({
        type: 'adsrule/edit',
        payload: id
      });
    }
  }
  // 点击删除地址
  function onDel(id) {
    return function () {
      dispatch({
        type: 'adsrule/del',
        payload: {
          type: 'list',
          id: id
        }
      });
    }
  }

  const NUM_ROWS = adsdata.length;
  let pageIndex = 0;

  function genData(pIndex = 0) {
    const dataBlob = {};
    for (let i = 0; i < NUM_ROWS; i++) {
      const ii = (pIndex * NUM_ROWS) + i;
      dataBlob[`${ii}`] = `row - ${ii}`;
    }
    // console.log(dataBlob);//{0: "row - 0", 1: "row - 1", 2: "row - 2", 3: "row - 3", 4: "row - 4", 5: "row - 5", 6: "row - 6", 7: "row - 7", 8: "row - 8", 9: "row - 9"}
    return dataBlob;
  }

  
  class Demo extends React.Component {
    constructor(props) {
      super(props);
      const dataSource = new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      });

      this.state = {
        dataSource,
        isLoading: true,
      };
    }
    componentDidMount() {
      // you can scroll to the specified position
      // setTimeout(() => this.lv.scrollTo(0, 120), 800);

      // simulate initial Ajax
      // setTimeout(() => {
        this.rData = genData();
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(this.rData),
          isLoading: false,
        });
      // }, 600);
      
    }


    render() {
      const separator = (sectionID, rowID) => {
        // console.log(sectionID+'--'+rowID);//s1--0
        return (
        <div
          key={`${sectionID}-${rowID}`}
          style={{
            backgroundColor: '#F5F5F9',
            height: 8,
            borderTop: '1px solid #ECECED',
            borderBottom: '1px solid #ECECED',
          }}
        />
      );}
      let index = adsdata.length - 1;
      const row = (rowData, sectionID, rowID) => {
        // console.log(rowData+'...'+sectionID+'...'+rowID);//row - 0...s1...0
        if (index < 0) {
          index = adsdata.length - 1;
        }
        const obj = adsdata[index--];
 
        return (
          <div key={rowID} style={{ padding: '0 15px' }}>
            <div
              style={{
                color: '#000',
                fontSize: '13px',
                borderBottom: '1px solid #F6F6F6',
        
              }}
            >
              <p className='adsrule-khinfo clearfix'>
                <span>{obj.recipient}</span><span>{obj.mobile}</span>
              </p>
              <p className='adsrule-address'>{obj.province}{obj.city}{obj.distinct}{obj.detailAddress}</p>
            </div>
            <div className='clearfix' style={{ fontSize: '13px', padding: '15px 0', width: '100%' }}>
              <div className='defaultAds'>
                <input 
                  defaultChecked={obj.isDefault} 
                  onChange={defaultAds}
                  type="radio" 
                  style={{ verticalAlign: -2 }} 
                  id='Name' 
                  name='ads' />
                <label htmlFor="Name"> 默认地址</label>
              </div>
              <div className='edit-del'>
                <span onClick={ onEdit(obj.id) }>
                  <i className="iconfont ads-edit">&#xea5a;</i> 编辑
                </span>
                <span onClick={ onDel(obj.id) }>
                  <i className="iconfont">&#xe641;</i> 删除
                </span>
              </div>
            </div>
          </div>
        );
      };
      return (
        <ListView
          ref={el => this.lv = el}
          dataSource={this.state.dataSource}
          renderRow={row}
          renderSeparator={separator}
          className="am-list"
          pageSize={4}
          useBodyScroll
          onScroll={() => { console.log('scroll'); }}
          scrollRenderAheadDistance={500}
        />
      );
    }
  }
  // 添加新地址
  function addAddress () {
    dispatch({
      type: 'adsrule/addAddress'
    });
  }
  return (
    <div className='adsRule'>
      <div className='ads-head'>
        <div className='ads-headinfo'>
          <NavBar
            mode="light"
            icon={<Icon type="left" />}
            onLeftClick={() => console.log('onLeftClick')}
          >管理收货地址</NavBar>
        </div>

      </div>
      <div>
        <Demo />

      </div>
      <Link to="/user_center">
      <div 
          className='ads-backuser_center'
          >
        回到个人中心
        </div>
        </Link>
      <div className='ads-foot'>
        <div 
          onClick={ addAddress }
          className='ads-footinfo'>
          添加新地址
        </div>

      </div>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    adsdata: state.adsrule.adsdata || ''
  }
}

export default connect(mapStateToProps)(AdsRule);