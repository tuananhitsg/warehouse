import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {
    setUser: (state, action) => {
      state.info = action.payload;
    },
    setGmail: (state, action) => {
      state.gmail = action.payload;
    },
  },
});

export const { setUser, setGmail } = userSlice.actions;
export default userSlice.reducer;
