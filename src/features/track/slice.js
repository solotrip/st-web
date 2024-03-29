import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as RecommendationApi from 'api/recommendation'
import _get from 'lodash/get'
import _keyBy from 'lodash/keyBy'
import { toast } from 'react-toastify'


export const addToTracked = createAsyncThunk(
  'track/add',
  async ({ recommendationHash, name }) => {
    await RecommendationApi.trackQuery(recommendationHash, name)
    toast.info('You will be notified when this recommendation is updated')
    return recommendationHash
  }
)

export const removeFromTracked = createAsyncThunk(
  'track/remove',
  async recommendationHash => {
    await RecommendationApi.stopTrackingQuery(recommendationHash)
    toast.info('You will not receive notifications for this recommendation')
    return recommendationHash
  }
)

export const fetchTracked = createAsyncThunk(
  'track/fetch',
  async (_p, { getState }) => {
    const { loading, initialized, tracked } = trackSelector(getState())
    if (!initialized && loading) {
      return RecommendationApi.getTrackedQueries()
    }
    if (initialized) {
      return Object.values(tracked)
    }
    return null
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
      state.error = _get(
        action.error,
        'data',
        action.error.toString()
      )
      state.tracked[action.meta.arg] = false
      state.loading = false
    },
    [addToTracked.pending]: (state, action) => {
      state.loading = true
      state.tracked[action.meta.arg.recommendationHash] = true
      state.error = null
    },
    [removeFromTracked.fulfilled]: (state, action) => {
      state.loading = false
    },
    [removeFromTracked.rejected]: (state, action) => {
      state.error = _get(
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
      state.tracked = _keyBy(action.payload, 'hash')
      state.loading = false
      state.initialized = true
    },
    [fetchTracked.rejected]: (state, action) => {
      state.error = _get(
        action.error,
        'data',
        action.error.toString()
      )
      state.loading = false
    },
    [fetchTracked.pending]: state => {
      state.loading = true
      state.error = null
    }
  }
})

// Action creators are generated for each case reducer function
export const trackSelector = state => state.track

export default trackSlice.reducer
