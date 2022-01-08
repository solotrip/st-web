import { createSlice } from '@reduxjs/toolkit'


const activeRecoSlice = createSlice({
  name: 'activeReco',
  initialState: {
    activeReco: null
  },
  reducers: {
    save: (state, param) => {
      const { payload } = param
      state.activeReco = payload
    }
  }
})

const { actions, reducer } = activeRecoSlice
export const { save } = actions
export default reducer
export const activeRecoSelector = state => state.activeReco
