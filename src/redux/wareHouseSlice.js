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
        setUsableBin: (state, action) => {
            state.usableBin = action.payload;
        },
        setMovingBin: (state, action) => {
            state.movingBin = action.payload;
        }
    },
});

export const { setWareHouse,setReceipt, setUsableBin, setMovingBin} = warehouseSlice.actions;
export default warehouseSlice.reducer;