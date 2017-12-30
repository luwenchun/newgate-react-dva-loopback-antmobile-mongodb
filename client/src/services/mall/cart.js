import request from '../../utils/request';
import {storageTokenKey,user_id} from "../../utils/constant"


export function fetch_cart() {
  const token=window.localStorage.getItem(storageTokenKey)
  const id=window.localStorage.getItem(user_id)
  return request(`http://localhost:3000/api/ClientMallInfos/${id}/carts?filter=%7B%22include%22%3A%5B%22mallProduct%22%5D%7D`, {
    method: 'get',
    headers: new Headers({
      "Authorization": token
  })
})
}
export function fetch_product() {
  const token=window.localStorage.getItem(storageTokenKey)
  return request("http://localhost:3000/api/MallProducts", {
    method: 'get',
    headers: new Headers({
      "Authorization": token
  })
})
}
export function addproduct_cart(product_id) {  //添加产品到购物车
  const token=window.localStorage.getItem(storageTokenKey)
  const id=window.localStorage.getItem(user_id)
  console.log(product_id)
  return request(`http://localhost:3000/api/ClientMallInfos/${id}/carts`, {
    method: 'post',
    headers: new Headers({
      "Authorization": token,
        "Content-Type": "application/json; charset=utf-8"
      }),
      body: JSON.stringify(
       {
         "mallProductId":product_id,
         "quantity": 1
       }
      )
  })
}
export function dele_product_incart(id_cart) {  // 删除购物车
  const token=window.localStorage.getItem(storageTokenKey)
  const id=window.localStorage.getItem(user_id)
  return request(`http://localhost:3000/api/ClientMallInfos/${id}/carts/${id_cart}`, {
    method: 'delete',
    headers: new Headers({
      "Authorization": token

      })
  })
}
export function get_cartcount() {  // 获取购物车数量
  const token=window.localStorage.getItem(storageTokenKey)
  const id=window.localStorage.getItem(user_id)
  return request(`http://localhost:3000/api/ClientMallInfos/${id}/carts/count`, {
    method: 'get',
    headers: new Headers({
      "Authorization": token
      })
  })
}
export function edit_cartcount(id_cart,count) {  // 编辑购物车商品数量
  const token=window.localStorage.getItem(storageTokenKey)
  const id=window.localStorage.getItem(user_id)
  return request(`http://localhost:3000/api/ClientMallInfos/${id}/carts/${id_cart}`, {
    method: 'put',
    headers: new Headers({
      "Authorization": token,
      "Content-Type": "application/json; charset=utf-8"
    }),
    body: JSON.stringify(
     {
        "quantity": count
     }
    )

  })
}
