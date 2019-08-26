// import React, { Component } from 'react'
// import PropTypes from 'prop-types'
// export const BaseWrapAuth = ComposedComponent =>
//   class WrapComponent extends Component {
//     // 构造
//     constructor (props) {
//       super(props)
//     }

//     static propTypes = {
//       auth: PropTypes.string.isRequired
//     };

//     render () {
//       <p>dd</p>
//       // if (tool.getAuth(this.props.auth)) {
//       //   return <ComposedComponent { ...this.props } />
//       // } else {
//       //   return null
//       // }
//     }
//   }
// // 当遇到前面所说的需求变动时，现在只要把包装器里return null这行代码改成
// // return <ComposedComponent disabled={true}  { ...this.props} />
// // 或者
// // return <ComposedComponent onClick={()=>alert("权限不足，请找管理员小K申请")} { ...this.props} />
// // 就行啦。

// /**
//  * 使用方法
// const AuthButton = wrapAuth(Button);
// class Page extends Component{
//   render() {
//     return (
//       <div>
//         <AuthButton  auth="createUser">创建用户</AuthButton>
//       </div>
//     );
//   }
// }
//  */
