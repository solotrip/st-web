/**
 * Root reducer config
 */
import { combineReducers } from '@reduxjs/toolkit'
import auth from 'features/auth/slice'
import home from 'features/home/slice'
import preferences from 'features/preferences/slice'
import profile from 'features/profile/slice'
import recommendations from 'features/recommendations/slice'

export default combineReducers({
  auth,
  home,
  preferences,
  profile,
  recommendations
})
