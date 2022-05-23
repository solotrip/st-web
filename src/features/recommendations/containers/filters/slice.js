import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import _get from 'lodash/get'
import _uniq from 'lodash/uniq'
import _keyBy from 'lodash/keyBy'
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
      state.initialized = new Date()
    },
    [fetchFilters.fulfilled]: (state, action) => {
      state.filters = action.payload.filter(f => !f.hidden)
      state.filtersDict = _keyBy(action.payload, 'uuid')
      state.loading = false
    },
    [fetchFilters.rejected]: (state, action) => {
      state.error = _get(action.payload, 'message', action.error.toString())
      state.loading = false
      state.initialized = false
    },
    [fetchRecommendations.pending]: (state, action) => {
      const queryFilters = _get(action.meta, 'arg.filters', [])
      state.recentFilters = _uniq([
        ...queryFilters.map(f => f.id),
        ...state.recentFilters
      ])

    }
  }
})

export const filtersSelector = state => state.filters
export const isVisaFilterSelector = state => filterId => {
  return _get(
    state, `filters.filtersDict.${filterId}.sc`, ''
  ) === 'visa'
}

export default filtersSlice.reducer
