import React from 'react';
import { connect } from 'dva';
import { Route } from 'dva/router';
import { SearchBar, Button, ListView } from 'antd-mobile';
import './shop.css';

const Shop = () => {

  const data = [
    {
      img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
      title: 'Meet hotel',
      des: '不是所有的兼职汪都需要风吹日晒',
    },
    {
      img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
      title: 'McDonald\'s invites you',
      des: '不是所有的兼职汪都需要风吹日晒',
    },
    {
      img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
      title: 'Eat the week',
      des: '不是所有的兼职汪都需要风吹日晒',
    },
  ];
  const NUM_ROWS = 20;
  let pageIndex = 0;

  function genData(pIndex = 0) {
    const dataBlob = {};
    for (let i = 0; i < NUM_ROWS; i++) {
      const ii = (pIndex * NUM_ROWS) + i;
      dataBlob[`${ii}`] = `row - ${ii}`;
    }
    return dataBlob;
  }

  

  return (
    <div className='shop'>
      <div className='shop-search'>
        <p>可用积分: <span>2000</span></p>
        <SearchBar placeholder="Search" maxLength={8} />
      </div>
      <div className='shop-selectBtn'>
        <ul>
          <li><Button size='small'>default</Button></li>
          <li><Button size='small'>default</Button></li>
          <li><Button size='small'>default</Button></li>
          <li><Button size='small'>default</Button></li>
        </ul>
      </div>
    </div>
  )
}

function mapStateToProps() {

}

export default connect()(Shop);
