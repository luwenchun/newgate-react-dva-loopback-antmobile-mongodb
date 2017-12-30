import request from '../../utils/request';
import * as localName from '../../utils/constant'
export function loaddatalist() {
  let token = window.localStorage.getItem(localName.storageTokenKey);
  let userid = window.localStorage.getItem(localName.user_id);
  return request(`http://localhost:3000/api/ClientMallInfos/${userid}/recAddresses`,{
    method: 'get',
    headers: new Headers({
      "authorization": token
    })
  });
}

// 默认只有一条数据 设置为默认地址
export function onedefault(id) {
  let token = window.localStorage.getItem(localName.storageTokenKey);
  let isDefault = {"isDefault": true};
  return request(`http://localhost:3000/api/RecAddresses/${id}`,{
    method: 'put',
    headers: new Headers({
      "Content-Type": "application/json; charset=utf-8",
      "authorization": token
    }),
    body: JSON.stringify(isDefault)
  });

}

// 编辑路由
export function edit(id) {
  let token = window.localStorage.getItem(localName.storageTokenKey);
  let userid = window.localStorage.getItem(localName.user_id);
  return request(`http://localhost:3000/api/ClientMallInfos/${userid}/recAddresses/${id}`,{
    method: 'get',
    headers: new Headers({
      "authorization": token
    })
  });
}

// 添加新地址
export function add(data) {
  let token = window.localStorage.getItem(localName.storageTokenKey);
  let userid = window.localStorage.getItem(localName.user_id);
  return request(`http://localhost:3000/api/ClientMallInfos/${userid}/recAddresses`,{
    method: 'post',
    headers: new Headers({
      "Content-Type": "application/json; charset=utf-8",
      "authorization": token
    }),
    body: JSON.stringify(data)
  });
}

// 编辑地址
export function editvalue(data) {
  let token = window.localStorage.getItem(localName.storageTokenKey);
  let userid = window.localStorage.getItem(localName.user_id);
  return request(`http://localhost:3000/api/ClientMallInfos/${userid}/recAddresses/${data.id}`,{
    method: 'put',
    headers: new Headers({
      "Content-Type": "application/json;charset=utf-8",
      "authorization": token
    }),
    body: JSON.stringify(data)
  });
}
// 删除地址
export function del(id) {
  let token = window.localStorage.getItem(localName.storageTokenKey);
  let userid = window.localStorage.getItem(localName.user_id);
  return request(`http://localhost:3000/api/ClientMallInfos/${userid}/recAddresses/${id}`,{
    method: 'delete',
    headers: new Headers({
      "Content-Type": "application/json;charset=utf-8",
      "authorization": token
    })
  });
}