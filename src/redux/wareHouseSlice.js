import { createSlice } from "@reduxjs/toolkit";

const warehouseSlice = createSlice({
    name: "warehouse",
    initialState: {},
    reducers: {
        set: (state, action) => {
            state.info = action.payload;
        },

    },
});

export const { setWarehouse } = warehouseSlice.actions;
export default warehouseSlice.reducer;