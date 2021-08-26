/**
 * Redux store configuration
 */
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import rootReducer from './reducers'

const resettableRootReducer = (state, action) => {
  if (action.type === 'store/reset') {
    return rootReducer(undefined, action)
  }
  return rootReducer(state, action)
}

const store = configureStore({
  reducer: resettableRootReducer,
  middleware: [...getDefaultMiddleware()]
})

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./reducers', () => {
    const newRootReducer = require('./reducers').default
    store.replaceReducer(newRootReducer)
  })
}

export default store
