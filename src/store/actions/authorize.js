import {
  SET_USER_AUTHORIZE,
  SET_REDIRECT_PATH,
  LOGOUT
} from '@/store/ActionTypes'
// import { triggerLogout } from '@/api/auth';
import { setCookie, delCookie } from '@/basic/utils'

/**
 * 用于设置用户信息
 * @param {Object} data 用户信息
 */
export const setUserAuthorize = data => dispatch => {
  if (data.token) {
    setCookie('access_token', data.token)
  } else {
    delCookie('access_token')
  }
  dispatch({
    type: SET_USER_AUTHORIZE,
    payload: data
  })
}

/**
 * 设置用户登录后的跳转地址
 */
export const setRedirectPath = data => dispatch => {
  dispatch({
    type: SET_REDIRECT_PATH,
    payload: data
  })
}

/**
 * 退出登录
 */
export const logout = data => dispatch => {
  // triggerLogout().then(res => {
  //   if (res.code === 1) {
  //     delCookie('access_token')
  //     dispatch({
  //       type: LOGOUT
  //     })
  //   }
  // })
}
