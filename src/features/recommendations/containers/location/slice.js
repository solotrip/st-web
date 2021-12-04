import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import _ from 'lodash'
import * as LocationApi from 'api/location'
import { getGeolocation } from 'utils/geolocation'

export const coordsToQuery = ({
  latitude,
  longitude
}) => `${parseFloat(longitude.toFixed(2))},${parseFloat(latitude.toFixed(2))}`

export const fetchCurrentLocation = createAsyncThunk(
  'profile/location/fetchBrowserGeolocation',
  async (_, { getState }) => {

    const coords = await getGeolocation()
    const q = coordsToQuery(coords)
    const { locations } = locationSelector(getState())
    if (locations[q]) {
      return {
        q,
        data: locations[q]
      }
    }
    const data = await LocationApi.geocodeLocation({
      lon: coords.longitude,
      lat: coords.latitude
    })
    return {
      q,
      data
    }
  }
)

export const searchLocation = createAsyncThunk(
  'profile/location/search',
  async ({ query }) => {
    if (query === '') return []
    return LocationApi.searchLocation({ query })
  }
)

export const fillLocationData = createAsyncThunk(
  'profile/location/fill',
  async ({ lat, lon }, { getState }) => {
    const q = coordsToQuery({
      latitude: parseFloat(lat),
      longitude: parseFloat(lon)
    })
    const { locations } = locationSelector(getState())
    if (!locations[q]) {
      const data = await LocationApi.geocodeLocation({
        lon,
        lat
      })
      return {
        q,
        data
      }
    }
    return {
      q,
      data: locations[q]
    }
  }
)

const locationSlice = createSlice({
  name: 'location',
  initialState: {
    fetchingCurrentLocation: true,
    searchingLocations: false,
    currentLocation: '',
    errorCurrentLocation: false,
    recentLocations: [],
    activeLocation: '',
    locations: {},
    query: '',
    results: []
  },
  reducers: {
    updateLocation: (state, action) => {
      const key = coordsToQuery({
        latitude: action.payload.lat,
        longitude: action.payload.lon
      })
      state.activeLocation = key
      state.recentLocations = _.uniq([key, ...state.recentLocations])
      state.locations[key] = action.payload
      state.query = ''
      state.results = []
    }
  },
  extraReducers: {
    [fetchCurrentLocation.pending]: state => {
      state.fetchingCurrentLocation = true
      state.errorCurrentLocation = false
    },
    [fetchCurrentLocation.fulfilled]: (state, action) => {
      state.locations[action.payload.q] = action.payload.data
      state.currentLocation = action.payload.q
      state.fetchingCurrentLocation = false
    },
    [fillLocationData.fulfilled]: (state, action) => {
      state.locations[action.payload.q] = action.payload.data
      state.recentLocations = _.uniq([
        action.payload.q, ...state.recentLocations
      ])
      state.activeLocation = action.payload.q
      state.fetchingCurrentLocation = false
    },
    [fetchCurrentLocation.rejected]: state => {
      state.fetchingCurrentLocation = false
      state.errorCurrentLocation = true
    },
    [searchLocation.fulfilled]: (state, action) => {
      state.results = action.payload
      state.searchingLocations = false
    },
    [searchLocation.pending]: (state, action) => {
      state.searchingLocations = true
      state.query = action.meta.arg.query
    },
    [searchLocation.rejected]: state => {
      state.searchingLocations = false
    }
  }
})

export const locationSelector = state => state.location

export const { updateLocation } = locationSlice.actions

export default locationSlice.reducer
