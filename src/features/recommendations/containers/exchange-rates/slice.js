import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as ExchangeRatesApi from '../../../../api/exchangeRates'
import _ from 'lodash'

export const fetchExchangeRates = createAsyncThunk(
  'exchangeRates/fetch',
  async () => {
    return await ExchangeRatesApi.getExchangeRates()
  }
)
const initialState = {
  loading: false,
  exchangeRates: null,
  results: [],
  error: null
}

const exchangeRatesSlice = createSlice({
  name: 'exchangeRates',
  initialState: initialState,
  extraReducers: {
    [fetchExchangeRates.pending]: state => {
      state.error = null
      state.loading = true
    },
    [fetchExchangeRates.fulfilled]: (state, action) => {
      state.exchangeRates = action.payload
      state.loading = false
    },
    [fetchExchangeRates.rejected]: (state, action) => {
      state.error = _.get(action.error, 'data', action.error.toString())
      state.loading = false
    }
  }
})

export const exchangeRatesSelector = state => state.exchangeRates

export default exchangeRatesSlice.reducer
