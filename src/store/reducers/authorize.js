import {
  SET_USER_AUTHORIZE,
  SET_REDIRECT_PATH,
  LOGOUT
} from '@/store/ActionTypes'

const initialState = {
  isLoginedUser: false,
  token: '',
  userInfo: {},
  redirect: '/'
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_USER_AUTHORIZE:
      return {
        ...state,
        isLoginedUser:
          typeof action.payload.userInfo === 'object' &&
          Object.keys(action.payload.userInfo).length > 0 ?
            true :
            false,
        token: action.payload.token ? action.payload.token : '',
        userInfo: action.payload.userInfo || {}
      }
    case SET_REDIRECT_PATH:
      return {
        ...state,
        redirect: (action.payload && action.payload.redirect) || '/'
      }
    case LOGOUT:
      return {
        ...state,
        isLoginedUser: false,
        token: '',
        userInfo: {},
        redirect: '/mine'
      }
    default:
      return state
  }
}
