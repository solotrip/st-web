import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as NotificationApi from '../../api/notification'
import _get from 'lodash/get'

export const fetchNotifications = createAsyncThunk('notifications/fetch',
  async () => {
    return await NotificationApi.getNotifications()
  })

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: {
    loading: true,
    notifications: [],
    results: [],
    error: null
  },
  extraReducers: {
    [fetchNotifications.pending]: state => {
      state.error = null
      state.loading = true
    },
    [fetchNotifications.fulfilled]: (state, action) => {
      state.notifications = action.payload
      state.loading = false
    },
    [fetchNotifications.rejected]: (state, action) => {
      state.error = _get(action.error, 'data', action.error.toString())
      state.loading = false
    }
  }
})

export const notificationsSelector = state => state.notifications

export default notificationsSlice.reducer
