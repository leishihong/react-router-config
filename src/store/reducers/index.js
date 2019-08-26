import { combineReducers } from 'redux' //将多个reducer合成一个总的reducer

import locationReducer from './locationReducer'
import authorize from './authorize'
import loading from './loading'
import collapsed from './sliderMenu'
import commonApi from './commonApi'
import auth from './auth'
export default combineReducers({
  location: locationReducer,
  authorize,
  loading,
  collapsed,
  authList: auth,
  userInfo: auth.userInfo,
  list: commonApi
})
