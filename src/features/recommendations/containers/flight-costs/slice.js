import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as FlightCostsApi from '../../../../api/flightCosts'
import _ from 'lodash'

export const fetchFlightCosts = createAsyncThunk(
  'flightCosts/fetch',
  async () => {
    return await FlightCostsApi.getFlightCosts()
  }
)
const initialState = {
  loading: false,
  flightCosts: null,
  results: [],
  error: null
}

const flightCostsSlice = createSlice({
  name: 'flightCosts',
  initialState: initialState,
  extraReducers: {
    [fetchFlightCosts.pending]: state => {
      state.error = null
      state.loading = true
    },
    [fetchFlightCosts.fulfilled]: (state, action) => {
      state.flightCosts = action.payload
      state.loading = false
    },
    [fetchFlightCosts.rejected]: (state, action) => {
      state.error = _.get(action.error, 'data', action.error.toString())
      state.loading = false
    }
  }
})

export const flightCostsSelector = state => state.flightCosts

export default flightCostsSlice.reducer
