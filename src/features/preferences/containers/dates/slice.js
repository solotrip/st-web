import { createSlice } from '@reduxjs/toolkit'

export const availabilitySlice = createSlice({
  name: 'availabilities',
  initialState: {
    selectedAvailability: null,
    availabilities: [
      {
        value: ['Summer Vacation', 'Mar 30 - Aug 29'],
        label: 'Summer Vacation'
      },
      {
        value: ['My Weekend Getaway', 'Jun 4 - 5'],
        label: 'My Weekend Getaway (June 4 - 5)'
      },
      {
        value: ['Winterfell', 'Jan 1 - 15'],
        label: 'Winterfell (January 1 - 15)'
      }
    ]
  },
  reducers: {
    selectAvailability: (state, { payload }) => {
      state.selectedAvailability = payload
    },

    addAvailability: (state, { payload }) => {
      state.availabilities = [...state, payload]
    }
  }
})

// Action creators are generated for each case reducer function
export const { selectAvailability, addAvailability } = availabilitySlice.actions

export default availabilitySlice.reducer
