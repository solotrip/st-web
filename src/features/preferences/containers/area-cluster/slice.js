import { createSlice } from '@reduxjs/toolkit'

export const clusterSlice = createSlice({
  name: 'clusters',
  initialState: {
    selectedClusters: []
  },
  reducers: {
    selectClusters: (state, { payload }) => {
      state.selectedClusters = payload
    },
    addToClusters: (state, { payload }) => {
      state.selectedClusters = [...state.selectedClusters, payload]
    },
    removeFromClusters: (state, { payload }) => {
      state.selectedClusters.splice(
        state.selectedClusters.findIndex(c => c === payload),
        1
      )
    }
  }
})

// Action creators are generated for each case reducer function
export const {
  selectClusters,
  addToClusters,
  removeFromClusters
} = clusterSlice.actions

export default clusterSlice.reducer
