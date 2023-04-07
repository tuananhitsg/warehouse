import { createSlice } from "@reduxjs/toolkit";

const warehouseSlice = createSlice({
    name: "warehouse",
    initialState: {},
    reducers: {
        setWareHouse: (state, action) => {
            state.info = action.payload;
        },
        setReceipt: (state, action) => {
            state.receipt = action.payload;
        },
    },
});

export const { setWareHouse,setReceipt } = warehouseSlice.actions;
export default warehouseSlice.reducer;