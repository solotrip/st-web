import { createSlice } from "@reduxjs/toolkit";

export const navigationSlice = createSlice({
  name: "navigation",
  initialState: {
    activeTab: "Recommendations",
  },
  reducers: {
    selectTab: (state, { payload }) => {
      state.activeTab = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { selectTab } = navigationSlice.actions;

export default navigationSlice.reducer;
