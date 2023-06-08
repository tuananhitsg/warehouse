
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  reload: false,
};
const reloadSlice = createSlice({
  name: "reload",
  initialState: initialState,
  reducers: {
    setReload: (state, action) => {
      state.reload = action.payload;
    },

  },
});

export const { setReload } = reloadSlice.actions;
export default reloadSlice.reducer;