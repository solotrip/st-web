/**
 * Root reducer config
 */
import { combineReducers } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import auth from 'features/auth/slice'
import preferences from 'features/preferences/slice'
import profile from 'features/profile/slice'
import recommendations from 'features/recommendations/slice'
import locationReducer from 'features/recommendations/containers/location/slice'
import filtersReducer from 'features/recommendations/containers/filters/slice'
import datesReducer
  from 'features/recommendations/containers/date-selector/slice'
import recentQueriesReducer from './recentQueriesSlice'
import localPreferencesReducer from './localPreferencesSlice'
import exchangeRates from './exchangeRatesSlice'
import wishlist from 'features/wishlist/slice'
import track from 'features/track/slice'
import notifications from 'features/notifications/slice'
import browse from 'features/browse/slice'
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'
import storage from 'utils/redux-persist-capacitor-storage'

const persistConfig = {
  storage,
  stateReconciler: hardSet
}

const location = persistReducer(
  {
    ...persistConfig,
    key: 'location'
  },
  locationReducer
)

const filters = persistReducer(
  {
    ...persistConfig,
    key: 'filters'
  },
  filtersReducer
)

const dates = persistReducer(
  {
    ...persistConfig,
    key: 'dates'
  },
  datesReducer
)

const recentQueries = persistReducer(
  {
    ...persistConfig,
    key: 'recentQueries'
  },
  recentQueriesReducer
)

const localPreferences = persistReducer(
  {
    ...persistConfig,
    key: 'localPreferences'
  },
  localPreferencesReducer
)


export default combineReducers({
  auth,
  preferences,
  profile,
  recommendations,
  wishlist,
  track,
  notifications,
  location,
  filters,
  dates,
  exchangeRates,
  browse,
  recentQueries,
  localPreferences
})
