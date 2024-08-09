import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {},
  extraReducers: () => {},
});

export const {} = accountSlice.actions;
export default accountSlice.reducer;
