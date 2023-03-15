import { createSlice } from "@reduxjs/toolkit";

const reloadSlice = createSlice({
    name: "reload",
    initialState: {},
    reducers: {
        reloadWhenAdd: (state, action) =>{
            state.reload = action.payload;
        }
    }
});
export const { reloadWhenAdd } = reloadSlice.actions;
export default reloadSlice.reducer;

