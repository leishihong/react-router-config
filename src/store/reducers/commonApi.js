import { GET_TRADE_LIST } from '@/store/ActionTypes'

const initialState = {
  tradeList: []
}
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_TRADE_LIST: {
      return {
        ...state,
        tradeList: action.payload
      }
    }
    default: {
      return state
    }
  }
}
