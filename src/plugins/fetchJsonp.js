import Jsonp from 'jsonp'
// import axios from "axios";
// import { Modal } from "antd";

export default function jsonp (url, data, options) {
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)

  return new Promise((resolve, reject) => {
    Jsonp(url, options, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}

function param (data) {
  let url = ''
  for (const i in data) {
    const value = data[ i ] !== undefined ? data[ i ] : ''
    url += `&${ i }=${ encodeURIComponent(value) }`
  }
  return url ? url.substring(1) : ''
}

// export default class AipJsonp {
//   static jsonp (options) {
//     return new Promise((resolve, reject) => {
//       Jsonp(
//         options.url,
//         {
//           param: 'callback'
//         },
//         (err, res) => {
//           if (res.status === 'success') {
//             resolve(res)
//           } else {
//             reject(res.message)
//           }
//         }
//       )
//     })
//   }
// }
