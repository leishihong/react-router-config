import { SET_LOCATION, SET_CITYLIST } from '../ActionTypes'

import { getIndexAllCitys } from '@/api/index.js'

export const setLocation = data => dispatch => {
  dispatch({
    type: SET_LOCATION,
    payload: data
  })
}

export const getAllCitys = data => async dispatch => {
  const res = await getIndexAllCitys()
  dispatch({
    type: SET_CITYLIST,
    payload: res.results
  })
}
