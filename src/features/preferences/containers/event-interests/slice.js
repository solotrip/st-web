import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'
import * as UserApi from 'api/user'
import _ from 'lodash'

export const fetchInterests = createAsyncThunk(
  'profile/eventInterests/fetchInterests', async () => {
    const interests = await UserApi.getInterests()
    return interests.filter(interest => interest.category === 'interest')
  }
)

export const updateInterests = createAsyncThunk(
  'profile/eventInterests/updateInterests', async (_, { getState }) => {
    const { interestsSelected } = eventInterestsSelector(getState())
    const payload = Object.keys(interestsSelected).map(iid => ({
      iid,
      value: interestsSelected[iid]
    }))
    await UserApi.updateInterests(payload)
  }
)

const eventInterestsSlice = createSlice({
  name: 'eventInterests',
  initialState: {
    loadingInterests: true,
    interests: [],
    interestsSelected: {},
    errorInterests: null
  },
  reducers: {
    updateInterestsSelected(state, action) {
      const { iid, value, currentValue } = action.payload
      if (value === currentValue) {
        delete state.interestsSelected[iid]
      } else {
        state.interestsSelected[iid] = value
      }
    }
  },
  extraReducers: {
    [fetchInterests.pending]: state => {
      state.errorInterests = null
      state.loadingInterests = true
    },
    [fetchInterests.fulfilled]: (state, action) => {
      state.interests = action.payload
      state.loadingInterests = false
    },
    [fetchInterests.rejected]: (state, action) => {
      state.errorInterests = _.get(
        action.error, 'data', action.error.toString())
      state.loadingInterests = false
    },
    [updateInterests.fulfilled]: state => {
      state.interests = state.interests.map(e => ({
        ...e,
        selected: _.get(state.interestsSelected, e.id, e.selected)
      }))
      state.interestsSelected = {}
    },
    [updateInterests.rejected]: (state, action) => {
      state.errorInterests = _.get(
        action.error, 'message', action.error.toString())
    }
  }
})

export const eventInterestsSelector = state => state.preferences.eventInterests
export const eventInterestsSelectedCountSelector = createSelector(
  eventInterestsSelector,
  state => Object.keys(state.interestsSelected).length
)
export const eventInterestsHasSelectedSelector = createSelector(
  eventInterestsSelector,
  state => state.interests.filter(interest => interest.selected).length > 0
)


export const {
  updateInterestsSelected
} = eventInterestsSlice.actions

export default eventInterestsSlice.reducer
