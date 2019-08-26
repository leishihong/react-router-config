import { SET_COLLAPSED } from '../ActionTypes'

export const collapsed = data => dispatch => {
  dispatch({
    type: SET_COLLAPSED,
    isCollapsed: data.isCollapsed
  })
}
