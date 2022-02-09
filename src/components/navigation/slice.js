import { createSlice } from '@reduxjs/toolkit'

export const navigationSlice = createSlice({
  name: 'navigation',
  initialState: {
    activeTab: 'Recommendations',
    recentItemScrollId: 0
  },
  reducers: {
    selectTab: (state, { payload }) => {
      state.activeTab = payload
    },
    saveScrollPosition: (state, { payload }) => {
      state.recentItemScrollId = payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { selectTab, saveScrollPosition } = navigationSlice.actions

export const navigationSelector = state => state.navigation

export default navigationSlice.reducer
