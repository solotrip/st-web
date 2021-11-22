import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import _ from 'lodash'
import * as UserApi from 'api/user'
import { getGeolocation } from 'utils/geolocation'
import { fetchProfile, updateProfileState } from '../../../profile/slice'
//import { Capacitor } from "@capacitor/core";
//import { Geolocation } from "@capacitor/geolocation";

export const fetchBrowserGeolocation = createAsyncThunk(
  'profile/location/fetchBrowserGeolocation',
  async () => {
    return getGeolocation()
  }
)

export const updateLocation = createAsyncThunk(
  'profile/location/update',
  async (_, { getState, dispatch }) => {
    //let coordinatesHolder;
    const { modified, coordinates } = locationSelector(getState())

    //coordinatesHolder = coordinates;

    //if (Capacitor.getPlatform() === "ios") {
    //  const nativeCoordinates = await Geolocation.getCurrentPosition();
    //  coordinatesHolder = nativeCoordinates.coords;
    //}

    if (modified) {
      const data = await UserApi.updateLocation({
        lat: coordinates.latitude,
        lon: coordinates.longitude
      })
      dispatch(updateProfileState(data))
      return data
    }
  }
)

const locationSlice = createSlice({
  name: 'location',
  initialState: {
    loadingBrowserGeolocation: false,
    errorBrowserGeolocation: null,
    coordinates: null,
    modified: false
  },
  reducers: {},
  extraReducers: {
    [fetchBrowserGeolocation.pending]: state => {
      state.errorBrowserGeolocation = null
      state.loadingBrowserGeolocation = true
    },
    [fetchBrowserGeolocation.fulfilled]: (state, action) => {
      state.coordinates = action.payload
      state.modified = true
      state.loadingBrowserGeolocation = false
    },
    [fetchBrowserGeolocation.rejected]: (state, action) => {
      state.errorBrowserGeolocation = _.get(
        action.error,
        'data',
        action.error.toString()
      )
      state.loadingBrowserGeolocation = false
    },
    [fetchProfile.fulfilled]: (state, action) => {
      // If not previously modified, initialize the value when profile is loaded
      if (!state.modified && _.has(action, 'payload.location.coordinates[0]')) {
        state.coordinates = {
          longitude: action.payload.location.coordinates[0],
          latitude: action.payload.location.coordinates[1]
        }
      }
    },
    [updateLocation.fulfilled]: state => {
      state.modified = false
    }
  }
})

export const locationSelector = state => state.location

export default locationSlice.reducer
