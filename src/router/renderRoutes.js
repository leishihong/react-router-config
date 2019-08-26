// import React from 'react'
// import { Route, Redirect, Switch } from 'react-router-dom'
// import map from 'lodash/map'
// import qs from 'query-string'
// /**
//  * 路由拦截
//  * @param {*} routes
//  * @param {*} authed
//  * @param {*} authPath
//  * @param {*} extraProps
//  * @param {*} switchProps
//  */
// /**
//  *
//  * @param isLogin  是否登陆，
//  * isLogin基本都是通过store传入，那么需要把store注入到这个方法中。
//  * renderRoutes 是一个 funcion 组件， 不是一个class 不能直使用注解注入，需要用函数的写法
//  * 有特殊的注入方式，下面一个方法会讲述到
//  * authPath 要跳转匹配的路由
//  * @param authPath  默认是login
//  * @param extraProps 其他属性全部放在此处
//  * @constructor
//  */
// const renderRoute = (r, isLogin, authPath, extraProps = {}, switchProps = {}) =>
//   !r.requiresAuth || isLogin || r.path === authPath ? (
//     <Route
//       key={ r.key }
//       exact={ r.exact }
//       path={ r.path }
//       render={ props => {
//         const { search } = props.location
//         if (r.parentKey) {
//           props.location.parentKey = r.parentKey
//         }
//         props.location.title = r.meta.title
//         props.location.searchParams = qs.parse(search)
//         return <r.component { ...props } />
//       } }
//     />
//   ) : (
//     <Redirect
//       key={ r.key }
//       to={ {
//         pathname: authPath,
//         state: { from: this.props.location }
//       } }
//     />
//   )
// // routes ? (
// //   <Switch { ...switchProps }>
// //     {map(routes, (route, i) => (
// //       <Route
// //         key={ route.key || i }
// //         path={ route.path }
// //         exact={ route.exact }
// //         strict={ route.strict }
// //         render={ props => {
// //           if (!route.requiresAuth || isLogin || route.path === authPath) {
// //             return (
// //               <route.component { ...props } { ...extraProps } route={ route } />
// //             )
// //           }
// //           return (
// //             <Redirect
// //               to={ {
// //                 pathname: authPath,
// //                 state: { from: props.location },
// //                 search: `?from=${ props.location }`
// //               } }
// //             />
// //           )
// //         } }
// //       />
// //     ))}
// //   </Switch>
// // ) : null
// /**
//  * Recursive routing
//  * 递归路由
//  * @param routes
//  * @returns {*}
//  */
// const mapRoutes = (routes, isLogin, authPath) => {
//   return map(routes, r => {
//     if (r.component) {
//       return renderRoute(r, isLogin, authPath)
//     } else if (r.childRoutes) {
//       return mapRoutes(r.childRoutes)
//     } else {
//       return null
//     }
//   })
// }
// export default mapRoutes
