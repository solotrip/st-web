import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as ExchangeRatesApi from 'api/exchangeRates'
import _get from 'lodash/get'

export const fetchExchangeRates = createAsyncThunk(
  'exchangeRates/fetch',
  async () => {
    return await ExchangeRatesApi.getExchangeRates()
  }
)
const initialState = {
  loading: false,
  exchangeRates: null,
  initialized: false,
  error: null
}

const exchangeRatesSlice = createSlice({
  name: 'exchangeRates',
  initialState: initialState,
  extraReducers: {
    [fetchExchangeRates.pending]: state => {
      state.error = null
      state.loading = true
      state.initialized = true
    },
    [fetchExchangeRates.fulfilled]: (state, action) => {
      state.exchangeRates = action.payload
      state.loading = false
    },
    [fetchExchangeRates.rejected]: (state, action) => {
      state.error = _get(action.error, 'data', action.error.toString())
      state.loading = false
      state.initialized = false
    }
  }
})

export const exchangeRatesSelector = state => state.exchangeRates

export default exchangeRatesSlice.reducer
