import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as BrowseApi from '../../api/browse'
import _get from 'lodash/get'

export const fetchBrowseItems = createAsyncThunk('browse/fetch',
  async () => {
    return await BrowseApi.getBrowseItems()
  })

const browseSlice = createSlice({
  name: 'browse',
  initialState: {
    loading: true,
    browseItems: [],
    results: [],
    error: null
  },
  extraReducers: {
    [fetchBrowseItems.pending]: state => {
      state.error = null
      state.loading = true
    },
    [fetchBrowseItems.fulfilled]: (state, action) => {
      state.browseItems = action.payload
      state.loading = false
    },
    [fetchBrowseItems.rejected]: (state, action) => {
      state.error = _get(action.error, 'data', action.error.toString())
      state.loading = false
    }
  }
})

export const browseSelector = state => state.browse

export default browseSlice.reducer
