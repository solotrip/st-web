import { createSlice } from "@reduxjs/toolkit";

export const availabilitySlice = createSlice({
  name: "availabilities",
  initialState: {
    selectedAvailability: null,
    availabilities: [
      {
        value: "march_30-august_29",
        label: "Summer Vacation (March 30 - August 29)",
      },
      { value: "june_4-june_5", label: "My Weekend Getaway (June 4 - 5)" },
      { value: "january_1-january_15", label: "Winterfell (January 1 - 15)" },
    ],
  },
  reducers: {
    selectAvailability: (state, { payload }) => {
      state.selectedAvailability = payload;
    },

    addAvailability: (state, { payload }) => {
      state.availabilities = [...state, payload];
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  selectAvailability,
  addAvailability,
} = availabilitySlice.actions;

export default availabilitySlice.reducer;
