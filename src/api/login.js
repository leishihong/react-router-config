import { fetchApi, fetchApiJsonp } from '@/plugins/fetchApi'
import Api from '@/plugins/CacheApi'
const getData = new Api()
export const fetchCode = data => fetchApi('user/loginValidateCode', data)
// export const fetchLogin = data =>
//   fetchApiJsonp('user/login', Object.assign({}, { format: 'jsonp' }, data), {
//     param: 'callback'
//   })
export const fetchLogin = data => fetchApi('user/login', data, 'POST')
export const fetchLogOut = data => fetchApi('', data, 'POST')
export const fetchUserAuthList = data => fetchApi('user/shiro', data)
export const fetchLoginPwd = data => fetchApi('user/password', data)

export const fetchDetail = data => fetchApi('v2/banner/smallbanner', data)
