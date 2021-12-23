import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import _ from 'lodash'

const querySlice = createSlice({
  name: 'query',
  initialState: {
    query: null
  },
  reducers: {
    save: (state, param) => {
      const { payload } = param
      state.query = payload
    }
  }
})

const { actions, reducer } = querySlice
export const { save } = actions
export default reducer
export const querySelector = state => state.query
