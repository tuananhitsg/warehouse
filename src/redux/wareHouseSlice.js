import { createSlice } from "@reduxjs/toolkit";

const warehouseSlice = createSlice({
    name: "warehouse",
    initialState: {},
    reducers: {
        setWareHouse: (state, action) => {
            state.info = action.payload;
        },

    },
});

export const { setWareHouse } = warehouseSlice.actions;
export default warehouseSlice.reducer;