import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as AreaApi from '../../api/area'
import _ from 'lodash'

export const fetchFilters = createAsyncThunk('home/fetchFilters', async () => {
  return await AreaApi.getFilters()
})

export const searchAreas = createAsyncThunk(
  'home/searchAreas',
  async (params, thunkAPI) => {
    const { filterValues, query } = thunkAPI.getState().home
    const filters = Object.keys(filterValues).map(k => ({
      id: k,
      variables: filterValues[k] === true ? undefined : filterValues[k]
    }))
    return await AreaApi.searchAreas({ filters, query })
  }
)

export const updateFilter = (filterId, variables) => dispatch => {
  try {
    if (variables === false) {
      // If checkbox is set to false, remove the filter
      dispatch(homeSlice.actions.removeFilterById({ id: filterId }))
    } else {
      dispatch(homeSlice.actions.updateFilterById({ id: filterId, variables }))
    }
    dispatch(searchAreas())
  } catch (e) {
    console.error(e)
  }
}

export const updateQuery = value => dispatch => {
  dispatch(homeSlice.actions.updateQuery(value))
  dispatch(searchAreas())
}

const homeSlice = createSlice({
  name: 'home',
  initialState: {
    loading: true,
    filters: [],
    filterValues: {},
    query: '',
    results: []
  },
  reducers: {
    updateFilterById(state, action) {
      state.filterValues[action.payload.id] = action.payload.variables
    },
    removeFilterById(state, action) {
      delete state.filterValues[action.payload.id]
    },
    resetFilters(state) {
      state.filterValues = {}
      state.results = []
      state.query = ''
    },
    updateQuery(state, action) {
      state.query = action.payload
    }
  },
  extraReducers: {
    [fetchFilters.pending]: state => {
      state.error = null
      state.loading = true
    },
    [fetchFilters.fulfilled]: (state, action) => {
      state.filters = action.payload
      state.loading = false
    },
    [fetchFilters.rejected]: (state, action) => {
      state.error = _.get(action.error, 'data', action.error.toString())
      state.loading = false
    },
    [searchAreas.pending]: state => {
      state.error = null
      state.loading = true
      state.results = []
    },
    [searchAreas.fulfilled]: (state, action) => {
      state.error = null
      state.loading = true
      state.results = action.payload
    },
    [searchAreas.rejected]: (state, action) => {
      state.error = _.get(action.error, 'data', action.error.toString())
      state.loading = false
    }
  }
})

export const { resetFilters } = homeSlice.actions

export default homeSlice.reducer
