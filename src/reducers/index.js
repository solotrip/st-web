/**
 * Root reducer config
 */
import { combineReducers } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import auth from 'features/auth/slice'
import home from 'features/home/slice'
import preferences from 'features/preferences/slice'
import profile from 'features/profile/slice'
import recommendations from 'features/recommendations/slice'
import locationReducer from 'features/recommendations/containers/location/slice'
import passport from 'features/recommendations/containers/passport-countries/slice'
import activeReco from 'features/active-reco/slice'
import filters from 'features/recommendations/containers/filters/slice'
import navigation from 'components/navigation/slice'
import wishlist from 'features/wishlist/slice'
import track from 'features/track/slice'
import notifications from 'features/notifications/slice'
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'
import storage from 'utils/redux-persist-capacitor-storage'
import query from 'features/query/slice'

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

export default combineReducers({
  auth,
  home,
  preferences,
  profile,
  recommendations,
  navigation,
  wishlist,
  track,
  notifications,
  location,
  passport,
  filters,
  query,
  activeReco
})
