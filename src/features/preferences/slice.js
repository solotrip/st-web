import { combineReducers } from '@reduxjs/toolkit'
import bucketlist from './containers/area-cluster/slice'

export default combineReducers({
  bucketlist
})

export const preferencesSelector = state => state.preferences
