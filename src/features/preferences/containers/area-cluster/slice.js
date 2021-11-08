import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'
import * as UserApi from 'api/user'


export const updateBucketlist = createAsyncThunk('bucketlist/update',
  async (_, { getState }) => {
    const { sids } = bucketlistSelector(getState())
    return await UserApi.updateBucketlist(
      Object.keys(sids).filter(sid => !!sids[sid])
    )
  })

export const bucketlistSlice = createSlice({
  name: 'bucketlist',
  initialState: {
    pending: false,
    sids: {}
  },
  reducers: {
    toggleSelected: (state, { payload }) => {
      console.log(payload)
      state.sids[payload] = !state.sids[payload]
    }
  },
  extraReducers: {
    [updateBucketlist.pending]: state => {
      state.pending = true
    },
    [updateBucketlist.fulfilled]: state => {
      state.pending = false
    },
    [updateBucketlist.rejected]: state => {
      state.pending = false
    }
  }
})

export const bucketlistSelector = state => state.preferences.bucketlist
export const bucketlistHasSelectedSelector = createSelector(
  bucketlistSelector,
  state => Object.keys(state.sids).length > 0
)

export const {
  toggleSelected
} = bucketlistSlice.actions

export default bucketlistSlice.reducer
