import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'
import * as UserApi from 'api/user'
import _ from 'lodash'

export const fetchInterests = createAsyncThunk(
  'profile/activityInterests/fetchInterests',
  async () => {
    const interests = await UserApi.getInterests()
    return interests.filter(interest => interest.category === 'activity')
  }
)

export const updateInterests = createAsyncThunk(
  'profile/activityInterests/updateInterests',
  async (_, { getState }) => {
    const { interestsSelected } = activityInterestsSelector(getState())
    const payload = Object.keys(interestsSelected).map(iid => ({
      iid,
      value: interestsSelected[iid]
    }))
    await UserApi.updateInterests(payload)
  }
)

const activityInterestsSlice = createSlice({
  name: 'activityInterests',
  initialState: {
    loadingInterests: true,
    interestsSelected: {},
    interests: [],
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
        action.error,
        'data',
        action.error.toString()
      )
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
        action.error,
        'data',
        action.error.toString()
      )
    }
  }
})

export const activityInterestsSelector = state =>
  state.preferences.activityInterests

export const activityInterestsSelectedCountSelector = createSelector(
  activityInterestsSelector,
  state => Object.keys(state.interestsSelected).length
)

export const activityInterestsHasSelectedSelector = createSelector(
  activityInterestsSelector,
  state => state.interests.filter(interest => interest.selected).length > 0
)

export const { updateInterestsSelected } = activityInterestsSlice.actions

export default activityInterestsSlice.reducer
