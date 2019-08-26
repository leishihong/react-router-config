import { SET_COLLAPSED } from '@/store/ActionTypes'

const initialState = {
  isCollapsed: false
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_COLLAPSED: {
      console.log(action, ' action.isCollapsed')
      return {
        ...state,
        isCollapsed: action.isCollapsed
      }
    }
    default: {
      return state
    }
  }
}
