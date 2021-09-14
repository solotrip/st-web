import { createSlice } from "@reduxjs/toolkit";

let defaultSaved = require("./saved.json");

export const savedSlice = createSlice({
  name: "saved",
  initialState: {
    saved: defaultSaved,
  },
  reducers: {
    addToSaved: (state, { payload }) => {
      state.saved = [...state.saved, payload];
    },
    removeFromSaved: (state, { payload }) => {
      state.saved.splice(
        state.saved.findIndex((c) => c.sid === payload.sid),
        1
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToSaved, removeFromSaved } = savedSlice.actions;

export const savedSelector = (state) => state.saved;

export default savedSlice.reducer;
