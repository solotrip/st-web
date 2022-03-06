import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  updateLocalPreference
} from 'reducers/localPreferencesSlice'
import countries from 'assets/data/countries.json'


export const updatePassportCountries = createAsyncThunk(
  'profile/passports/update', async (_, { getState, dispatch }) => {
    const {
      modified,
      passports
    } = passportSelector(getState())
    if (modified) {
      dispatch(updateLocalPreference(
        'passportCountries',
        passports.map(item => item.value))
      )
    }
  })

const prepareOptions = () => {
  return countries.map(c => ({ label: `${c.flag} ${c.name}`, value: c.ISO }))
}

const passportsSlice = createSlice({
  name: 'passport',
  initialState: {
    passports: [],
    options: prepareOptions(),
    modified: false
  },
  reducers: {
    updatePassports(state, action) {
      state.passports = action.payload
      state.modified = true
    }
  },
  extraReducers: {
    [updatePassportCountries.fulfilled]:
      state => {
        state.modified = false
      }
  }
})

export const passportSelector = state => state.passport

export const {
  updatePassports
} = passportsSlice.actions

export default passportsSlice.reducer
