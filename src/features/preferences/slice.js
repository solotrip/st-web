import { combineReducers } from '@reduxjs/toolkit'
import eventInterests from './containers/event-interests/slice'
import activityInterests from './containers/activity-interests/slice'
import location from './containers/location/slice'
import passports from './containers/passport-countries/slice'

export default combineReducers({
  eventInterests,
  activityInterests,
  location,
  passports
})
