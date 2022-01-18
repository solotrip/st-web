import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import _ from 'lodash'
import * as AreaApi from 'api/area'
import { fetchRecommendations } from 'features/recommendations/slice'

export const fetchFilters = createAsyncThunk(
  'filters/fetchFilters', async () => {
    return AreaApi.getFilters()
  })
const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    filters: [],
    filtersDict: {},
    loading: true,
    initialized: false,
    recentFilters: []
  },
  reducers: {},
  extraReducers: {
    [fetchFilters.pending]: state => {
      state.error = null
      state.loading = true
      state.initialized = true
    },
    [fetchFilters.fulfilled]: (state, action) => {
      state.filters = action.payload.filter(f => !f.hidden)
      state.filtersDict = _.keyBy(action.payload, 'uuid')
      state.loading = false
    },
    [fetchFilters.rejected]: (state, action) => {
      state.error = _.get(action.payload, 'message', action.error.toString())
      state.loading = false
      state.initialized = false
    },
    [fetchRecommendations.pending]: (state, action) => {
      const queryFilters = _.get(action.meta, 'arg.filters' , [])
      state.recentFilters = _.uniq([
        ...queryFilters.map(f => f.id),
        ...state.recentFilters
      ])

    }
  }
})

export const filtersSelector = state => state.filters

export default filtersSlice.reducer
