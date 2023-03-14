import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {},
    reducers: {
        setUser: (state, action) => {
            state.info = action.payload;
        },
        getUser: (state) => state
    },
});

export const { setUser, getUser } = userSlice.actions;
export default userSlice.reducer;