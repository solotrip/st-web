import { createSlice } from '@reduxjs/toolkit'

export const bucketlistSlice = createSlice({
  name: 'bucketlist',
  initialState: {
    bucketlisted: ['san-giovanni-rotondo']
  },

  reducers: {
    addToBucketlist: (state, { payload }) => {
      state.bucketlisted = [...state.bucketlisted, payload]
    },
    removeFromBucketlist: (state, { payload }) => {
      state.bucketlisted = [state.bucketlisted.filter(c => c !== payload)]
      // ...state.slice(0,payload), ...state.slice(payload + 1)
    }
  }
})

// Action creators are generated for each case reducer function
export const { addToBucketlist, removeFromBucketlist } = bucketlistSlice.actions

export default bucketlistSlice.reducer
