/**
 * Root reducer config
 */
import { combineReducers } from '@reduxjs/toolkit'
import auth from '../features/auth/slice'
import home from '../features/home/slice'

export default combineReducers({
  auth,
  home
})
