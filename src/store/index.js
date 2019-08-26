/*
 * @Author: shihong.lei@advance.ai
 * @Date: 2019-06-21 16:47:37
 * @Last Modified by: shihong.lei
 * @Last Modified time: 2019-07-29 19:27:21
 */
import { createStore, applyMiddleware } from 'redux'

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native
import { composeWithDevTools } from 'redux-devtools-extension'

import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'

import rootReducer from './reducers/index'

const persistConfig = {
  key: 'root',
  storage
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

const middleware = [ thunk ]

if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger())
}

// const composeSetup =
//   process.env.NODE_ENV !== 'production' &&
//   typeof window === 'object' &&
//   window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//     ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//     : compose;

// store
export const store = createStore(
  persistedReducer,
  // compose(applyMiddleware(...middleware)),
  composeWithDevTools(applyMiddleware(...middleware))
)
export const persistor = persistStore(store)
