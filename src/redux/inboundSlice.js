import { createSlice } from "@reduxjs/toolkit";

const inboundSlice = createSlice({
    name: "inbound",
    initialState: {},
    reducers: {
        setPartner: (state, action) => {
            state.info = action.payload;
        },
        setGoods: (state, action) => {
            state.goods = action.payload;
        },
    },
});

export const { setPartner, setGoods } = inboundSlice.actions;
export default inboundSlice.reducer;