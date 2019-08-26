import { START_LOADING, STOP_LOADING } from '@/store/ActionTypes'

const initialState = {
  loading: false
}

export default function (state = initialState, action) {
  switch (action.type) {
    case START_LOADING: {
      return {
        ...state,
        loading: true
      }
    }
    case STOP_LOADING: {
      return {
        ...state,
        loading: false
      }
    }
    default: {
      return state
    }
  }
}
