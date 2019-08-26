import {
  GET_AUTH_LIST,
  LOG_OUT,
  SET_LOGIN_USER_INFO
} from '@/store/ActionTypes'

const initialState = {
  authList: [],
  userInfo: {}
}
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_AUTH_LIST: {
      return {
        ...state,
        authList: action.payload
      }
    }
    case LOG_OUT: {
      return {
        ...state,
        authList: action.payload,
        userInfo: {},
        redirect: '/'
      }
    }
    case SET_LOGIN_USER_INFO: {
      return {
        ...state,
        userInfo: action.payload
      }
    }
    default: {
      return state
    }
  }
}
