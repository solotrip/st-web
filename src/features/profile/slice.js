import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'
import * as UserApi from '../../api/user'
import _ from 'lodash'

export const updateProfile = createAsyncThunk(
  'profile/update',
  async (data, { dispatch }) => {
    await UserApi.updateProfile(data)
    dispatch(fetchProfile())
  })

export const fetchProfile = createAsyncThunk(
  'profile/fetch',
  async () => {
    return UserApi.getProfile()
  })

const initialState = {
  error: null,
  loading: true,
  data: null
}

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    reset(state) {
      state = initialState
    },
    updateProfileState(state, action) {
      state.data = action.payload
    }
  },
  extraReducers: {
    [fetchProfile.pending]: state => {
      state.error = null
      state.loading = true
    },
    [fetchProfile.fulfilled]: (state, action) => {
      state.loading = false
      state.data = action.payload
    },
    [fetchProfile.error]: (state, action) => {
      state.loading = true
      state.error = _.get(action.error, 'data', action.error.message)
    },
    [updateProfile.pending]: state => {
      state.error = null
      state.loading = true
    },
    [updateProfile.fulfilled]: (state, action) => {
      state.loading = false
      state.data = action.payload
    },
    [updateProfile.error]: (state, action) => {
      state.loading = true
      state.error = _.get(action.error, 'data', action.error.message)
    }
  }
})

export const { reset, updateProfileState } = profileSlice.actions

export const profileSelector = state => state.profile
export const isGuestSelector = createSelector(profileSelector,
  state => state.data ? state.data.isGuest : true)
export const isOnboardedSelector = createSelector(profileSelector,
  state => state.data ? state.data.onboarded : true)
export default profileSlice.reducer
