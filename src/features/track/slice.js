import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as RecommendationApi from 'api/recommendation'
import _ from 'lodash'
import { toast } from 'react-toastify'


export const addToTracked = createAsyncThunk(
  'track/add',
  async ({ recommendationId, name }) => {
    await RecommendationApi.trackQuery(recommendationId, name)
    toast.info('You will be notified when this recommendation is updated')
    return recommendationId
  }
)

export const removeFromTracked = createAsyncThunk(
  'track/remove',
  async trackedId => {
    await RecommendationApi.stopTrackingQuery(trackedId)
    toast.info('You will not receive notifications for this recommendation')
    return trackedId
  }
)

export const fetchTracked = createAsyncThunk(
  'track/fetch',
  async () => {
    return RecommendationApi.getTrackedQueries()
  }
)

export const trackSlice = createSlice({
  name: 'track',
  initialState: {
    tracked: {},
    loading: false,
    error: null,
    initialized: false
  },
  extraReducers: {
    [addToTracked.fulfilled]: state => {
      state.loading = false
    },
    [addToTracked.rejected]: (state, action) => {
      state.error = _.get(
        action.error,
        'data',
        action.error.toString()
      )
      state.tracked[action.meta.arg] = false
      state.loading = false
    },
    [addToTracked.pending]: (state, action) => {
      state.loading = true
      state.tracked[action.meta.arg.recommendationId] = true
      state.error = null
    },
    [removeFromTracked.fulfilled]: (state, action) => {
      state.loading = false
    },
    [removeFromTracked.rejected]: (state, action) => {
      state.error = _.get(
        action.error,
        'data',
        action.error.toString()
      )
      state.tracked[action.meta.arg] = true
      state.loading = false
    },
    [removeFromTracked.pending]: (state, action) => {
      state.tracked[action.meta.arg] = false
      state.loading = true
      state.error = null
    },
    [fetchTracked.fulfilled]: (state, action) => {
      state.tracked = _.keyBy(action.payload, 'recommendationId')
      state.loading = false
    },
    [fetchTracked.rejected]: (state, action) => {
      state.error = _.get(
        action.error,
        'data',
        action.error.toString()
      )
      state.loading = false
    },
    [fetchTracked.pending]: state => {
      state.initialized = true
      state.loading = true
      state.error = null
    }
  }
})

// Action creators are generated for each case reducer function
export const trackSelector = state => state.track

export default trackSlice.reducer
