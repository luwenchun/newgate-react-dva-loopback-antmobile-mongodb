import request from '../utils/request';
import { storageTokenKey } from "../utils/constant"

export function postlog(addData) {
  return request('http://localhost:3000/api/ClientMallInfos/login', {
    method: 'post',
    headers: new Headers({
      "Content-Type": "application/json; charset=utf-8"
    }),
    body: JSON.stringify(addData)

  });
}
// authorization:jFdtnxSD1xqUZcammj9yghy4AgF5RUkM7L2coFoxeuQCZXADvT2GmRFdAF6I5Cn1