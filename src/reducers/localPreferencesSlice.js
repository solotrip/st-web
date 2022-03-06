import { createSlice } from '@reduxjs/toolkit'
import { defaultValues } from 'constants/preferencesOptions'

const localPreferencesSlice = createSlice({
  name: 'localPreferences',
  initialState: {
    ...defaultValues
  },
  reducers: {
    updateLocalPreference: (state,action) => {
      state[action.payload.key] = action.payload.value
    }
  }
})

export const { updateLocalPreference } = localPreferencesSlice.actions

export const localPreferencesSelector = state => state.localPreferences


export default localPreferencesSlice.reducer
