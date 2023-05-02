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
    setPurchased: (state, action) => {
      state.purchased = action.payload;
    },
    setBinCode: (state, action) => {
      state.binCode = action.payload;
    },
    setReceipt: (state, action) => {
      if (state.receipt && Array.isArray(state.receipt)) {
        state.receipt = [...state.receipt, action.payload];
      } else {
        state.receipt = [action.payload];
      }
    },
  },
});

export const { setPartner, setGoods, setPurchased, setBinCode, setReceipt } =
  inboundSlice.actions;
export default inboundSlice.reducer;
