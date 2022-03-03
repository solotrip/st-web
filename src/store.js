/**
 * Redux store configuration
 */
import {
  configureStore,
  getDefaultMiddleware,
  isRejectedWithValue
} from '@reduxjs/toolkit'
import rootReducer from './reducers'
import { toast } from 'react-toastify'

const errorLogger = () => next => action => {

  if (isRejectedWithValue(action)) {
    toast.warn({
      title: 'Something went wrong!',
      message: action.error.message
    })
  }

  return next(action)
}

const resettableRootReducer = (state, action) => {
  if (action.type === 'store/reset') {
    return rootReducer(undefined, action)
  }
  return rootReducer(state, action)
}

const store = configureStore({
  reducer: resettableRootReducer,
  middleware: [...getDefaultMiddleware(), errorLogger]
})

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./reducers', () => {
    const newRootReducer = require('./reducers').default
    store.replaceReducer(newRootReducer)
  })
}

export default store
