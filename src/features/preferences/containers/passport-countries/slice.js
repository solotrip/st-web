import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchProfile, updateProfileState } from '../../../profile/slice'
import _ from 'lodash'
import * as UserApi from 'api/user'
import countries from 'assets/data/countries.json'


export const updatePassportCountries = createAsyncThunk(
  'profile/passports/update', async (_, { getState, dispatch }) => {
    const {
      modified,
      passports
    } = passportsSelector(getState())
    if (modified) {
      const data = await UserApi.updateProfile({
        passportCountries: passports.map(item => item.value)
      })
      dispatch(updateProfileState(data))
      return data
    }
  })

const prepareOptions = () => {
  return countries.map(c => ({ label: `${c.flag} ${c.name}`, value: c.ISO }))
}

const passportsSlice = createSlice({
  name: 'passports',
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
    [fetchProfile.fulfilled]: (state, action) => {
      // If not previously modified, initialize the value when profile is loaded
      if (!state.modified
        &&
        _.has(action, 'payload.passportCountries')
      ) {
        state.passports = action.payload.passportCountries.map(passport => (
          _.find(state.options, option => option.value === passport)
        ))
      }
    },
    [updatePassportCountries.fulfilled]:
      state => {
        state.modified = false
      }
  }
})

export const passportsSelector = state => state.preferences.passports

export const {
  updatePassports
} = passportsSlice.actions

export default passportsSlice.reducer
