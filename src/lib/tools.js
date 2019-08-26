import Cookies from 'js-cookie'

export const setToken = token => {
  Cookies.set('TOKEN', token, { expires: 1 })
}

export const getToken = () => {
  return Cookies.get('TOKEN')
}

export const signOut = () => {
  Cookies.remove('TOKEN')
}

// export const formatDate = (fmt, date) => {
//   const o = {
//     'M+': date.getMonth() + 1,
//     'd+': date.getDate(),
//     'h+': date.getHours(),
//     'm+': date.getMinutes(),
//     's+': date.getSeconds(),
//     'q+': Math.floor((date.getMonth() + 3) / 3),
//     S: date.getMilliseconds()
//   }
//   if (/(y+)/.test(fmt))
//     fmt = fmt.replace(
//       RegExp.$1,
//       (date.getFullYear() + '').substr(4 - RegExp.$1.length)
//     )
//   for (const k in o)
//     if (new RegExp(`(${ k })`).test(fmt))
//       fmt = fmt.replace(
//         RegExp.$1,
//         RegExp.$1.length === 1 ? o[ k ] : ('00' + o[ k ]).substr(('' + o[ k ]).length)
//       )
//   return fmt
// }
