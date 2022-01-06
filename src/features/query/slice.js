import { createSlice } from '@reduxjs/toolkit'

const querySlice = createSlice({
  name: 'query',
  initialState: {
    query: null,
    queryMonths: null,
    queryObject: null
  },
  reducers: {
    save: (state, param) => {
      const { payload } = param
      state.query = payload
    },
    saveMonths: (state, param) => {
      const { payload } = param
      state.queryMonths = payload
    },
    saveObject: (state, param) => {
      const { payload } = param
      state.queryObject = payload
    }
  }
})

const { actions, reducer } = querySlice
export const { save, saveMonths, saveObject } = actions
export default reducer
export const querySelector = state => state.query
export const queryObjectSelector = state => state.queryObject
