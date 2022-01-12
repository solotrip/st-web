import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import _ from 'lodash'
import * as AreaApi from 'api/area'

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
    initialized: false
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
    }
  }
})

export const filtersSelector = state => state.filters

export default filtersSlice.reducer
