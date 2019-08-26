import { SET_LOCATION, SET_CITYLIST } from '../ActionTypes'

const initialState = {
  position: {
    city: '北京市',
    cityCode: '131',
    iKangCityCode: '0010'
  },
  cityList: []
}
export default function (state = initialState, action) {
  switch (action.type) {
    case SET_LOCATION: {
      return {
        ...state,
        position: {
          city: action.payload.city,
          cityCode: action.payload.cityCode,
          iKangCityCode: action.payload.iKangCityCode || '0010'
        }
      }
    }
    case SET_CITYLIST: {
      return {
        ...state,
        cityList: action.payload
      }
    }
    default: {
      return state
    }
  }
}
