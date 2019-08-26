import { START_LOADING, STOP_LOADING } from '../ActionTypes'

export const loading = data => dispatch => {
  dispatch({
    type: START_LOADING
  })
}

export const stopLoading = data => dispatch => {
  dispatch({
    type: STOP_LOADING
  })
}
