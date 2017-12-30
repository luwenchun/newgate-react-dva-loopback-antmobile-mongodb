import request from '../../utils/request';


export function get_productlist() {
  return request("http://localhost:3000/api/MallProducts")
}
export function get_productinfo(product_id) {
  return request(`http://localhost:3000/api/MallProducts/${product_id}`)
}
