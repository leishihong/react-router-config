import { GET_TRADE_LIST } from '@/store/ActionTypes'

import { fetchTradeAll } from '@/api/common.js'

export const getAllTrade = async dispatch => {
  console.log(12344444, dispatch)
  const { code, results } = await fetchTradeAll()
  if (code) {
    dispatch({
      type: GET_TRADE_LIST,
      payload: results
    })
  }
}
